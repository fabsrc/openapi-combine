import { OpenAPIV3 } from 'openapi-types';
import { removeTags, removeTag } from '..';

const testSchema: OpenAPIV3.Document = {
  openapi: '3.0.0',
  info: {
    title: 'TestSchema',
    version: '0',
  },
  tags: [
    {
      name: 'TEST_TAG_ONE',
    },
    {
      name: 'TEST_TAG_TWO',
    },
  ],
  paths: {
    '/test/first': {
      get: {
        tags: ['TEST_TAG_ONE', 'TEST_TAG_TWO'],
      },
    },
    '/test/second': {},
    '/test/third': {},
  },
};

describe('removeTags', () => {
  it('removes tags from tag definitions', () => {
    const fn = removeTags(['TEST_TAG_ONE', 'TEST_TAG_TWO']);
    const result = fn(testSchema);
    expect(result.tags).toHaveLength(0);
  });

  it('removes tags from path operations', () => {
    const fn = removeTags(['TEST_TAG_ONE', 'TEST_TAG_TWO']);
    const result = fn(testSchema);
    expect(result.paths['/test/first'].get!.tags).not.toContain([
      'TEST_TAG_ONE',
      'TEST_TAG_TWO',
    ]);
  });
});

describe('removeTag', () => {
  it('removes tag from tag definitions', () => {
    const fn = removeTag('TEST_TAG_ONE');
    const result = fn(testSchema);
    expect(result.tags).toHaveLength(1);
  });

  it('removes tag from path operations', () => {
    const fn = removeTag('TEST_TAG_ONE');
    const result = fn(testSchema);
    expect(result.paths['/test/first'].get!.tags).not.toContain('TEST_TAG_ONE');
  });
});
