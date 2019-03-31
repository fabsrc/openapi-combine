import R from 'ramda';
import { Transformer, Operation } from '../types';
import { overIf } from '../utils';

const filterByParameterNames = (parameterNames: string[]) =>
  R.filter(R.where({ name: R.flip(R.includes)(parameterNames) }));

export const includeParametersFromPath = (
  path: string,
  parameterNames: string[],
): Transformer =>
  overIf(
    R.lensPath(['paths', path, 'parameters']),
    filterByParameterNames(parameterNames),
  );

export const includeParameterFromPath = (
  path: string,
  parameterName: string,
): Transformer => includeParametersFromPath(path, R.of(parameterName));

export const includeParametersFromPathOperation = (
  path: string,
  operation: Operation,
  parameterNames: string[],
): Transformer =>
  overIf(
    R.lensPath(['paths', path, operation, 'parameters']),
    filterByParameterNames(parameterNames),
  );

export const includeParameterFromPathOperation = (
  path: string,
  operation: Operation,
  parameterName: string,
): Transformer =>
  includeParametersFromPathOperation(path, operation, R.of(parameterName));
