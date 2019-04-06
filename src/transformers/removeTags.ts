import * as R from 'ramda';
import * as S from 'sanctuary';
import { Transformer, Operation } from '../types';
import { overIf } from '../utils';

const withoutTags = (tags: string[]) =>
  overIf(R.lensProp('tags'), R.without(tags));

export const removeTags = (tags: string[]): Transformer =>
  R.pipe(
    overIf(
      R.lensProp('tags'),
      R.reject(R.where({ name: R.flip(R.includes)(tags) }))
    ),
    overIf(R.lensProp('paths'), R.map(R.map(withoutTags(tags))))
  );

export const removeTag = (tag: string) => removeTags(R.of(tag));

export const removeTagsFromPathOperations = (
  path: string,
  operations: Operation[],
  tags: string[]
): Transformer =>
  S.pipe(
    R.map(
      op => overIf(R.lensPath(['paths', path, op]), withoutTags(tags)),
      operations
    )
  );

export const removeTagFromPathOperations = (
  path: string,
  operations: Operation[],
  tag: string
): Transformer => removeTagsFromPathOperations(path, operations, R.of(tag));

export const removeTagsFromPath = (path: string, tags: string[]): Transformer =>
  overIf(R.lensPath(['paths', path]), R.map(withoutTags(tags)));

export const removeTagFromPath = (path: string, tag: string): Transformer =>
  removeTagsFromPath(path, R.of(tag));
