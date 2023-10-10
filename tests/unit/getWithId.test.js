// tests/unit/getWithId.test.js

const request = require('supertest');

const app = require('../../src/app');

describe('GET /v1/fragments/:id', () => {
  // If the request is missing the Authorization header, it should be forbidden
  test('unauthenticated requests are denied', () => request(app).get('/v1/fragments/:id').expect(401));

  // If the wrong username/password pair are used (no such user), it should be forbidden
  test('incorrect credentials are denied', () =>
    request(app).get('/v1/fragments/:id').auth('invalid@email.com', 'incorrect_password').expect(401));

  // unknown fragment id should return 404
  test('unknown fragment id returns 404', async () => {
    const res = await request(app).get('/v1/fragments/unknownId').auth('user2@email.com', 'password2');
    expect(res.statusCode).toBe(404);
  });

});
