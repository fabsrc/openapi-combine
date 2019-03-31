import _ from 'lodash/fp';
import * as R from 'ramda';
import { OpenAPIV3 } from 'openapi-types';
import * as S from 'sanctuary';
import { Transformer, Operation } from '../types';

export const includePaths = (pathsToInclude: string[]): Transformer =>
  R.over(R.lensProp('paths'), R.pick(pathsToInclude));

export const includePath = (pathToInclude: string): Transformer =>
  includePaths(R.of(pathToInclude));

export const includeOperationsFromPath = (
  path: string,
  operations: Operation[]
): Transformer => R.over(R.lensPath(['paths', path]), R.pick(operations));

export const includeOperationsFromPaths = (
  pathsAndOperations: Record<string, Operation[]>
): Transformer =>
  S.pipe(
    // FIXME
    // @ts-ignore
    R.mapObjIndexed<Operation[], Transformer>(
      (operations, path) => includeOperationsFromPath(path, operations),
      pathsAndOperations
    )
  );
