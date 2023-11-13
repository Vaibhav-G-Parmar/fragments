// tests/unit/post.test.js

const request = require('supertest')
const app = require('../../src/app')
const { readFragment } = require('../../src/model/data');

describe('POST /fragments', () => {
  // If the request is missing the Authorization header, it should be forbidden
  test('unauthenticated requests are denied', () => request(app).post('/v1/fragments').expect(401));

  // If the wrong username/password pair are used (no such user), it should be forbidden
  test('incorrect credentials are denied', () =>
  request(app).post('/v1/fragments').auth('invalid@email.com', 'incorrect_password').expect(401));

  // Using a valid username/password pair should give a success result with a .fragments array
  test('authenticated users get a fragments array', async () => {
    const res = await request(app).get('/v1/fragments').auth('user1@email.com', 'password1');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(Array.isArray(res.body.fragments)).toBe(true);
  });

  //testing that authenticated users cannot create a fragment without any data being sent
  test('fragment without data will error', async () => {
    const res = await request(app).post('/v1/fragments').send().auth('user1@email.com', 'password1');
    expect(res.statusCode).toBe(500);
  });

  //testing that authenticated users can create a plain text fragment
  //Using a valid username/password pair should give a success result 
  test('authenticated users post a fragment', async () => {
    const res = await request(app).post('/v1/fragments').send('fragment with text').set('Content-type', 'text/plain').auth('user1@email.com', 'password1');
    expect(res.statusCode).toBe(201);
    expect(res.type).toBe('text/plain');
  });

  //responses include a Location header with a URL to GET the fragment
  test('responses include a Location header with a URL to GET the fragment', async () => {
    const res = await request(app).post('/v1/fragments').send('fragment with a text').set('Content-Type', 'text/plain').auth('user1@email.com', 'password1')
    expect(res.statusCode).toBe(201);
    expect(res.headers.location).toEqual(`${process.env.API_URL}/v1/fragments/${JSON.parse(res.text).fragment.id}`);
  });

  //trying to create a fragment with an unsupported type should 
  test('authenticated users trying to post a fragment with an unsupported', async () => {
    const res = await request(app).post('/v1/fragments').set('Content-type', 'image/png').auth('user1@email.com', 'password1');
    expect(res.statusCode).toBe(415);
    expect(res.body.status).toBe('error');
  });
});

