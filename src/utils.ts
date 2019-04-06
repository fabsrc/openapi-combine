import R from 'ramda';

export const overIf = R.curry<
  (lens: R.Lens, fn: R.Arity1Fn) => <T>(value: T) => T
>((lens, fn) =>
  R.unless<any, any>(
    R.compose(
      R.isNil,
      R.view(lens)
    ),
    R.over(lens, fn)
  )
);

export const overPaths = (fn: R.Arity1Fn) => overIf(R.lensProp('paths'), fn);

const mergePlan = (x: any, y: any): any => {
  if (Array.isArray(x) && Array.isArray(y)) {
    return R.uniq(R.concat(x, y));
  }

  if (typeof x === 'object' && typeof y === 'object') {
    return R.mergeWith(mergePlan, x, y);
  }

  return y;
};

export const deepMerge = R.mergeWith(mergePlan);
