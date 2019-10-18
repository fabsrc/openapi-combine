import { OpenAPIV3, OpenAPIV2, OpenAPI } from 'openapi-types';
import { convertObj as convertToOpenAPI } from 'swagger2openapi';
import { bundle } from 'swagger-parser';
import * as R from 'ramda';
import * as RA from 'ramda-adjunct';

const isOpenApiV2Schema = (schema: OpenAPI.Document): schema is OpenAPIV2.Document =>
  !!(schema as OpenAPIV2.Document).swagger;

export const load: (source: string | OpenAPI.Document) => Promise<OpenAPIV3.Document> = R.pipe(
  R.ifElse(RA.isString, stringSchema => bundle(stringSchema), async schema => schema),
  R.then(
    R.when(
      isOpenApiV2Schema,
      R.pipe(
        R.partialRight(convertToOpenAPI, [{}]),
        R.then(R.prop('openapi')),
      ),
    ),
  ),
);
