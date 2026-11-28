/**
 * Safe recursive-descent math expression evaluator (no eval / new Function).
 * Supports +, -, *, /, ^, parentheses, unary minus, constants (pi, e),
 * functions (sin, cos, tan, exp, ln, log, sqrt, abs, tanh), and named variables.
 */

type Token =
  | { type: 'num'; value: number }
  | { type: 'id'; value: string }
  | { type: 'op'; value: string }
  | { type: 'lparen' }
  | { type: 'rparen' }
  | { type: 'comma' };

function tokenize(expr: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < expr.length) {
    const ch = expr[i];
    if (/\s/.test(ch)) {
      i++;
      continue;
    }
    if (/[0-9.]/.test(ch)) {
      let numStr = '';
      while (i < expr.length && /[0-9.]/.test(expr[i])) {
        numStr += expr[i++];
      }
      tokens.push({ type: 'num', value: Number(numStr) });
      continue;
    }
    if (/[a-zA-Z_]/.test(ch)) {
      let id = '';
      while (i < expr.length && /[a-zA-Z0-9_]/.test(expr[i])) {
        id += expr[i++];
      }
      tokens.push({ type: 'id', value: id });
      continue;
    }
    if (ch === '(') {
      tokens.push({ type: 'lparen' });
      i++;
      continue;
    }
    if (ch === ')') {
      tokens.push({ type: 'rparen' });
      i++;
      continue;
    }
    if (ch === ',') {
      tokens.push({ type: 'comma' });
      i++;
      continue;
    }
    if ('+-*/^'.includes(ch)) {
      tokens.push({ type: 'op', value: ch });
      i++;
      continue;
    }
    i++;
  }
  return tokens;
}

const FUNCTIONS: Record<string, (...args: number[]) => number> = {
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  exp: Math.exp,
  ln: Math.log,
  log: Math.log10,
  sqrt: Math.sqrt,
  abs: Math.abs,
  tanh: Math.tanh,
  min: Math.min,
  max: Math.max,
};

export function compileMathExpression(
  expr: string
): (vars: Record<string, number>) => number {
  const tokens = tokenize(expr);

  return (vars: Record<string, number>) => {
    let pos = 0;

    const peek = () => tokens[pos];
    const consume = () => tokens[pos++];

    const parseExpr = (): number => {
      let left = parseTerm();
      while (
        peek()?.type === 'op' &&
        ((peek() as { value: string }).value === '+' ||
          (peek() as { value: string }).value === '-')
      ) {
        const op = (consume() as { value: string }).value;
        const right = parseTerm();
        left = op === '+' ? left + right : left - right;
      }
      return left;
    };

    const parseTerm = (): number => {
      let left = parsePower();
      while (
        peek()?.type === 'op' &&
        ((peek() as { value: string }).value === '*' ||
          (peek() as { value: string }).value === '/')
      ) {
        const op = (consume() as { value: string }).value;
        const right = parsePower();
        left = op === '*' ? left * right : right === 0 ? NaN : left / right;
      }
      return left;
    };

    const parsePower = (): number => {
      let base = parseUnary();
      if (peek()?.type === 'op' && (peek() as { value: string }).value === '^') {
        consume();
        const exp = parsePower();
        base = Math.pow(base, exp);
      }
      return base;
    };

    const parseUnary = (): number => {
      if (peek()?.type === 'op' && (peek() as { value: string }).value === '-') {
        consume();
        return -parseUnary();
      }
      if (peek()?.type === 'op' && (peek() as { value: string }).value === '+') {
        consume();
        return parseUnary();
      }
      return parsePrimary();
    };

    const parsePrimary = (): number => {
      const tok = peek();
      if (!tok) return NaN;
      if (tok.type === 'num') {
        consume();
        return tok.value;
      }
      if (tok.type === 'id') {
        consume();
        const name = tok.value;
        if (peek()?.type === 'lparen') {
          consume();
          const args: number[] = [];
          if (peek()?.type !== 'rparen') {
            args.push(parseExpr());
            while (peek()?.type === 'comma') {
              consume();
              args.push(parseExpr());
            }
          }
          if (peek()?.type === 'rparen') consume();
          const fn = FUNCTIONS[name.toLowerCase()];
          return fn ? fn(...args) : NaN;
        }
        if (name.toLowerCase() === 'pi') return Math.PI;
        if (name === 'e') return Math.E;
        return vars[name] ?? 0;
      }
      if (tok.type === 'lparen') {
        consume();
        const val = parseExpr();
        if (peek()?.type === 'rparen') consume();
        return val;
      }
      return NaN;
    };

    try {
      return parseExpr();
    } catch {
      return NaN;
    }
  };
}
