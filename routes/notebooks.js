const uuid = require('uuid').v1;

let express = require('express');
let router = express.Router();

let NotebookRepository = require('./notebook.repository');

let notebooks = [];

router.get('/', (req, res, next) => {
  let repository = new NotebookRepository();

  repository.getNotebooks().then(notebooks => res.send(notebooks))
                           .catch(err => console.log(err));
});

router.post('/', (req, res, next) => {
  let repository = new NotebookRepository();
  repository.createNotebook().then(id => {
                               res.send({ id: id });
                              })
                             .catch(err => { 
                                console.log(err); 
                                res.send(500); 
                              });
});

router.post('/:bookuid/notes/', (req, res) => {
  let repository = new NotebookRepository();
  repository.addNote(req.params.bookuid, req.body.note)
                         .then(noteId => res.send({ noteId: noteId }))
                         .catch(res.status(500));
});

router.get('/:bookuid', (req, res) => {
  let repository = new NotebookRepository();
  repository.getNotebook(req.params.bookuid).then(result => res.send(result))
                                            .catch(res.status(404));
});

router.get('/:bookuid/notes', (req, res) => {
  let repository = new NotebookRepository();
  repository.getNotes(req.params.bookuid).then(notes => res.send(notes))
                                         .catch(res.status(404));
});

router.delete('/:bookuid/notes/:noteuid', (req, res) => {
  let bookuid = req.params.bookuid;
  let noteuid = req.params.noteuid;

  let repository = new NotebookRepository();

  repository.deleteNote(bookuid, noteuid).then(result => res.sendStatus(200))
                                         .catch(() => res.sendStatus(500));
});

function findNotebook(bookuid) {
  return notebooks.find(n => n.id === bookuid);
}

module.exports = router;
