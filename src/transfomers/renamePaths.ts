import R from 'ramda';
import * as RA from 'ramda-adjunct';
import { Transformer } from '../types/Transformer';
import { overPaths } from '../utils';

export const renamePaths = (renamings: Record<string, string>): Transformer =>
  overPaths(RA.renameKeys(renamings));

export const renamePath = (curPath: string, newPath: string): Transformer =>
  renamePaths({ [curPath]: newPath });

export const renamePathsWithFn = (fn: (key: string) => string): Transformer =>
  overPaths(RA.renameKeysWith(fn));

export const renamePathsWithRegExp = (
  pattern: string | RegExp,
  replacement: string
): Transformer =>
  renamePathsWithFn(R.replace(R.constructN(1, RegExp)(pattern as RegExp), replacement));

export const prependPaths = (base: string) =>
  renamePathsWithRegExp(/(.*)/, `${base}$1`);
