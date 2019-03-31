import _ from 'lodash/fp';
import { OpenAPIV3, OpenAPI } from 'openapi-types';
import * as R from 'ramda';
import * as RA from 'ramda-adjunct';
import { Transformer } from '../types';

// export interface IRenaming {
//   originalPath: string;
//   renamedPath: string;
// }

// export interface IRenaming {
//   originalPath: string | RegExp;
//   renamedPath: string | RegExp;
// }

// const prepareRenamings = (renamings: IRenaming[]) => {
//   const rrr = R.pipe(
//     R.map<IRenaming, Array<string | RegExp>>(
//       R.props<keyof IRenaming, string | RegExp>(['originalPath', 'renamedPath'])
//     ),
//     R.map<Array<string | RegExp>, Array<RegExp>>(RegExp)
//   )(renamings);
//   return (paths: OpenAPIV3.PathObject) => {
//     const keys = R.keys(paths);
//     R.forEach(renaming => {}, rrr);
//   };
// };

// const rename = R.pipe(
//   R.map<IRenaming, string[]>(
//     R.props<keyof IRenaming, string>(['originalPath', 'renamedPath'])
//   ),
//   R.fromPairs as (pairs: string[][]) => ReadonlyArray<Record<string, string>>,
//   R.mergeAll,
//   RA.renameKeys
// );

// const mergeLeftWithFn = <T, U>(fn: (arg: T) => U) => (obj: T) =>
//   R.mergeLeft(fn(obj), obj);

// export const renamePaths = (renamings: IRenaming[]): Transformer => {
//   return mergeLeftWithFn<OpenAPIV3.Document, { paths: OpenAPIV3.PathObject }>(
//     R.pipe(
//       R.prop<'paths', OpenAPIV3.PathObject>('paths'),
//       // prepareRenamings(renamings),
//       rename(renamings),
//       R.objOf('paths')
//     )
//   );
// };

export const renamePaths = (renamings: Record<string, string>): Transformer =>
  R.over(R.lensProp('paths'), RA.renameKeys(renamings));

export const renamePath = (curPath: string, newPath: string): Transformer =>
  renamePaths({ [curPath]: newPath });

export const renamePathsWith = (fn: (key: string) => string): Transformer =>
  R.over(R.lensProp('paths'), RA.renameKeysWith(fn));

export const renamePathsWithRegExp = (
  renamings: [string | RegExp, string][]
): Transformer =>
  renamePathsWith(key => {
    for (let renaming of renamings) {
      const re = new RegExp(renaming[0]);

      if (key.match(re)) {
        return key.replace(re, renaming[1]);
      }
    }
    return key;
  });
