import * as R from 'ramda';
import * as S from 'sanctuary';
import { Transformer } from '../types/Transformer';
import { Operation } from '../types/Operation';
import { overPaths, overPath } from '../utils';

export const excludePaths = (pathsToExclude: string[]): Transformer =>
  overPaths(R.omit(pathsToExclude));

export const excludePath = (pathToExclude: string): Transformer =>
  excludePaths(R.of(pathToExclude));

export const excludeOperationsFromPath = (path: string, operations: Operation[]): Transformer =>
  overPath(path, R.omit(operations));

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
