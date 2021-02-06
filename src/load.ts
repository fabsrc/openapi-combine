import { OpenAPIV3, OpenAPIV2, OpenAPI } from "openapi-types";
import { convertObj as convertToOpenAPI } from "swagger2openapi";
import { bundle } from "swagger-parser";
import * as R from "ramda";

const isOpenApiV2Schema = (
  schema: OpenAPI.Document
): schema is OpenAPIV2.Document => !!(schema as OpenAPIV2.Document).swagger;

export const load: (
  source: string | OpenAPI.Document
) => Promise<OpenAPIV3.Document> = R.pipe(
  (source: OpenAPI.Document | string) => bundle(source),
  R.andThen(
    R.ifElse(
      isOpenApiV2Schema,
      R.pipe(
        (doc: OpenAPIV2.Document) => convertToOpenAPI(doc, {}),
        R.andThen(R.prop("openapi"))
      ),
      R.identity
    )
  )
);
