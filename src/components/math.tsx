import { Fragment, useMemo } from "react";
import katex from "katex";
import { cn } from "@/lib/utils";
export function Formula({
  children,
  inline = false,
  className,
}: {
  children: string;
  inline?: boolean;
  className?: string;
}) {
  const html = useMemo(
    () =>
      katex.renderToString(children, {
        displayMode: !inline,
        throwOnError: false,
        strict: "ignore",
        trust: false,
        output: "htmlAndMathml",
      }),
    [children, inline],
  );
  return inline ? (
    <span dangerouslySetInnerHTML={{ __html: html }} />
  ) : (
    <div
      className={cn("formula", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
function Plain({ children }: { children: string }) {
  const bits = children.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {bits.map((b, i) =>
        b.startsWith("**") ? (
          <strong key={i}>{b.slice(2, -2)}</strong>
        ) : (
          <Fragment key={i}>{b}</Fragment>
        ),
      )}
    </>
  );
}
export function RichText({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const parts = children.split(
    /(\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]|\$\$[\s\S]*?\$\$)/g,
  );
  return (
    <div className={cn("rich-text", className)}>
      {parts.map((p, i) =>
        p.startsWith("\\(") ? (
          <Formula key={i} inline>
            {p.slice(2, -2)}
          </Formula>
        ) : p.startsWith("\\[") || p.startsWith("$$") ? (
          <Formula key={i}>{p.slice(2, -2)}</Formula>
        ) : (
          <Plain key={i}>{p}</Plain>
        ),
      )}
    </div>
  );
}
