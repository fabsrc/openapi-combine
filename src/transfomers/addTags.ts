import * as R from "ramda";
import * as RA from "ramda-adjunct";
import { Transformer } from "../types/Transformer";
import { eachOperation } from "../utils";

const addOrCreateTags = (tags: string[]) =>
  R.ifElse(RA.isArray, R.concat(R.__, tags), R.always(tags));

export const addTags = (tags: string[]): Transformer =>
  eachOperation(R.over(R.lensProp("tags"), addOrCreateTags(tags)));
