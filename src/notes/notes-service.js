/* eslint-disable strict */

const NotesService =  {
  getAllNotes(knex) {
    return knex.select('*')
      .from('noteful_Notes');
  },
  addNote(knex, newNote) {
    return knex.insert(newNote)
      .into('noteful_notes')
      .returning('*')
      .then((rows) => {
        return rows[0];
      });
  },
  getNoteId(knex, id) {
    return knex.from('noteful_notes')
      .select('*')
      .where({ id })
      .first();
  },
  updateNote(knex, id, data) {
    return knex.from('noteful_notes')
      .where({ id })
      .update(data);
  },
  deleteNote(knex, id) {
    return knex.from('noteful_notes')
      .where({ id })
      .delete();
  }
};
  
module.exports = NotesService;