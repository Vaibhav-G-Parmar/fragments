// tests/unit/app.test.js

const request = require('supertest');

const app = require('../../src/app');

describe("GET requests for undefine routes", () => {
    test('to get 404 error for undefined routes', () =>
      request(app).get('/undefined-route').expect(404));
});
