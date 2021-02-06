import R from "ramda";

export const overIf = R.curry((lens, fn) =>
  R.unless(R.o(R.isNil, R.view(lens)), R.over(lens, fn))
);

export const overPaths = <T>(
  fn: R.Arity1Fn
): ((a: { paths: T }) => { paths: T }) =>
  overIf(
    R.lensPath<T>(["paths"]),
    fn
  );

export const overPath = R.curry((path: string, fn: R.Arity1Fn) =>
  overIf(R.lensPath(["paths", path]), fn)
);

export const eachPath = <T>(fn: R.Arity1Fn) => overPaths<T>(R.map(fn));

export const eachOperation = <T>(fn: R.Arity1Fn) => eachPath<T>(R.map(fn));

export const promiseAll = (x: Promise<any>[]) => Promise.all(x);
