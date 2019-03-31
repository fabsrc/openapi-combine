import * as R from 'ramda';
import * as S from 'sanctuary';
import { Transformer, Operation } from '../types';

export const excludePaths = (pathsToExclude: string[]): Transformer =>
  R.over(R.lensProp('paths'), R.omit(pathsToExclude));

export const excludePath = (pathToExclude: string): Transformer =>
  excludePaths([pathToExclude]);

export const excludePathOperations = (
  path: string,
  operations: Operation[]
): Transformer => R.over(R.lensPath(['paths', path]), R.omit(operations));

export const excludePathsOperations = (
  pathsAndOperations: Record<string, Operation[]>
): Transformer =>
  S.pipe(
    // FIXME
    // @ts-ignore
    R.mapObjIndexed<Operation, Transformer>(
      (operations, path) => excludePathOperations(path, operations),
      pathsAndOperations
    )
  );
