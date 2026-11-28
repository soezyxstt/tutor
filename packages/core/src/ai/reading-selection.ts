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

  const text = selection.toString().trim();
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
