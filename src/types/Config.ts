import { OpenAPIV3, OpenAPIV2} from "openapi-types";
import { Transformer } from "./Transformer";

export interface Config {
  source: string | OpenAPIV3.Document | OpenAPIV2.Document;
  transformers?: Transformer[];
}
