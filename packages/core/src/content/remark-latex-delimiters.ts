type Code = number | null;
type State = (code: Code) => State | undefined;
type Token = { type: string; displayMode?: boolean };
type Effects = {
  enter(type: string): Token;
  exit(type: string): Token;
  consume(code: number): void;
};
type MathNode = {
  type: string;
  value: string;
  data: { hName: string; hProperties: { className: string[] }; hChildren: { type: string; value: string }[] };
};
type CompileContext = {
  enter(node: MathNode, token: Token): void;
  exit(token: Token): void;
  buffer(): void;
  resume(): string;
  sliceSerialize(token: Token): string;
  stack: MathNode[];
};

/** Recognize TeX delimiters in prose at parse time. Markdown itself keeps
 * fenced/indented/inline code, URLs, and existing dollar math opaque here. */
function tokenize(effects: Effects, ok: State, nok: State): State {
  let token: Token;
  let sequence: Token;
  let closing: number;
  let hasContent = false;
  function start(code: Code): State | undefined {
    if (code !== 92) return nok(code);
    token = effects.enter('latexDelimitedMath');
    effects.enter('latexMathSequence');
    effects.consume(code);
    return opening;
  }
  function opening(code: Code): State | undefined {
    if (code !== 40 && code !== 91) return nok(code);
    token.displayMode = code === 91;
    closing = code === 40 ? 41 : 93;
    effects.consume(code);
    effects.exit('latexMathSequence');
    return content;
  }
  function content(code: Code): State | undefined {
    if (code === null) return nok(code);
    // Micromark needs a separate token for every line boundary when it joins
    // paragraph chunks, including lines nested inside lists or block quotes.
    if (code < -2) {
      effects.enter('lineEnding');
      effects.consume(code);
      effects.exit('lineEnding');
      return content;
    }
    if (code === 92) {
      sequence = effects.enter('latexMathSequence');
      effects.consume(code);
      return afterSlash;
    }
    effects.enter('latexMathData');
    return text(code);
  }
  function text(code: Code): State | undefined {
    if (code === null || code === 92 || code < -2) {
      effects.exit('latexMathData');
      return content(code);
    }
    effects.consume(code);
    if (code > 32) hasContent = true;
    return text;
  }
  function afterSlash(code: Code): State | undefined {
    if (code === closing) {
      if (!hasContent) return nok(code);
      effects.consume(code);
      effects.exit('latexMathSequence');
      effects.exit('latexDelimitedMath');
      return ok;
    }
    sequence.type = 'latexMathData';
    hasContent = true;
    // A doubled slash belongs to the formula, not to its closing delimiter.
    if (code === 92) {
      effects.consume(code);
      return text;
    }
    return text(code);
  }
  return start;
}

export function remarkLatexDelimiters(this: { data(): unknown }) {
  const data = this.data() as { micromarkExtensions?: unknown[]; fromMarkdownExtensions?: unknown[] };
  (data.micromarkExtensions ??= []).push({ text: { 92: { name: 'latexDelimitedMath', tokenize } } });
  (data.fromMarkdownExtensions ??= []).push({
    enter: {
      latexDelimitedMath(this: CompileContext, token: Token) {
        this.enter({
          type: 'inlineMath', value: '',
          data: {
            hName: 'code',
            hProperties: { className: ['language-math', token.displayMode ? 'math-display' : 'math-inline'] },
            hChildren: [],
          },
        }, token);
        this.buffer();
      },
    },
    exit: {
      latexDelimitedMath(this: CompileContext, token: Token) {
        this.resume();
        const node = this.stack[this.stack.length - 1];
        this.exit(token);
        const value = this.sliceSerialize(token).slice(2, -2).trim();
        node.value = value;
        node.data.hChildren.push({ type: 'text', value });
      },
    },
  });
}
