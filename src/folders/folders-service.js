/* eslint-disable strict */

const FoldersService = {
  getAllFolders(knex) {
    return knex
      .select('*')
      .from('noteful_folders');
  },
  insertFolder(knex, newFolder) {
    return knex
      .insert(newFolder)
      .into('noteful_folders')
      .returning('*')
      .then( rows => {
        return rows[0];
      });
  },
  getById(knex, id) {
    return knex
      .select('*')
      .from('noteful_folders')
      .where('id', id)
      .first();
  },
  deleteById(knex, id) {
    return knex
      .from('noteful_folders')
      .where('id', id)
      .delete();
  },
  updateById(knex, id, newFolderData) {
    return knex
      .from('noteful_folders')
      .where('id', id)
      .update(newFolderData);
  }
};

module.exports = FoldersService;