const request = require('supertest');
const app = require('../app'); // our Node application

describe('POST /notebook', () => {
    it('should respond with a 200', async(done) => {
          request(app)
            .post('/notebooks')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('should return the uuid of the created notebook entry', async(done) => {
        const response = await request(app).post('/notebooks');
        expect(response.body.id).toBeDefined();
        done();
    });
});

