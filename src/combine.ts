import { OpenAPIV3, OpenAPIV2 } from 'openapi-types';
import * as R from 'ramda';
import { load } from './load';
import { Transformer } from './types';
import { transform } from './transform';

export interface CombineConfig {
  source: string | OpenAPIV3.Document | OpenAPIV2.Document;
  transformers?: Transformer[];
  options?: object;
}

const prAll = <T>(values: (T | PromiseLike<T>)[]): Promise<T[]> =>
  Promise.all(values);

const concatValues = (k: string, l: any, r: any) => {
  if (k === 'openapi') {
    return '3.0.0';
  }

  return r;
};

// const mergeDeepWithKeyAndPath = R.curryN(4, function mergeDeepWithKey(
//   fn,
//   lObj,
//   rObj,
//   p = []
// ) {
//   return R.mergeWithKey(
//     function(k, lVal, rVal): any {
//       const path = [...p, k];
//       if (RA.isObject(lVal) && RA.isObject(rVal)) {
//         return mergeDeepWithKeyAndPath(fn, lVal, rVal, path);
//       } else {
//         return fn(k, lVal, rVal, path);
//       }
//     },
//     lObj,
//     rObj
//   );
// });

// const a = mergeDeepWithKeyAndPath(concatValues);
const a = R.mergeDeepWithKey(concatValues);

export const combine: (
  schemaConfigs: CombineConfig[]
) => Promise<OpenAPIV3.Document> = R.pipe(
  R.map(async (config: CombineConfig) => ({
    source: await load(config.source),
    transformers: config.transformers
  })),
  prAll,
  R.then(R.map(config => transform(config.transformers || [], config.source))),
  // R.then(R.map(R.omit(['info']))),
  R.then(R.reduce<OpenAPIV3.Document, object>(a, {})),
  R.then(
    R.mergeDeepRight({
      openapi: '3.0',
      info: { title: '', version: '' },
      paths: {}
    })
  )
);
