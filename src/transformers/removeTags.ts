import * as R from 'ramda';
import { Transformer } from '../types';
import { overIf } from '../utils';

const withoutTags = (tags: string[]) =>
  overIf(R.lensProp('tags'), R.without(tags));

export const removeTags = (tags: string[]): Transformer => {
  return R.pipe(
    overIf(
      R.lensProp('tags'),
      R.reject(R.where({ name: R.flip(R.includes)(tags) })),
    ),
    overIf(R.lensProp('paths'), R.map(R.map(withoutTags(tags)))),
  );
};

export const removeTag = (tag: string) => removeTags(R.of(tag));
