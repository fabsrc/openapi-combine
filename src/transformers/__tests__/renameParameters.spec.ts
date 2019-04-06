import { OpenAPIV3 } from 'openapi-types';
import {
  renamePaths,
  renamePath,
  renamePathsWithFn,
  renamePathsWithRegExp,
  renameParameters,
  renameParametersWithFn,
  renameParametersWithRegExp
} from '..';

const testSchema: OpenAPIV3.Document = {
  openapi: '3.0.0',
  info: {
    title: 'TestSchema',
    version: '0'
  },
  paths: {
    '/test/first': {
      get: {
        parameters: [
          {
            name: 'paramOne',
            in: 'query'
          }
        ]
      }
    },
    '/test/second': {},
    '/test/third': {}
  }
};

describe('renameParameters', () => {
  it('renames parameters in path operations', () => {
    const fn = renameParameters({ paramOne: 'renameOne' });
    const result = fn(testSchema);
    expect(result.paths['/test/first'].get!.parameters).not.toContainEqual({
      name: 'paramOne',
      in: 'query'
    });
    expect(result.paths['/test/first'].get!.parameters).toContainEqual({
      name: 'renameOne',
      in: 'query'
    });
  });
});

describe('renameParametersWithFn', () => {
  it('calls rename function for every parameter key in path operations', () => {
    const mockFn = jest.fn().mockReturnValue('renameOne');
    const result = renameParametersWithFn(mockFn)(testSchema);
    expect(mockFn).toHaveBeenCalledWith('paramOne');
  });

  it('renames a parameter', () => {
    const mockFn = jest.fn().mockReturnValue('renameOne');
    const result = renameParametersWithFn(mockFn)(testSchema);
    expect(result.paths['/test/first'].get!.parameters).not.toContainEqual({
      name: 'paramOne',
      in: 'query'
    });
    expect(result.paths['/test/first'].get!.parameters).toContainEqual({
      name: 'renameOne',
      in: 'query'
    });
  });
});

describe('renameParametersWithRegExp', () => {
  it('renames parameters by RegExp pattern', () => {
    const fn = renameParametersWithRegExp(/param(.*)/, 'rename$1');
    const result = fn(testSchema);
    expect(result.paths['/test/first'].get!.parameters).not.toContainEqual({
      name: 'paramOne',
      in: 'query'
    });
    expect(result.paths['/test/first'].get!.parameters).toContainEqual({
      name: 'renameOne',
      in: 'query'
    });
  });

  it('renames parameters by RegExp pattern as string', () => {
    const fn = renameParametersWithRegExp('param(.*)', 'rename$1');
    const result = fn(testSchema);
    expect(result.paths['/test/first'].get!.parameters).not.toContainEqual({
      name: 'paramOne',
      in: 'query'
    });
    expect(result.paths['/test/first'].get!.parameters).toContainEqual({
      name: 'renameOne',
      in: 'query'
    });
  });
});
