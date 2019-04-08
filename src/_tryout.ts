import R from 'ramda';
import SwaggerParser from 'swagger-parser';
import { OpenAPIV3 } from 'openapi-types';
import {
  renamePath,
  renamePaths,
  renamePathsWithRegExp
} from './transformers/renamePaths';
import {
  excludePaths,
  excludePath,
  excludeOperationsFromPath,
  excludeOperationsFromPaths
} from './transformers/excludePaths';
import {
  includePaths,
  includePath,
  includeOperationsFromPath,
  includeOperationsFromPaths
} from './transformers/includePaths';
import { removeTags, removeTag } from './transformers/removeTags';
import { Operation } from './types';
import {
  excludeParameterFromPathOperation,
  excludeParameterFromPath,
  excludeParametersFromPath,
  excludeParametersFromPathOperation
} from './transformers/excludeParameters';
import { includeParametersFromPath } from './transformers';

const schema = __dirname + '/../schema.yaml';

(async () => {
  let bundledSchema: OpenAPIV3.Document = await SwaggerParser.bundle(
    schema,
    {}
  );

  const transform = R.pipe(
    renamePath('/pets/{petId}', 'haha'),
    // renamePaths({ '/pets': '/yolo' }),
    // renamePathsWith(key => {
    //   if (key === '/pets') {
    //     return '/1232343';
    //   }
    //   return key;
    // })
    // renamePathsWithRegExp([[/\/(.*)\/{petId}/, '/werwerwe/$1']]),
    // renamePathsWithRegExp([['/(.*)/{petId}', '/werwerwe/$1']]),
    // excludePaths(['/pets/{petId}']),
    // excludePath('/pets'),
    // includePaths(['/pets/{petId}']),
    // includePath('/pets'),
    includeOperationsFromPaths({ '/pets': [Operation.GET] }),
    excludeOperationsFromPath('/pets', [Operation.POST, Operation.GET]),
    excludeOperationsFromPaths({ '/pets': [Operation.POST, Operation.GET] }),
    removeTags(['pets'])
    // removeTag('pets'),
    // excludeParametersFromPathOperation('/pets', Operation.GET, ['limit'])
    // excludeParametersFromPath('/pets', ['limit', 'paaar']),
    // includeParametersFromPath('/pets', ['paaar'])
  );

  console.log(JSON.stringify(transform(bundledSchema).paths, null, 2));
  // transform(bundledSchema);
})();
