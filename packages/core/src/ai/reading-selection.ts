export const MAX_SELECTION_CHARACTERS = 8_000;

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
) {
  const viewportTop = viewport.top ?? 0;
  const viewportLeft = viewport.left ?? 0;
  const visible = Array.from(rects).find((rect) => rect.width > 0 && rect.height > 0
    && rect.bottom > viewportTop + 56 && rect.top < viewportTop + viewport.height
    && rect.right > viewportLeft && rect.left < viewportLeft + viewport.width);
  if (!visible) return null;

  return {
    top: Math.max(viewportTop + 60, visible.top - 44),
    left: Math.max(viewportLeft + 96, Math.min(viewportLeft + viewport.width - 96, (visible.left + visible.right) / 2)),
  };
}
