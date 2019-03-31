import R, { Lens, Arity1Fn } from 'ramda';

export const overIf = R.curry<(lens: Lens, fn: Arity1Fn) => <T>(value: T) => T>(
  (lens, fn) =>
    R.unless<any, any>(
      R.compose(
        R.isNil,
        R.view(lens),
      ),
      R.over(lens, fn),
    ),
);
