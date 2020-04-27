import { OpenAPIV3 } from "openapi-types";
import * as S from "sanctuary";
import * as R from "ramda";
import { Transformer } from "./types/Transformer";

export const transform = R.curry(
  (transformers: Transformer[], schema: OpenAPIV3.Document) =>
    S.pipe(transformers)(schema)
);
