export const MAX_SELECTION_CHARACTERS = 8_000;

export type SelectionPromptAction = 'steps' | 'visualize' | 'simplify';

export function selectionPrompt(action: SelectionPromptAction, text: string, locale: 'id' | 'en'): string {
  const instructions = locale === 'id' ? {
    steps: 'Jelaskan bagian ini per langkah. Hubungkan tiap langkah agar saya paham alasan dan urutannya. Pertahankan makna, simbol, nilai, dan satuan.',
    visualize: 'Buat visualisasi interaktif untuk menjelaskan bagian ini. Pilih grafik atau simulasi yang sesuai, lalu jelaskan satu hal yang bisa saya ubah untuk memahaminya. Pertahankan nilai dan satuan dari teks. Nyatakan asumsi jika Anda memakai contoh.',
    simplify: 'Tulis ulang bagian ini dengan bahasa yang lebih mudah saya pahami. Jelaskan istilah yang perlu. Pertahankan makna, simbol, nilai, dan satuan.',
  } : {
    steps: 'Explain this excerpt step by step. Connect each step so I can follow its purpose and order. Preserve the meaning, symbols, values, and units.',
    visualize: 'Create an interactive visualization to explain this excerpt. Choose a suitable graph or simulation, then explain one thing I can change to understand it. Preserve the values and units from the text. State any assumptions you use for an example.',
    simplify: 'Rewrite this excerpt in language that is easier to understand. Explain any terms I need. Preserve the meaning, symbols, values, and units.',
  };
  return `${instructions[action]}\n\n${locale === 'id' ? 'Teks yang saya pilih:' : 'My selected text:'}\n"${text}"`;
}

const EXCLUDED_CONTENT = 'input, textarea, select, [contenteditable=""], [contenteditable="true"], [data-inline-ai], [data-ai-selection-toolbar]';

function parentElement(node: Node): Element | null {
  return node.nodeType === 1 ? node as Element : node.parentElement;
}

function codeExcerpt(value: string, block = false): string {
  const longest = Math.max(0, ...(value.match(/`+/g) ?? []).map((run) => run.length));
  const fence = '`'.repeat(Math.max(block ? 3 : 1, longest + 1));
  if (block || value.includes('\n')) return `${fence.length < 3 ? '```' : fence}\n${value}${value.endsWith('\n') ? '' : '\n'}${fence.length < 3 ? '```' : fence}`;
  const padding = /^[` ]|[` ]$/.test(value) ? ' ' : '';
  return `${fence}${padding}${value}${padding}${fence}`;
}

/** Serialize selected DOM rather than Selection.toString(), which can copy
 * KaTeX's hidden MathML and visible glyphs twice and lose paragraph breaks. */
export function readingRangeText(range: Range): string {
  const fragment = range.cloneContents();
  const ancestor = parentElement(range.commonAncestorContainer);
  const startCode = parentElement(range.startContainer)?.closest('code, pre');
  const endCode = parentElement(range.endContainer)?.closest('code, pre');
  if (startCode && startCode === endCode) {
    return codeExcerpt(fragment.textContent ?? '', !!startCode.closest('pre'));
  }
  const document = range.startContainer.ownerDocument!;
  const covers = (element: Element, visibleText = false) => {
    const contents = document.createRange();
    contents.selectNodeContents(element);
    if (visibleText) {
      const walker = document.createTreeWalker(element, 4);
      let first: Node | null = null;
      let last: Node | null = null;
      while (walker.nextNode()) {
        if (walker.currentNode.textContent) { first ??= walker.currentNode; last = walker.currentNode; }
      }
      if (first && last) { contents.setStart(first, 0); contents.setEnd(last, last.textContent!.length); }
    }
    return range.compareBoundaryPoints(0, contents) <= 0 && range.compareBoundaryPoints(2, contents) >= 0;
  };
  const mathSource = (element: Element): string | undefined => {
    const visible = element.querySelector('.katex-html');
    if (!covers(element) && !(visible && covers(visible, true))) return undefined;
    const source = element.querySelector('annotation[encoding="application/x-tex"]')?.textContent;
    if (!source) return undefined;
    return element.closest('.katex-display') ? `\n\n$$\n${source}\n$$\n\n` : `$${source}$`;
  };
  const enclosingMath = ancestor?.closest('.katex');
  if (enclosingMath) {
    const source = mathSource(enclosingMath);
    if (source) return source.trim();
  }
  const originals = Array.from(ancestor?.querySelectorAll('.katex') ?? []).filter((node) => range.intersectsNode(node));
  Array.from(fragment.querySelectorAll('.katex')).forEach((node, index) => {
    const source = originals[index] && mathSource(originals[index]);
    if (source) node.replaceWith(document.createTextNode(source));
  });
  // A partial selection keeps only the glyphs actually selected. It must not
  // acquire the complete annotation and therefore unselected formula terms.
  fragment.querySelectorAll('.katex-mathml, annotation[encoding="application/x-tex"]').forEach((node) => node.remove());

  let output = '';
  const blocks = new Set(['p', 'div', 'section', 'article', 'blockquote', 'li', 'ul', 'ol', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'table', 'tr']);
  const isBlock = (node: Node | null) => node?.nodeType === 1
    && (blocks.has((node as Element).tagName.toLowerCase()) || (node as Element).tagName.toLowerCase() === 'pre');
  const boundary = () => {
    if (output && !output.endsWith('\n\n')) output += output.endsWith('\n') ? '\n' : '\n\n';
  };
  const write = (node: Node) => {
    if (node.nodeType === 3) {
      const value = node.textContent ?? '';
      // React Markdown inserts formatting whitespace between block elements.
      // The boundaries below already represent those paragraph breaks.
      if (!value.trim() && (isBlock(node.previousSibling) || isBlock(node.nextSibling))) return;
      output += value;
      return;
    }
    if (node.nodeType !== 1 && node.nodeType !== 11) return;
    const tag = node.nodeType === 1 ? (node as Element).tagName.toLowerCase() : '';
    if (tag === 'pre') { boundary(); output += codeExcerpt(node.textContent ?? '', true); boundary(); return; }
    if (tag === 'code') { output += codeExcerpt(node.textContent ?? ''); return; }
    if (tag === 'br') { output += '\n'; return; }
    if (blocks.has(tag)) boundary();
    node.childNodes.forEach(write);
    if (blocks.has(tag)) boundary();
  };
  write(fragment);
  return output.trim();
}

/** Use Range boundaries, which stay in document order for backwards selection. */
export function readReadingSelection(
  container: HTMLElement,
  selection: Selection | null,
  fallbackAnchorId: string | null,
) {
  if (!selection || selection.isCollapsed || selection.rangeCount === 0) return null;

  const range = selection.getRangeAt(0);
  if (!container.contains(range.startContainer) || !container.contains(range.endContainer)) return null;

  const startElement = parentElement(range.startContainer);
  const endElement = parentElement(range.endContainer);
  if (startElement?.closest(EXCLUDED_CONTENT) || endElement?.closest(EXCLUDED_CONTENT)) return null;

  const text = typeof range.cloneContents === 'function' ? readingRangeText(range) : selection.toString().trim();
  if (!text) return null;

  const startAnchor = startElement?.closest('[data-ai-anchor]');
  const anchorId = startAnchor && container.contains(startAnchor)
    ? startAnchor.getAttribute('data-ai-anchor') || fallbackAnchorId
    : fallbackAnchorId;
  if (!anchorId) return null;

  const truncated = text.length > MAX_SELECTION_CHARACTERS;
  return {
    text: truncated ? `${text.slice(0, MAX_SELECTION_CHARACTERS).trimEnd()}…` : text,
    originalLength: text.length,
    truncated,
    anchorId,
    range,
  };
}

export function selectionToolbarPosition(
  rects: Iterable<Pick<DOMRect, 'top' | 'bottom' | 'left' | 'right' | 'width' | 'height'>>,
  viewport: { width: number; height: number; top?: number; left?: number },
  toolbar: { width: number; height: number } = { width: 168, height: 36 },
) {
  const viewportTop = viewport.top ?? 0;
  const viewportLeft = viewport.left ?? 0;
  const visible = Array.from(rects).find((rect) => rect.width > 0 && rect.height > 0
    && rect.bottom > viewportTop + 56 && rect.top < viewportTop + viewport.height
    && rect.right > viewportLeft && rect.left < viewportLeft + viewport.width);
  if (!visible) return null;

  const halfWidth = Math.min(toolbar.width, Math.max(0, viewport.width - 24)) / 2;
  return {
    top: Math.max(viewportTop + 60, visible.top - toolbar.height - 8),
    left: Math.max(viewportLeft + 12 + halfWidth, Math.min(viewportLeft + viewport.width - 12 - halfWidth, (visible.left + visible.right) / 2)),
  };
}
