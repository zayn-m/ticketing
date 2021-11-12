const request = require('supertest');
const appUrl =  "http://127.0.0.1:5000";

describe('API testing', () => {
    before(done => {
        require('../../app');
        setTimeout(done, 14000);
    })

    it('should ping GET /ping', (done) => {
        request(appUrl)
            .get('/ping')
            .expect(200, done)
    })
})