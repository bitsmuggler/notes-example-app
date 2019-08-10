const uuid = require('uuid').v1;

var express = require('express');
var router = express.Router();

let notebooks = [];

router.get('/', (req, res, next) => {
  res.send(notebooks.map(n => n.id));
});

router.post('/', (req, res, next) => {
  let notebookUuid = uuid();
  notebooks.push({id: notebookUuid, notes: []});
  res.send({id: notebookUuid});
});

router.post('/:bookuid/notes/', (req, res)  => {
  let message = req.body.note;
  let bookuid = req.params.bookuid;
  let noteUid = uuid();

  notebooks.find(notebook => {
      if(notebook.id === bookuid) {
        let note = {
          id: noteUid,
          message: message
        }

        notebook.notes.push(note);
      }
  });

  res.send({noteId: uuid()});
});

router.get('/:bookuid', (req, res) => {
    res.send(notebooks.find(n => n.id === req.params.bookuid));
});

router.get('/:bookuid/notes', (req, res) => {
    let notebook = notebooks.find(n => n.id === req.params.bookuid);
    if(notebook && notebook.notes) {
      res.send(notebook.notes);
    } else {
      res.sendStatus(404);
    }
});

router.delete('/:bookuid/notes/:noteuid', (req, res) => {
    let bookuid = req.params.bookuid;
    let noteuid = req.params.noteuid;
    let notebook = findNotebook(bookuid);
    
    if(!notebook) {
      res.sendStatus(404);
    }

    let filteredNotes = notebook.notes.filter(n => n.id !== noteuid);
    notebook.notes = filteredNotes;

    res.sendStatus(200);
});

function findNotebook(bookuid) {
    return notebooks.find(n => n.id === bookuid);
}

module.exports = router;
