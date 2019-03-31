import * as R from 'ramda';
import { Transformer, Operation } from '../types';

const rejectByParameterNames = (parameterNames: string[]) =>
  R.reject(R.where({ name: R.flip(R.includes)(parameterNames) }));

export const excludeParametersFromPath = (
  path: string,
  parameterNames: string[]
): Transformer =>
  R.over(
    R.lensPath(['paths', path, 'parameters']),
    rejectByParameterNames(parameterNames)
  );

export const excludeParameterFromPath = (
  path: string,
  parameterName: string
): Transformer => excludeParametersFromPath(path, R.of(parameterName));

export const excludeParametersFromPathOperation = (
  path: string,
  operation: Operation,
  parameterNames: string[]
): Transformer =>
  R.over(
    R.lensPath(['paths', path, operation, 'parameters']),
    rejectByParameterNames(parameterNames)
  );

export const excludeParameterFromPathOperation = (
  path: string,
  operation: Operation,
  parameterName: string
): Transformer =>
  excludeParametersFromPathOperation(path, operation, R.of(parameterName));
