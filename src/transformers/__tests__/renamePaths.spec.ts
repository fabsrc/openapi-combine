import { OpenAPIV3 } from 'openapi-types';
import {
  renamePaths,
  renamePath,
  renamePathsWithFn,
  renamePathsWithRegExp,
} from '..';

const testSchema: OpenAPIV3.Document = {
  openapi: '3.0.0',
  info: {
    title: 'TestSchema',
    version: '0',
  },
  paths: {
    '/test/first': {},
    '/test/second': {},
    '/test/third': {},
  },
};

describe('renamePaths', () => {
  it('renames multiple paths', () => {
    const fn = renamePaths({
      '/test/first': '/rename/first',
      '/test/second': '/rename/second',
    });
    const result = fn(testSchema);
    expect(result).toHaveProperty('paths./rename/first');
    expect(result).not.toHaveProperty('paths./test/first');
    expect(result).toHaveProperty('paths./rename/second');
    expect(result).not.toHaveProperty('paths./test/second');
  });
});

describe('renamePath', () => {
  it('renames multiple paths', () => {
    const fn = renamePath('/test/first', '/rename/first');
    const result = fn(testSchema);
    expect(result).toHaveProperty('paths./rename/first');
    expect(result).not.toHaveProperty('paths./test/first');
  });
});

describe('renamePathsWithFn', () => {
  it('calls rename function for every path key', () => {
    const mockFn = jest.fn();
    renamePathsWithFn(mockFn)(testSchema);
    const pathNames = Object.keys(testSchema.paths);
    expect(mockFn).toHaveBeenCalledTimes(pathNames.length);
    pathNames.forEach(pathName => {
      expect(mockFn).toHaveBeenCalledWith(pathName);
    });
  });
});

describe('renamePathsWithRegExp', () => {
  it('renames paths by RegExp pattern', () => {
    const fn = renamePathsWithRegExp(/\/test\/(.*)/, '/rename/$1');
    const result = fn(testSchema);
    expect(result).toHaveProperty(['paths', '/rename/first']);
    expect(result).toHaveProperty(['paths', '/rename/second']);
    expect(result).toHaveProperty(['paths', '/rename/third']);
  });

  it('renames paths by RegExp pattern as string', () => {
    const fn = renamePathsWithRegExp('/test/(.*)', '/rename/$1');
    const result = fn(testSchema);
    expect(result).toHaveProperty(['paths', '/rename/first']);
    expect(result).toHaveProperty(['paths', '/rename/second']);
    expect(result).toHaveProperty(['paths', '/rename/third']);
  });
});
