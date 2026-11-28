import * as React from 'react';
import { BotMessageSquare } from 'lucide-react';
import { Button } from '@tutor/ui';
import { useTutorStore } from '../store/tutor-store';

/**
 * Floating minimal action that appears when a student highlights text inside
 * the reading column, opening an InlineAiThread right below that exact block
 * with the selected excerpt quoted.
 */
export function SelectionAiPopover({
  containerRef,
  fallbackAnchorId,
}: {
  containerRef: React.RefObject<HTMLElement | null>;
  fallbackAnchorId: string | null;
}) {
  const openInlineAi = useTutorStore((s) => s.openInlineAi);
  const [selectionState, setSelectionState] = React.useState<{
    text: string;
    anchorId: string;
    top: number;
    left: number;
  } | null>(null);

  React.useEffect(() => {
    const updateSelection = () => {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || sel.rangeCount === 0) {
        setSelectionState(null);
        return;
      }

      const text = sel.toString().trim();
      if (text.length < 6 || text.length > 400) {
        setSelectionState(null);
        return;
      }

      const container = containerRef.current;
      if (!container) return;

      const anchorNode = sel.anchorNode;
      if (!anchorNode || !container.contains(anchorNode)) {
        setSelectionState(null);
        return;
      }

      const el =
        anchorNode.nodeType === Node.ELEMENT_NODE
          ? (anchorNode as HTMLElement)
          : anchorNode.parentElement;

      // Don't trigger inside an already-open inline AI box or inputs
      if (el?.closest('[data-inline-ai]') || el?.closest('input, textarea')) {
        setSelectionState(null);
        return;
      }

      const anchorEl = el?.closest('[data-ai-anchor]') as HTMLElement | null;
      const anchorId =
        anchorEl?.getAttribute('data-ai-anchor') || fallbackAnchorId;
      if (!anchorId) {
        setSelectionState(null);
        return;
      }

      const range = sel.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) {
        setSelectionState(null);
        return;
      }

      setSelectionState({
        text,
        anchorId,
        top: Math.max(56, rect.top - 38),
        left: Math.min(
          window.innerWidth - 160,
          Math.max(16, rect.left + rect.width / 2 - 64)
        ),
      });
    };

    const onMouseUp = () => window.setTimeout(updateSelection, 10);
    const onScroll = () => setSelectionState(null);

    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('keyup', onMouseUp);
    window.addEventListener('scroll', onScroll, true);

    return () => {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('keyup', onMouseUp);
      window.removeEventListener('scroll', onScroll, true);
    };
  }, [containerRef, fallbackAnchorId]);

  if (!selectionState) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: selectionState.top,
        left: selectionState.left,
      }}
      className="z-50 rounded-md border border-border bg-popover px-1.5 py-0.5 shadow-md"
    >
      <Button
        size="xs"
        variant="ghost"
        className="text-foreground"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => {
          const { anchorId, text } = selectionState;
          window.getSelection()?.removeAllRanges();
          setSelectionState(null);
          openInlineAi(anchorId, {
            quotedText: text,
            draftPrompt: `Jelaskan maksud bagian ini: "${text}"`,
          });
        }}
      >
        <BotMessageSquare className="size-3 text-primary" />
        <span>Tanya AI</span>
      </Button>
    </div>
  );
}
