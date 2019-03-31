import R from 'ramda';
import S from 'sanctuary';
import { Transformer, Operation } from '../types';
import { overIf } from '../utils';

export const excludePaths = (pathsToExclude: string[]): Transformer =>
  overIf(R.lensProp('paths'), R.omit(pathsToExclude));

export const excludePath = (pathToExclude: string): Transformer =>
  excludePaths(R.of(pathToExclude));

export const excludeOperationsFromPath = (
  path: string,
  operations: Operation[],
): Transformer => overIf(R.lensPath(['paths', path]), R.omit(operations));

export const excludeOperationsFromPaths = (
  pathsAndOperations: Record<string, Operation[]>,
): Transformer =>
  S.pipe(
    // FIXME
    // @ts-ignore
    R.mapObjIndexed<Operation[], Transformer>(
      (operations, path) => excludeOperationsFromPath(path, operations),
      pathsAndOperations,
    ),
  );
