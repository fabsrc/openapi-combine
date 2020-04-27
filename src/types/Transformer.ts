import { OpenAPIV3, OpenAPIV2 } from "openapi-types";

export interface Transformer {
  (schema: OpenAPIV3.Document): OpenAPIV3.Document;
}

export interface TransformConfig {
  source: string | OpenAPIV3.Document | OpenAPIV2.Document;
  transformers?: Transformer[];
}
