import { combine } from '../src';

combine([
  {
    source: 'https://api.apis.guru/v2/specs/medium.com/1.0.0/swagger.yaml'
  },
  {
    source: 'http://petstore.swagger.io/v2/swagger.json'
  },
  {
    source: {
      openapi: '3.0.0',
      info: {
        title: 'Combine Example',
        version: '1'
      },
      paths: {}
    }
  }
])
  .then(console.log)
  .catch(console.error);
