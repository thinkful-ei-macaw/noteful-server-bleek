/* eslint-disable strict */
const express = require('express');
const xss = require('xss');
const uuid = require('uuid');

const notesRouter = express.Router();
const NotesService = require('./notes-service');

notesRouter.use(express.json());

const serializeNote = (note) => {
  return {
    id: note.id,
    name: xss(note.name),
    content: xss(note.content),
    folder_id: note.folder_id,
    modified: note.modified
  };
};

notesRouter.post('/', (req, res, next) => {
  const db = req.app.get('db');
  const requiredFields = ['name', 'content', 'folder_id'];
    
  for (let field of requiredFields) {
    if (!req.body[field]) {
      return res
        .status(400)
        .send(`'${field}' is required`);
    }
  }

  const id = uuid();
  const { name, content, folder_id } = req.body;
  const note = { id, name, content, folder_id };

  NotesService.addItem(db, note)
    .then(note => {
      return res.status(201).json(serializeNote(note));
    })
    .catch(next);
});

notesRouter.get('/', (req, res, next) => {
  const db = req.app.get('db');

  NotesService.getItems(db)
    .then(notes => {
      return res.status(200).json(notes.map(serializeNote(notes)));
    })
    .catch(next);
});

notesRouter.get('/:id', (req, res, next) => {
  const { id } = req.params;
  const db = req.app.get('db');

  NotesService.getItemById(db, id)
    .then(note => {
      if (note) {
        return res.status(200).json(serializeNote(note));
      } else {
        return res.status(404).send('Note does not exist');
      }
      
    })
    .catch(next);
});

notesRouter.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  const db = req.app.get('db');

  NotesService.getItemById(db, id)
    .then(note => {
      if (!note) {
        return res.status(404).send('Note does not exist');
      }

      NotesService.deleteItem(db, id)
        .then(() => {
          return res.status(204).end();
        })
        .catch(next);
    });

});

module.exports = notesRouter;