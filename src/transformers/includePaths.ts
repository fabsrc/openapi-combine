import _ from 'lodash/fp';
import * as R from 'ramda';
import { OpenAPIV3 } from 'openapi-types';
import * as S from 'sanctuary';
import { Transformer, Operation } from '../types';

export const includePaths = (pathsToInclude: string[]): Transformer =>
  R.over(R.lensProp('paths'), R.pick(pathsToInclude));

export const includePath = (pathToInclude: string): Transformer =>
  includePaths([pathToInclude]);

export const includePathOperations = (
  path: string,
  operations: Operation[]
): Transformer => R.over(R.lensPath(['paths', path]), R.pick(operations));

export const includePathsOperations = (
  pathsAndOperations: [string, Operation[]][]
): Transformer =>
  S.pipe(
    R.map(
      pathAndOperations => includePathOperations(...pathAndOperations),
      pathsAndOperations
    )
  );
