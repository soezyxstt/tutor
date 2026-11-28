import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import { cn } from '@tutor/ui';
import { remarkTemperatureUnits } from './remark-temperature-units';
import { remarkLatexDelimiters } from './remark-latex-delimiters';

export function MathMarkdown({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  return (
    <div className={cn('tutor-prose', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath, remarkLatexDelimiters, remarkTemperatureUnits]}
        rehypePlugins={[[rehypeKatex, { strict: false }]]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
