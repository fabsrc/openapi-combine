import * as R from 'ramda';
import { Transformer } from '../types';

const withoutTags = (tags: string[]) =>
  R.over(R.lensProp('tags'), R.without(tags));

export const removeTags = (tags: string[]): Transformer => {
  return R.pipe(
    withoutTags(tags),
    R.over(R.lensProp('paths'), R.map(R.map(withoutTags(tags))))
  );
};

export const removeTag = (tag: string) => removeTags(R.of(tag));
