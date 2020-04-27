import * as R from "ramda";
import { load } from "./load";
import { combine } from "./combine";

const prAll = (x: Promise<any>[]) => Promise.all(x);

const loadAndCombine = R.pipe(R.map(load), prAll, R.andThen(combine));

export { load, combine, loadAndCombine };
