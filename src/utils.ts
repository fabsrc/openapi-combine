import R from "ramda";

export const overIf = R.curry<
  (lens: R.Lens, fn: R.Arity1Fn) => <T>(value: T) => T
>((lens, fn) =>
  R.unless<any, any>(R.compose(R.isNil, R.view(lens)), R.over(lens, fn))
);

export const overPaths = (fn: R.Arity1Fn) => overIf(R.lensProp("paths"), fn);

export const overPath = R.curry((path: string, fn: R.Arity1Fn) =>
  overIf(R.lensPath(["paths", path]), fn)
);

export const eachPath = (fn: R.Arity1Fn) => overPaths(R.map(fn));

export const eachOperation = (fn: R.Arity1Fn) => eachPath(R.map(fn));
