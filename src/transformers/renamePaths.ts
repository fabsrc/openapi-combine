import R from 'ramda';
import * as RA from 'ramda-adjunct';
import { Transformer } from '../types';
import { overIf } from '../utils';

export const renamePaths = (renamings: Record<string, string>): Transformer =>
  overIf(R.lensProp('paths'), RA.renameKeys(renamings));

export const renamePath = (curPath: string, newPath: string): Transformer =>
  renamePaths({ [curPath]: newPath });

export const renamePathsWithFn = (fn: (key: string) => string): Transformer =>
  overIf(R.lensProp('paths'), RA.renameKeysWith(fn));

export const renamePathsWithRegExp = (
  pattern: string | RegExp,
  replacement: string,
): Transformer =>
  renamePathsWithFn(R.replace(R.constructN(1, RegExp)(pattern), replacement));
