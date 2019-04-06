import { OpenAPIV3 } from 'openapi-types';
import {
  removeTags,
  removeTag,
  removeTagsFromPathOperations,
  removeTagFromPathOperations,
  removeTagsFromPath,
  removeTagFromPath
} from '..';
import { Operation } from '../../types';

const testSchema: OpenAPIV3.Document = {
  openapi: '3.0.0',
  info: {
    title: 'TestSchema',
    version: '0'
  },
  tags: [
    {
      name: 'TEST_TAG_ONE'
    },
    {
      name: 'TEST_TAG_TWO'
    }
  ],
  paths: {
    '/test/first': {
      get: {
        tags: ['TEST_TAG_ONE', 'TEST_TAG_TWO']
      },
      post: {
        tags: ['TEST_TAG_ONE', 'TEST_TAG_TWO']
      }
    },
    '/test/second': {},
    '/test/third': {}
  }
};

describe('removeTags', () => {
  const fn = removeTags(['TEST_TAG_ONE', 'TEST_TAG_TWO']);
  const result = fn(testSchema);

  it('removes tags from tag definitions', () => {
    expect(result.tags).toHaveLength(0);
  });

  it('removes tags from path operations', () => {
    expect(result.paths['/test/first'].get!.tags).not.toContain([
      'TEST_TAG_ONE',
      'TEST_TAG_TWO'
    ]);
  });
});

describe('removeTag', () => {
  const fn = removeTag('TEST_TAG_ONE');
  const result = fn(testSchema);

  it('removes tag from tag definitions', () => {
    expect(result.tags).toHaveLength(1);
  });

  it('removes tag from path operations', () => {
    expect(result.paths['/test/first'].get!.tags).not.toContain('TEST_TAG_ONE');
  });
});

describe('removeTagsFromPathOperations', () => {
  it('removes tags from path operations', () => {
    const fn = removeTagsFromPathOperations(
      '/test/first',
      [Operation.GET],
      ['TEST_TAG_ONE']
    );
    const result = fn(testSchema);
    expect(result.paths['/test/first'].get!.tags).toHaveLength(1);
    expect(result.paths['/test/first'].get!.tags).not.toContain('TEST_TAG_ONE');
  });
});

describe('removeTagFromPathOperations', () => {
  it('removes tag from path operations', () => {
    const fn = removeTagFromPathOperations(
      '/test/first',
      [Operation.GET],
      'TEST_TAG_ONE'
    );
    const result = fn(testSchema);
    expect(result.paths['/test/first'].get!.tags).toHaveLength(1);
    expect(result.paths['/test/first'].get!.tags).not.toContain('TEST_TAG_ONE');
  });
});

describe('removeTagsFromPath', () => {
  it('removes tags from all operations of a path', () => {
    const fn = removeTagsFromPath('/test/first', ['TEST_TAG_ONE']);
    const result = fn(testSchema);
    expect(result.paths['/test/first'].get!.tags).toHaveLength(1);
    expect(result.paths['/test/first'].get!.tags).not.toContain('TEST_TAG_ONE');
    expect(result.paths['/test/first'].post!.tags).toHaveLength(1);
    expect(result.paths['/test/first'].post!.tags).not.toContain(
      'TEST_TAG_ONE'
    );
  });
});

describe('removeTagFromPath', () => {
  it('removes a tag from all operations of a path', () => {
    const fn = removeTagFromPath('/test/first', 'TEST_TAG_ONE');
    const result = fn(testSchema);
    expect(result.paths['/test/first'].get!.tags).toHaveLength(1);
    expect(result.paths['/test/first'].get!.tags).not.toContain('TEST_TAG_ONE');
    expect(result.paths['/test/first'].post!.tags).toHaveLength(1);
    expect(result.paths['/test/first'].post!.tags).not.toContain(
      'TEST_TAG_ONE'
    );
  });
});
