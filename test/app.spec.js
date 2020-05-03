/* eslint-disable strict */
const app = require('../src/app');

describe('App', () => {

  it('GET / responds with 200 containing a list of endpoints', () => {
    return supertest(app)
      .get('/')
      .expect(200)
      .then(res => {
        expect(res.body).to.have.property('endpoints');
      });
  });
  
});