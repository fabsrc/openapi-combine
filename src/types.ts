import { OpenAPIV3 } from 'openapi-types';

export interface Transformer {
  (schema: OpenAPIV3.Document): OpenAPIV3.Document;
}

export const enum Operation {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete'
}
