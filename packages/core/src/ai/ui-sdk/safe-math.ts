/** A bounded math parser. It never evaluates JavaScript or reads object paths. */
type Token = { type: 'number'; value: number } | { type: 'name' | 'symbol'; value: string };
type Expression = (variables: Record<string, number>) => number;

const FUNCTIONS: Record<string, { run: (...values: number[]) => number; min: number; max: number }> = {
  sin: { run: Math.sin, min: 1, max: 1 }, cos: { run: Math.cos, min: 1, max: 1 },
  tan: { run: Math.tan, min: 1, max: 1 }, asin: { run: Math.asin, min: 1, max: 1 },
  acos: { run: Math.acos, min: 1, max: 1 }, atan: { run: Math.atan, min: 1, max: 1 },
  atan2: { run: Math.atan2, min: 2, max: 2 }, exp: { run: Math.exp, min: 1, max: 1 },
  ln: { run: Math.log, min: 1, max: 1 }, log: { run: Math.log10, min: 1, max: 1 },
  sqrt: { run: Math.sqrt, min: 1, max: 1 }, abs: { run: Math.abs, min: 1, max: 1 },
  tanh: { run: Math.tanh, min: 1, max: 1 }, floor: { run: Math.floor, min: 1, max: 1 },
  ceil: { run: Math.ceil, min: 1, max: 1 }, min: { run: Math.min, min: 1, max: 12 },
  max: { run: Math.max, min: 1, max: 12 },
};

function tokenize(expression: string): Token[] {
  if (!expression.trim() || expression.length > 600) throw new Error('Use a math expression with 1 to 600 characters.');
  const tokens: Token[] = [];
  let offset = 0;
  while (offset < expression.length) {
    const remaining = expression.slice(offset);
    const whitespace = /^\s+/.exec(remaining);
    if (whitespace) { offset += whitespace[0].length; continue; }
    const number = /^(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?/.exec(remaining);
    const name = /^[A-Za-z_][A-Za-z0-9_]*/.exec(remaining);
    if (number) {
      const value = Number(number[0]);
      if (!Number.isFinite(value)) throw new Error('Numbers must be finite.');
      tokens.push({ type: 'number', value });
      offset += number[0].length;
    } else if (name) {
      tokens.push({ type: 'name', value: name[0] });
      offset += name[0].length;
    } else if ('+-*/^(),'.includes(remaining[0])) {
      tokens.push({ type: 'symbol', value: remaining[0] });
      offset++;
    } else {
      throw new Error(`Unsupported math character at position ${offset + 1}.`);
    }
    if (tokens.length > 256) throw new Error('The expression is too complex.');
  }
  return tokens;
}

export function compileMathExpression(expression: string, allowedVariables?: Iterable<string>): Expression {
  const tokens = tokenize(expression);
  const allowed = allowedVariables ? new Set(allowedVariables) : undefined;
  let position = 0;
  let depth = 0;
  const is = (symbol: string) => tokens[position]?.type === 'symbol' && tokens[position].value === symbol;
  const requireSymbol = (symbol: string) => {
    if (!is(symbol)) throw new Error(`Expected ${symbol} in the math expression.`);
    position++;
  };
  const nested = (parse: () => Expression): Expression => {
    if (++depth > 48) throw new Error('The expression is nested too deeply.');
    const result = parse();
    depth--;
    return result;
  };
  const primary = (): Expression => {
    const token = tokens[position++];
    if (!token) throw new Error('The math expression is incomplete.');
    if (token.type === 'number') return () => token.value;
    if (token.type === 'name') {
      const name = token.value;
      if (is('(')) {
        position++;
        if (!Object.hasOwn(FUNCTIONS, name.toLowerCase())) throw new Error(`Unsupported function: ${name}.`);
        const fn = FUNCTIONS[name.toLowerCase()];
        const args: Expression[] = [];
        if (!is(')')) {
          args.push(nested(sum));
          while (is(',')) { position++; args.push(nested(sum)); }
        }
        requireSymbol(')');
        if (args.length < fn.min || args.length > fn.max) throw new Error(`Wrong number of arguments for ${name}.`);
        return (variables) => fn.run(...args.map((arg) => arg(variables)));
      }
      if (name.toLowerCase() === 'pi') return () => Math.PI;
      if (name === 'e') return () => Math.E;
      if (allowed && !allowed.has(name)) throw new Error(`Unknown variable: ${name}. Define it as a slider or use an axis variable.`);
      return (variables) => Object.hasOwn(variables, name) && Number.isFinite(variables[name]) ? variables[name] : NaN;
    }
    if (token.value === '(') {
      const result = nested(sum);
      requireSymbol(')');
      return result;
    }
    throw new Error('Expected a number, variable, or parenthesized expression.');
  };
  // Exponentiation binds more tightly than unary minus and associates right.
  // Thus -x^2 = -(x^2), 2^-2 = 0.25, and 2^3^2 = 512.
  const power = (): Expression => {
    const base = primary();
    if (!is('^')) return base;
    position++;
    const exponent = nested(unary);
    return (variables) => Math.pow(base(variables), exponent(variables));
  };
  const unary = (): Expression => {
    if (is('+') || is('-')) {
      const negative = is('-');
      position++;
      const value = nested(unary);
      return (variables) => (negative ? -1 : 1) * value(variables);
    }
    return power();
  };
  const product = (): Expression => {
    let result = unary();
    while (is('*') || is('/')) {
      const divide = is('/');
      position++;
      const left = result;
      const right = unary();
      result = (variables) => divide ? left(variables) / right(variables) : left(variables) * right(variables);
    }
    return result;
  };
  const sum = (): Expression => {
    let result = product();
    while (is('+') || is('-')) {
      const subtract = is('-');
      position++;
      const left = result;
      const right = product();
      result = (variables) => subtract ? left(variables) - right(variables) : left(variables) + right(variables);
    }
    return result;
  };
  const evaluate = sum();
  if (position !== tokens.length) throw new Error('Unexpected trailing math input. Use * for multiplication.');
  return (variables) => {
    const value = evaluate(variables);
    return Number.isFinite(value) ? value : NaN;
  };
}

export interface PlotPoint { x: number; y: number }

/** Keep gaps at undefined points and poles instead of drawing across them. */
export function samplePlotCurve(fn: Expression, params: Record<string, number>, minimum: number, maximum: number, samples = 220): (PlotPoint | null)[] {
  const points: (PlotPoint | null)[] = [];
  let previous: PlotPoint | null = null;
  for (let index = 0; index <= samples; index++) {
    const x = minimum + ((maximum - minimum) * index) / samples;
    const y = fn({ ...params, x, t: x });
    if (!Number.isFinite(y)) { points.push(null); previous = null; continue; }
    if (previous) {
      const midpoint = (previous.x + x) / 2;
      const middleY = fn({ ...params, x: midpoint, t: midpoint });
      const crossesPole = Math.sign(previous.y) !== Math.sign(y) && (middleY < Math.min(previous.y, y) || middleY > Math.max(previous.y, y));
      if (!Number.isFinite(middleY) || crossesPole) points.push(null);
    }
    previous = { x, y };
    points.push(previous);
  }
  return points;
}
