import { transform } from './transform';
import { renamePath } from './transformers';
import { combine, CombineConfig } from './combine';

const schemaOptionsV2: CombineConfig = {
  source: {
    swagger: '2.0',
    info: {
      title: 'Hello World v2',
      version: '2.0.0'
    },
    paths: {}
  }
};

const schemaOptionsV3: CombineConfig = {
  source: {
    openapi: '3.0.0',
    info: {
      title: 'Hello World v3',
      version: '3.0.0'
    },
    paths: {
      '/yolo': {}
    }
  },
  transformers: [renamePath('/yolo', '/haha')]
};

const schemaOptionsRemoteV2: CombineConfig = {
  source:
    'https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v2.0/yaml/petstore-with-external-docs.yaml'
};

const schemaOptionsRemoteV3: CombineConfig = {
  source:
    'https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v3.0/petstore.yaml'
};

const schemaOptionsLocal: CombineConfig = {
  source: './schema.yaml'
};

combine([schemaOptionsRemoteV2, schemaOptionsV3])
  .then(res => {
    console.log(res);
  })
  .catch(console.error);
