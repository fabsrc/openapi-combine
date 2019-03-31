import _ from 'lodash/fp';
import R from 'ramda';
import SwaggerParser from 'swagger-parser';
import { OpenAPIV3 } from 'openapi-types';
import {
  renamePath,
  renamePaths,
  renamePathsWith,
  renamePathsWithRegExp
} from './transformers/renamePaths';
import {
  excludePaths,
  excludePath,
  excludePathOperations,
  excludePathsOperations
} from './transformers/excludePaths';
import {
  includePaths,
  includePath,
  includePathOperations,
  includePathsOperations
} from './transformers/includePaths';
import { removeTags, removeTag } from './transformers/removeTags';
import { Operation } from 'types';

const schema = __dirname + '/../schema.yaml';

(async () => {
  let bundledSchema: OpenAPIV3.Document = await SwaggerParser.bundle(
    schema,
    {}
  );

  const transform = R.pipe(
    // renamePath('/pets/{petId}', 'haha'),
    // renamePaths({ '/pets': '/yolo' }),
    // renamePathsWith(key => {
    //   if (key === '/pets') {
    //     return '/1232343';
    //   }
    //   return key;
    // })
    // renamePathsWithRegExp([[/\/(.*)\/{petId}/, '/werwerwe/$1']])
    // excludePaths(['/pets/{petId}'])
    // excludePath('/pets')
    // includePaths(['/pets/{petId}'])
    // includePath('/pets'),
    // includePathOperations('/pets', ['get', 'post']),
    // includePathsOperations([['/pets', ['get']]])
    // excludePathOperations('/pets', [Operation.POST, Operation.GET])
    excludePathsOperations({ '/pets': [Operation.POST, Operation.GET] })
    // removeTags(['pets']),
    // removeTag('pets')
  );

  console.log(JSON.stringify(transform(bundledSchema).paths, null, 2));
  // transform(bundledSchema);
})();
