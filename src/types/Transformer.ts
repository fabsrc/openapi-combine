import { OpenAPIV3 } from "openapi-types";

export interface Transformer {
  (schema: OpenAPIV3.Document): OpenAPIV3.Document;
}
