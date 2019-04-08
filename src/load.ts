import { OpenAPIV3, OpenAPIV2 } from 'openapi-types';
import { convertObj } from 'swagger2openapi';
import { bundle } from 'swagger-parser';
import * as R from 'ramda';
import * as RA from 'ramda-adjunct';

type OpenAPIDocument = OpenAPIV3.Document | OpenAPIV2.Document;

const isOpenApiV2Schema = (
  schema: OpenAPIDocument
): schema is OpenAPIV2.Document => !!(schema as OpenAPIV2.Document).swagger;

export const load: (
  source: string | OpenAPIDocument
) => Promise<OpenAPIV3.Document> = R.pipe(
  R.ifElse(
    RA.isString,
    stringSchema => bundle(stringSchema),
    async schema => schema
  ),
  R.then(
    R.when(
      isOpenApiV2Schema,
      R.pipe(
        R.partialRight(convertObj, [{}]),
        R.then(R.prop('openapi'))
      )
    )
  )
);
