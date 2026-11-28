import { useLanguage } from '../i18n/language-provider';
import * as React from 'react';
import { createPortal } from 'react-dom';
import { BotMessageSquare, X } from 'lucide-react';
import { Button, cn } from '@tutor/ui';
import { useTutorStore } from '../store/tutor-store';
import { readReadingSelection, selectionToolbarPosition } from './reading-selection';

type ReadingSelection = NonNullable<ReturnType<typeof readReadingSelection>>;
type SelectionState = Omit<ReadingSelection, 'range'> & {
  scopeId: string | null;
  docked: boolean;
  top: number;
  left: number;
};

/** The touch action sits outside the selection, leaving the native menu intact. */
export function SelectionAiPopover({
  containerRef,
  fallbackAnchorId,
}: {
  containerRef: React.RefObject<HTMLElement | null>;
  fallbackAnchorId: string | null;
}) {
  const openInlineAi = useTutorStore((s) => s.openInlineAi);
  const { t } = useLanguage();
  const toolbarRef = React.useRef<HTMLDivElement | null>(null);
  const [selectionState, setSelectionState] = React.useState<SelectionState | null>(null);

  React.useEffect(() => {
    let timer: number | undefined;
    let dragging = false;
    const dockQuery = window.matchMedia('(pointer: coarse), (max-width: 767px)');
    setSelectionState(null);
    const previousSelection = window.getSelection();
    if (previousSelection?.anchorNode && containerRef.current?.contains(previousSelection.anchorNode)) {
      previousSelection.removeAllRanges();
    }

    const updateSelection = () => {
      if (dragging) return;
      const container = containerRef.current;
      const selected = container && readReadingSelection(container, window.getSelection(), fallbackAnchorId);
      if (!selected) {
        setSelectionState(null);
        return;
      }

      const viewport = window.visualViewport;
      const position = selectionToolbarPosition(selected.range.getClientRects(), {
        width: viewport?.width ?? window.innerWidth,
        height: viewport?.height ?? window.innerHeight,
        top: viewport?.offsetTop,
        left: viewport?.offsetLeft,
      });
      if (!position) {
        setSelectionState(null);
        return;
      }

      const { range: _range, ...excerpt } = selected;
      setSelectionState({ ...excerpt, ...position, docked: dockQuery.matches, scopeId: fallbackAnchorId });
    };

    const scheduleUpdate = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(updateSelection, 60);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (toolbarRef.current?.contains(event.target as Node)) return;
      if (event.pointerType === 'mouse') {
        dragging = true;
        setSelectionState(null);
      }
    };
    const onPointerEnd = () => {
      dragging = false;
      scheduleUpdate();
    };
    const onKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        window.clearTimeout(timer);
        setSelectionState(null);
        window.getSelection()?.removeAllRanges();
      } else {
        scheduleUpdate();
      }
    };

    document.addEventListener('selectionchange', scheduleUpdate);
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('pointerup', onPointerEnd);
    document.addEventListener('pointercancel', onPointerEnd);
    document.addEventListener('touchend', scheduleUpdate, { passive: true });
    document.addEventListener('keyup', onKeyUp);
    window.addEventListener('scroll', scheduleUpdate, true);
    window.addEventListener('resize', scheduleUpdate);
    window.visualViewport?.addEventListener('resize', scheduleUpdate);
    window.visualViewport?.addEventListener('scroll', scheduleUpdate);
    dockQuery.addEventListener('change', scheduleUpdate);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('selectionchange', scheduleUpdate);
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('pointerup', onPointerEnd);
      document.removeEventListener('pointercancel', onPointerEnd);
      document.removeEventListener('touchend', scheduleUpdate);
      document.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('scroll', scheduleUpdate, true);
      window.removeEventListener('resize', scheduleUpdate);
      window.visualViewport?.removeEventListener('resize', scheduleUpdate);
      window.visualViewport?.removeEventListener('scroll', scheduleUpdate);
      dockQuery.removeEventListener('change', scheduleUpdate);
    };
  }, [containerRef, fallbackAnchorId]);

  // Hide the previous page's quote immediately, before effect cleanup runs.
  if (!selectionState || selectionState.scopeId !== fallbackAnchorId) return null;

  const dismiss = () => {
    setSelectionState(null);
    window.getSelection()?.removeAllRanges();
  };
  const ask = () => {
    const { anchorId, text } = selectionState;
    dismiss();
    openInlineAi(anchorId, {
      quotedText: text,
      draftPrompt: t(`Jelaskan maksud bagian ini: "${text}"`, `Explain this excerpt: "${text}"`),
    });
  };

  return createPortal(
    <div
      ref={toolbarRef}
      data-ai-selection-toolbar
      data-docked={selectionState.docked ? 'true' : 'false'}
      role="toolbar"
      aria-label={t('Tanya AI tentang teks terpilih', 'Ask AI about the selected text')}
      style={selectionState.docked ? {
        position: 'fixed',
        bottom: 'max(0.75rem, env(safe-area-inset-bottom))',
        left: '50%',
        transform: 'translateX(-50%)',
      } : {
        position: 'fixed',
        top: selectionState.top,
        left: selectionState.left,
        transform: 'translateX(-50%)',
      }}
      className={cn(
        'z-50 flex items-center gap-1 rounded-lg border border-border bg-popover shadow-md',
        selectionState.docked ? 'w-[calc(100%-1.5rem)] max-w-lg p-2' : 'max-w-[calc(100vw-1.5rem)] px-1.5 py-1',
      )}
      onPointerDown={(event) => event.preventDefault()}
      onMouseDown={(event) => event.preventDefault()}
    >
      {selectionState.docked && (
        <div className="min-w-0 flex-1 px-1">
          <p className="text-xs font-medium text-foreground">{t('Teks terpilih', 'Selected text')}</p>
          <p className="truncate text-xs text-muted-foreground">{selectionState.text}</p>
        </div>
      )}
      <div className="min-w-0">
        <Button
          variant={selectionState.docked ? 'default' : 'ghost'}
          className={cn(selectionState.docked ? 'min-h-11 px-3' : 'h-8 text-foreground')}
          onClick={ask}
        >
          <BotMessageSquare className="size-3.5" />
          <span>{t('Tanya AI', 'Ask AI')}</span>
        </Button>
        {selectionState.truncated && (
          <p className="px-1 text-[11px] text-muted-foreground">{t('8.000 karakter awal', 'First 8,000 characters')}</p>
        )}
      </div>
      <Button
        variant="icon"
        size="icon"
        className={selectionState.docked ? 'min-h-11 min-w-8' : undefined}
        aria-label={t('Tutup pilihan teks', 'Dismiss text selection')}
        onClick={dismiss}
      >
        <X className="size-3.5" />
      </Button>
    </div>,
    document.body,
  );
}
