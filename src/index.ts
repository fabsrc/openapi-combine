import * as R from "ramda";
import { load } from "./load";
import { combine } from "./combine";
import { promiseAll } from "./utils";
import { Config } from "./types/Config";
import { transform } from "./transform";

const loadAndCombine = R.pipe(R.map(load), promiseAll, R.andThen(combine));

const loadTransformAndCombine = R.pipe(
  R.map(async (config: Config) => ({
    source: await load(config.source),
    transformers: config.transformers || [],
  })),
  promiseAll,
  R.andThen(R.map((config) => transform(config.transformers, config.source))),
  R.andThen(combine)
);

export { load, combine, loadAndCombine, loadTransformAndCombine };
