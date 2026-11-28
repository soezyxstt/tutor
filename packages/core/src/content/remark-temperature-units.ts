type MarkdownNode = { type: string; value?: string; children?: MarkdownNode[] };

/** Normalize the Celsius notation models sometimes emit in ordinary prose.
 * Work on parsed text only: math, code, URLs, and source strings stay intact. */
export function remarkTemperatureUnits() {
  return (tree: MarkdownNode) => {
    const visit = (node: MarkdownNode) => {
      if (node.type === 'text' && node.value) {
        node.value = node.value.replace(
          /(?:\{\s*\}\s*)?\^\s*(?:\{\s*\\circ\s*\}|\\circ)\s*(?:\\(?:mathrm|text|textrm)\s*\{\s*C\s*\}|C\b)/g,
          '°C',
        );
      }
      for (const child of node.children ?? []) visit(child);
    };
    visit(tree);
  };
}
