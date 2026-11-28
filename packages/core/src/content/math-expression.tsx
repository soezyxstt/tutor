import { useMemo } from 'react';
import katex from 'katex';
import { cn } from '@tutor/ui';

/** Tool fields contain a formula, rather than Markdown prose. Older model
 * responses may include delimiters, so accept those without nesting them. */
function unwrapExpression(value: string): string {
  const expression = value.trim();
  for (const [open, close] of [['$$', '$$'], ['\\[', '\\]'], ['\\(', '\\)'], ['$', '$']]) {
    if (expression.startsWith(open) && expression.endsWith(close) && expression.length > open.length + close.length) {
      return expression.slice(open.length, -close.length).trim();
    }
  }
  return expression;
}

export function MathExpression({
  latex,
  display = false,
  className,
}: {
  latex: string;
  display?: boolean;
  className?: string;
}) {
  const expression = unwrapExpression(latex);
  const html = useMemo(() => {
    try {
      return katex.renderToString(expression, {
        displayMode: display,
        output: 'htmlAndMathml',
        throwOnError: true,
        strict: false,
        trust: false,
      });
    } catch {
      // Keep a malformed response readable without crashing the whole thread.
      return null;
    }
  }, [expression, display]);
  const Element = display ? 'div' : 'span';
  const classes = cn('tutor-math', display && 'tutor-math-display', className);

  if (html === null) {
    return (
      <Element className={cn(classes, 'text-destructive')} role="note" aria-label={expression} data-math-error="true">
        <code>{expression}</code>
      </Element>
    );
  }

  // Only KaTeX's escaped, untrusted-mode output reaches this HTML sink.
  return <Element className={classes} dangerouslySetInnerHTML={{ __html: html }} />;
}
