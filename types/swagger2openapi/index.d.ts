declare module 'swagger2openapi' {
  import { Agent as HttpAgent } from 'http';
  import { Agent as HttpsAgent } from 'https';
  import { OpenAPIV2, OpenAPIV3 } from 'openapi-types';

  export interface Options {
    agent?: HttpAgent | HttpsAgent;
    debug?: boolean;
    verbose?: boolean;
    warnOnly?: boolean;
    warnProperty?: string;
    whatwg?: boolean;
    yaml?: boolean;
  }

  export interface ConverterResult {
    original: OpenAPIV2.Document;
    text: string;
    openapi: OpenAPIV3.Document;
  }

  export function convertObj(
    swagger: OpenAPIV2.Document,
    options: Options
  ): Promise<ConverterResult>;
}
