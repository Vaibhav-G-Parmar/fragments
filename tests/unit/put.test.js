// tests/unit/put.test.js

const request = require('supertest')
const app = require('../../src/app')

describe('PUT v1/fragments/:id', () => {
  //  // If the request is missing the Authorization header, it should be forbidden
  //  test('unauthenticated requests are denied', () => request(app).get('/v1/fragments/:id').expect(401));

  //  // If the wrong username/password pair are used (no such user), it should be forbidden
  //  test('incorrect credentials are denied', () => request(app).get('/v1/fragments/:id').auth('invalid@email.com', 'incorrect_password').expect(401));
 
  //  //testing that authenticated users can update a fragment
  //  test('authenticated users update a fragment with the given id', async () => {
  //    const postRes = await request(app).post('/v1/fragments').send('fragment with text').set('Content-Type', 'text/plain').auth('user1@email.com', 'password1');
  //    const id = (JSON.parse(postRes.text)).fragment.id;
  //    const putRes = await request(app).put(`/v1/fragments/${id}`).send('fragment with updated text').set('Content-Type', 'text/plain').auth('user1@email.com', 'password1');
  //    expect(putRes.statusCode).toBe(201);
  //    expect(putRes.body.status).toBe('ok');
  //   // const fragment = (JSON.parse(putRes.text)).fragment;
     
  //  });
 
   // updating unknown fragment id should return 404
   test('updating unknown fragment id returns 404', async () => {
     const res = await request(app).put('/v1/fragments/unknownId').auth('user2@email.com', 'password2');
     expect(res.statusCode).toBe(404);
   });
});

