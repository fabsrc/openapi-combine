import { OpenAPIV3 } from 'openapi-types';
import {
  includePaths,
  includePath,
  includeOperationsFromPath,
  includeOperationsFromPaths,
} from '../includePaths';
import { Operation } from '../../types/Operation';

const testSchema: OpenAPIV3.Document = {
  openapi: '3.0.0',
  info: {
    title: 'TestSchema',
    version: '0',
  },
  paths: {
    '/test/first': {
      get: {},
      post: {},
    },
    '/test/second': {
      get: {},
      post: {},
    },
    '/test/third': {
      get: {},
      post: {},
    },
  },
};

describe('includePaths', () => {
  it('includes specified paths from schema', () => {
    const testPaths = ['/test/first', '/test/second'];
    const result = includePaths(testPaths)(testSchema);
    expect(Object.keys(result.paths)).toHaveLength(testPaths.length);
    testPaths.forEach((testPath) => {
      expect(result).toHaveProperty(['paths', testPath]);
    });
  });
});

describe('includePath', () => {
  it('includes specified paths from schema', () => {
    const testPath = '/test/first';
    const result = includePath(testPath)(testSchema);
    expect(Object.keys(result.paths)).toHaveLength(1);
    expect(result).toHaveProperty(['paths', testPath]);
  });
});

describe('includeOperationsFromPath', () => {
  it('includes specified operations from path in schema', () => {
    const testPath = '/test/first';
    const testOperations = [Operation.POST];
    const result = includeOperationsFromPath(testPath, testOperations)(testSchema);
    expect(Object.keys(result.paths[testPath])).toHaveLength(1);
    expect(result).toHaveProperty(['paths', testPath, testOperations[0]]);
  });
});

describe('includeOperationsFromPaths', () => {
  it('includes specified operations from paths in schema', () => {
    const testPathsAndOperations = {
      '/test/first': [Operation.GET],
      '/test/second': [Operation.POST],
    };
    const result = includeOperationsFromPaths(testPathsAndOperations)(testSchema);
    expect(Object.keys(result.paths['/test/first'])).toHaveLength(1);
    expect(result).toHaveProperty(['paths', '/test/first', Operation.GET]);
    expect(Object.keys(result.paths['/test/second'])).toHaveLength(1);
    expect(result).toHaveProperty(['paths', '/test/second', Operation.POST]);
  });
});
