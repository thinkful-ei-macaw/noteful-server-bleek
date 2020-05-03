/* eslint-disable strict */
const knex = require('knex');
const app = require('../src/app');
const { TEST_DATABASE_URL } = require('../src/config');

const { makeFoldersArray, randomFolder } = require('./app.fixtures');

describe('Folders endpoints', () => {
  let db;

  before('set up db instance', () => {
    db = knex({
      client: 'pg',
      connection: TEST_DATABASE_URL
    });

    app.set('db', db);
  });

  const cleanData = () => db.raw('TRUNCATE folders, notes RESTART IDENTITY CASCADE');
  before('clean the table', cleanData);
  afterEach('clean the table', cleanData);

  after('disconnect from db', () => db.destroy());


  // POST requests (CREATE)
  describe('POST /folders', () => {
    const testFolder = randomFolder();

    context('Given correct data', () => {
      it('responds with 201 and adds folder to the table', () => {
        delete testFolder.id;     
        return supertest(app)
          .post('/folders')
          .send(testFolder)
          .expect(201)
          .then(res => {
            expect(res.body.name).to.equal(testFolder.name);
            expect(res.body).to.have.property('id');
            return supertest(app)
              .get(`/folders/${res.body.id}`)
              .expect(200);
          });
      });
    });
    
    context('Given incorrect data', () => {
      const requiredFields = ['name'];
      requiredFields.forEach(field => {
        it(`responds with 400 when required field '${field}' is omitted`, () => {
          const testFolderEdited = {...testFolder};
          delete testFolderEdited[field];
          return supertest(app)
            .post('/folders')
            .send(testFolderEdited)
            .expect(400, `'${field}' is required`);
        });
      });
    });

  });


  // GET requests (READ)
  describe('GET /folders', () => {
    context('Given there are folders in the database', () => {
      const testFolders = makeFoldersArray();
  
      beforeEach(() => {
        return db
          .into('folders')
          .insert(testFolders);
      });
  
      it('responds with 200 with an array of folders', () => {
        return supertest(app)
          .get('/folders')
          .expect(200, testFolders);
      });
  
    });
  
    context('Given no folders in the database', () => {
      it('responds with 200 with an empty array', () => {
        return supertest(app)
          .get('/folders')
          .expect(200, []);
      });
    });
  });

  // GET requests (READ)
  describe('GET /folders/:id', () => {
    context('Given there are folders in the database', () => {
      const testFolders = makeFoldersArray();
  
      beforeEach(() => {
        return db
          .into('folders')
          .insert(testFolders);
      });
  
      it('responds with 200 with the specified folder', () => {
        const id = randomFolder().id;
        const expectedFolder = testFolders.find(folder => folder.id === id);
        return supertest(app)
          .get(`/folders/${id}`)
          .expect(200, expectedFolder);
      });
  
    });
  
    context('Given no folders in the database', () => {
      it('responds with 404', () => {
        const id = randomFolder().id;
        return supertest(app)
          .get(`/folders/${id}`)
          .expect(404, 'Folder not found');
      });
    });
  });

  
  // DELETE requests (DELETE)
  describe('DELETE /folders/:id', () => {
    context('Given there are folders in the database', () => {
      const testFolders = makeFoldersArray();
  
      beforeEach(() => {
        return db
          .into('folders')
          .insert(testFolders);
      });
  
      it('responds with 204 and removes the folder', () => {
        const id = randomFolder().id;
        return supertest(app)
          .delete(`/folders/${id}`)
          .expect(204)
          .then(() => {
            return supertest(app)
              .get(`/folders/${id}`)
              .expect(404, 'Folder not found');
          });
      });
  
    });
  
    context('Given no folders in the database', () => {
      it('responds with 404', () => {
        const id = 2;
        return supertest(app)
          .delete(`/folders/${id}`)
          .expect(404, 'Folder not found');
      });
    });
  });
  
});