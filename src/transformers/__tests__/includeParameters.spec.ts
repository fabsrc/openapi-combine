import { OpenAPIV3 } from 'openapi-types';
import { includeParametersFromPath, includeParameterFromPath } from '..';

const testSchema: OpenAPIV3.Document = {
  openapi: '3.0.0',
  info: {
    title: 'TestSchema',
    version: '0',
  },
  paths: {
    '/test/first': {
      get: {
        parameters: [
          {
            name: 'TEST_PARAM_IN_OP',
            in: 'query',
          },
        ],
      },
      parameters: [
        {
          name: 'TEST_PARAM_IN_PATH_ONE',
          in: 'query',
        },
        {
          name: 'TEST_PARAM_IN_PATH_TWO',
          in: 'query',
        },
      ],
    },
  },
};

describe('includeParametersFromPath', () => {
  it('includes parameters from path', () => {
    const fn = includeParametersFromPath('/test/first', [
      'TEST_PARAM_IN_PATH_ONE',
    ]);
    const result = fn(testSchema);
    expect(result.paths['/test/first'].parameters).toHaveLength(1);
    expect(result.paths['/test/first'].parameters).toContainEqual(
      expect.objectContaining({
        name: 'TEST_PARAM_IN_PATH_ONE',
      }),
    );
  });
});

describe('includeParameterFromPath', () => {
  it('includes parameter from path', () => {
    const fn = includeParameterFromPath(
      '/test/first',
      'TEST_PARAM_IN_PATH_ONE',
    );
    const result = fn(testSchema);
    expect(result.paths['/test/first'].parameters).toHaveLength(1);
    expect(result.paths['/test/first'].parameters).toContainEqual(
      expect.objectContaining({
        name: 'TEST_PARAM_IN_PATH_ONE',
      }),
    );
  });
});
