import R from 'ramda';
import * as RA from 'ramda-adjunct';
import { Transformer } from '../types';
import { overIf, overPaths } from '../utils';
import { OpenAPIV3 } from 'openapi-types';

const valueOrKey = (keysMap: Record<string, string>) =>
  R.when(R.has(R.__, keysMap), R.prop(R.__, keysMap));

export const renameParameters = (renamings: Record<string, string>) =>
  renameParametersWithFn(valueOrKey(renamings));

export const renameParametersWithRegExp = (
  pattern: string | RegExp,
  replacement: string
): Transformer =>
  renameParametersWithFn(
    R.replace(R.constructN(1, RegExp)(pattern as RegExp), replacement)
  );

export const renameParametersWithFn = (fn: (key: string) => string) =>
  overPaths(
    R.map(
      R.map(
        overIf(R.lensProp('parameters'), R.map(overIf(R.lensProp('name'), fn)))
      )
    )
  );

// export const renamePaths = (renamings: Record<string, string>): Transformer =>
//   overPaths(RA.renameKeys(renamings));

// export const renamePath = (curPath: string, newPath: string): Transformer =>
//   renamePaths({ [curPath]: newPath });

// export const renamePathsWithFn = (fn: (key: string) => string): Transformer =>
//   overPaths(RA.renameKeysWith(fn));

// export const renamePathsWithRegExp = (
//   pattern: string | RegExp,
//   replacement: string
// ): Transformer =>
//   renamePathsWithFn(R.replace(R.constructN(1, RegExp)(pattern), replacement));
