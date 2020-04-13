import { OpenAPIV3 } from 'openapi-types';
import { addTags } from '../addTags';

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
        tags: ['TEST_TAG_ONE']
      },
      post: {}
    },
    '/test/second': {},
    '/test/third': {}
  }
};

describe('addTags', () => {
  const fn = addTags(['ADD_TAG_ONE', 'ADD_TAG_TWO']);
  const result = fn(testSchema);

  it('appends tags to existing tags in path operations', () => {
    expect(result.paths['/test/first'].get!.tags).toEqual(
      expect.arrayContaining(['TEST_TAG_ONE', 'ADD_TAG_ONE', 'ADD_TAG_TWO'])
    );
  });

  it('adds tags to path operations', () => {
    expect(result.paths['/test/first'].post!.tags).toEqual(
      expect.arrayContaining(['ADD_TAG_ONE', 'ADD_TAG_TWO'])
    );
  });
});
