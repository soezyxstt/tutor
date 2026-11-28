import { MathMarkdown } from '@tutor/core';
export function Formula({ children }: { children: string }) { return <MathMarkdown className="ipe-formula" content={`$$\n${children}\n$$`} />; }
export function RichText({ children }: { children: string }) { return <MathMarkdown content={children} />; }
