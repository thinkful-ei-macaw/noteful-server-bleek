/* eslint-disable strict */
function makeFoldersArray() {
  return [
    {
      id: '863686ff-69ba-4433-86f2-a5b5cf3fbbc0',
      name: 'Work',
    },
    {
      id: 'a9a40a28-a13e-4551-ad5b-425c4b03794e',
      name: 'Personal',
    },
    {
      id: '5fa36704-fc87-4c3e-9b40-cc2cd953b9d9',
      name: 'School',
    }
  ];
}
  
function makeNotesArray() {
  return [
    {
      id: 'ca4e7bd7-8bf3-4054-9180-17201035d80c',
      name: 'Work Note 1',
      content: 'This is a note',
      folder_id: '863686ff-69ba-4433-86f2-a5b5cf3fbbc0',
      modified: new Date().toISOString()
    },
    {
      id: 'b860e181-7b6a-46fb-9ab6-20d686b923ab',
      name: 'Work Note 2',
      content: 'This is a note',
      folder_id: '863686ff-69ba-4433-86f2-a5b5cf3fbbc0',
      modified: new Date().toISOString()
    },
    {
      id: 'a60fd4f9-99ce-4a32-ad41-81f74510be5d',
      name: 'Personal Note 1',
      content: 'This is a note',
      folder_id: 'a9a40a28-a13e-4551-ad5b-425c4b03794e',
      modified: new Date().toISOString()
    },
    {
      id: '1dbc3782-7475-47eb-aead-a02217c0b8cf',
      name: 'Personal Note 2',
      content: 'This is a note',
      folder_id: 'a9a40a28-a13e-4551-ad5b-425c4b03794e',
      modified: new Date().toISOString()
    },
    {
      id: 'c53587bf-968b-4434-b19a-f86e572f089a',
      name: 'School Note 1',
      content: 'This is a note',
      folder_id: '5fa36704-fc87-4c3e-9b40-cc2cd953b9d9',
      modified: new Date().toISOString()
    },
    {
      id: '64efe9aa-4095-4687-8498-766751f6b36d',
      name: 'School Note 2',
      content: 'This is a note',
      folder_id: '5fa36704-fc87-4c3e-9b40-cc2cd953b9d9',
      modified: new Date().toISOString()
    }
  ];
}
  
function randomFolder() {
  const index = Math.floor(Math.random() * makeFoldersArray().length);
  return makeFoldersArray()[index];
}
  
function randomNote() {
  const index = Math.floor(Math.random() * makeNotesArray().length);
  return makeNotesArray()[index];
}
  
module.exports = {
  makeFoldersArray,
  makeNotesArray,
  randomFolder,
  randomNote
};