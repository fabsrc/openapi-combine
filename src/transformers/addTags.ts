import * as R from 'ramda';
import * as RA from 'ramda-adjunct';
import * as S from 'sanctuary';
import { Transformer, Operation } from '../types';
import { overPaths } from '../utils';

const addOrCreateTags = (tags: string[]) =>
  R.ifElse(RA.isArray, R.concat(R.__, tags), R.always(tags));

export const addTags = (tags: string[]): Transformer =>
  overPaths(R.map(R.map(R.over(R.lensProp('tags'), addOrCreateTags(tags)))));

// R.pipe(
//   overIf(
//     R.lensProp('tags'),
//     R.reject(R.where({ name: R.flip(R.includes)(tags) }))
//   ),
//   overIf(R.lensProp('paths'), R.map(R.map(withoutTags(tags))))
// );

// const withoutTags = (tags: string[]) =>
//   overIf(R.lensProp('tags'), R.without(tags));

// export const removeTags = (tags: string[]): Transformer =>
//   R.pipe(
//     overIf(
//       R.lensProp('tags'),
//       R.reject(R.where({ name: R.flip(R.includes)(tags) }))
//     ),
//     overIf(R.lensProp('paths'), R.map(R.map(withoutTags(tags))))
//   );

// export const removeTag = (tag: string) => removeTags(R.of(tag));

// export const removeTagsFromPathOperations = (
//   path: string,
//   operations: Operation[],
//   tags: string[]
// ): Transformer =>
//   S.pipe(
//     R.map(
//       op => overIf(R.lensPath(['paths', path, op]), withoutTags(tags)),
//       operations
//     )
//   );

// export const removeTagFromPathOperations = (
//   path: string,
//   operations: Operation[],
//   tag: string
// ): Transformer => removeTagsFromPathOperations(path, operations, R.of(tag));

// export const removeTagsFromPath = (path: string, tags: string[]): Transformer =>
//   overIf(R.lensPath(['paths', path]), R.map(withoutTags(tags)));

// export const removeTagFromPath = (path: string, tag: string): Transformer =>
//   removeTagsFromPath(path, R.of(tag));
