// tests/unit/put.test.js

const request = require('supertest')
const app = require('../../src/app')

describe('PUT v1/fragments/:id', () => {
   // If the request is missing the Authorization header, it should be forbidden
   test('unauthenticated requests are denied', () => request(app).get('/v1/fragments/:id').expect(401));

   // If the wrong username/password pair are used (no such user), it should be forbidden
   test('incorrect credentials are denied', () => request(app).get('/v1/fragments/:id').auth('invalid@email.com', 'incorrect_password').expect(401));
 
   //testing that authenticated users can update a fragment
   test('authenticated users update a fragment with the given id', async () => {
     const postRes = await request(app).post('/v1/fragments').send('fragment with text').set('Content-Type', 'text/plain').auth('user1@email.com', 'password1');
     const id = (JSON.parse(postRes.text)).fragment.id;
     const putRes = await request(app).put(`/v1/fragments/${id}`).send('fragment with updated text').set('Content-Type', 'text/plain').auth('user1@email.com', 'password1');
     expect(putRes.statusCode).toBe(201);
     expect(putRes.body.status).toBe('ok');
     const getRes = await request(app).get(`/v1/fragments/${id}`).auth('user1@email.com', 'password1');
     expect(getRes.statusCode).toBe(200);  
     expect(getRes.text).toEqual('fragment with updated text');
   });

  test("Content-Type of the request does not match the existing fragment's type returns 400", async () => {
    const postRes = await request(app).post('/v1/fragments').send('fragment with text').set('Content-Type', 'application/json').auth('user1@email.com', 'password1')
    const id = postRes.headers.location.split('/').pop();
    const res = await request(app).put(`/v1/fragments/${id}`).send('This is an updated fragment').set('Content-Type', 'text/markdown').auth('user1@email.com', 'password1')
    expect(res.statusCode).toBe(400);
  });
});

