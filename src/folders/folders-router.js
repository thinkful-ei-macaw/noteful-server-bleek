/* eslint-disable strict */
const express = require('express');
const xss = require('xss');
const uuid = require('uuid/v5');

const FoldersService = require('./folders-service');
const foldersRouter = express.Router();
foldersRouter.use(express.json());

const serializeFolder = (folder) => {
  return {
    id: folder.id,
    name: xss(folder.name)
  };
};

foldersRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db');
    FoldersService.getAllFolders(knexInstance)
      .then(folders => {
        res.json(folders.map(serializeFolder));
      })
      .catch(next);
  })
  .post((req, res, next) => {
    const { name } = req.body;
    const newFolder = { name };

    for (const [key, value] of Object.entries(newFolder))
      if (value === null)
        return res.status(400).json({
          error: { message: `No '${key}' in request body` }
        });
      
    const id = uuid.v4();
    const folder = { id, name };
      
    FoldersService.insertFolder(db, folder)
      .then(data => {
        return res.status(201).json(serializeFolder(data));
      })
      .catch(next);
  });

foldersRouter.get('/', (req, res, next) => {
  const db = req.app.get('db');
  
  FoldersService.getAllFolders(db)
    .then(folders => {
      return res.status(200).json(folders);
    })
    .catch(next);
});
  
foldersRouter.get('/:id', (req, res, next) => {
  const { id } = req.params;
  const db = req.app.get('db');
  
  FoldersService.getById(db, id)
    .then(folder => {
      if (folder) {
        return res.status(200).json(serializeFolder(folder));
      } else {
        return res.status(404).send('Folder not found');
      }
        
    })
    .catch(next);
});
  
foldersRouter.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  const db = req.app.get('db');
  
  FoldersService.getItemById(db, id)
    .then(note => {
      if (!note) {
        return res.status(404).send('Folder not found');
      }
  
      FoldersService.deleteById(db, id)
        .then(() => {
          return res.status(204).end();
        })
        .catch(next);
    });
      
});
   

module.exports = foldersRouter;