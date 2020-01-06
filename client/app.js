const notebookChangedEventName = 'notebook-changed';
const noteDeletedEventName = 'note-deleted';

function getNotebookChangedEvent(notebookId) {
  return new CustomEvent(notebookChangedEventName, {detail: {notebookId: notebookId}});
}

function getNotebookTemplate(note) {
  return `<a href="#/notebooks/${note.id}" class="dropdown-item"><div class="col-xs-5"><span>${note.id}</span></div><div class="col-xs-1"><span class="badge badge-${note.notes > 0 ? 'success' : 'light'}">${note.notes ? note.notes : 0} Notes</span></div></a>`;
}

function clearCurrentNotebooks() {
  let containerElement = document.querySelector('.dropdown-toggle');
   containerElement.innerHTML = '';
}

function addNotebooksToNavigationMenu(notebookId) {
    let containerElement = document.querySelector('#notebooks');
    let newNotebookElement = document.createElement('div');
    newNotebookElement.innerHTML = getNotebookTemplate(notebookId);
    containerElement.appendChild(newNotebookElement);
}

function addNotes(notes) {
  if (notes) {

    let containerElement = document.querySelector('#notes');
    containerElement.innerHTML = '';
      
    notes.forEach((note) => {
      let newNoteElement = new NoteElement(note, getCurrentNotebookId());
      containerElement.appendChild(newNoteElement);
      console.dir(newNoteElement);
    });
  } else {
    console.warn('No notes found in this notebook.');
  }
}

async function getNotebooks() {
  const response = await fetch('/notebooks');
  return await response.json();
}

async function getNotes(notebookId) {
  console.log('get notes');
  const response = await fetch(`/notebooks/${notebookId}`);
  return await response.json();
}

function getCurrentNotebookId() {
  let hashSplitResult = location.hash.split('/');
  let currentNotebookId = hashSplitResult[hashSplitResult.length - 1]
  console.debug("Current notebook: %s", currentNotebookId);
  return currentNotebookId;
}

function setNotebookSelectionName(notebookId) {
  let dropdown = document.querySelector("#notebookSelection");
  dropdown.innerHTML = notebookId;
}

function initNavigation() {
  clearCurrentNotebooks();
  getNotebooks().then(notebooks => {
    notebooks.forEach(notebook => {
        addNotebooksToNavigationMenu(notebook);
    });
  });
}

async function createNote(notebookId, noteData) {
  console.log('create a new note');
  console.dir(JSON.stringify(noteData));
  const response = await fetch(`/notebooks/${notebookId}/notes`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: noteData});

  return await response.json();
}

function createNotebook() {
  const response = fetch(`/notebooks/`, {method: 'POST'}).then(() => {
    initNavigation();
  });
}

function getNoteDataFromModalForm(form) {
  let formData = new FormData(form);
  let object = {};
  formData.forEach((value, key) => {object[key] = value});
  return JSON.stringify(object);
}

function listenToNotesCreation() {
  console.log('listen to notes creation entry...');

  let form = document.querySelector('#noteForm');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let data = getNoteDataFromModalForm(event.target);

    createNote(getCurrentNotebookId(), data).then(() => {
      getNotes(getCurrentNotebookId()).then(data => {
        addNotes(data.notes);
      });
      
      // Unfortunately jQuery --> closing a modal dialog with vanillajs is hard
      $('#addNoteModal').modal('hide');
    });
  });
}

function renderNotes(notebookId) {
  if(notebookId) {
    console.log('Event: %s', notebookId);
    setNotebookSelectionName(notebookId);
    getNotes(notebookId).then(data => {
      console.dir(data);
      addNotes(data.notes);
    });
  }
}

function bootstrap() {
  console.debug('bootstrapping app...');
  initNavigation();
  listenToNotesCreation();
  let selectedNotebookId = getCurrentNotebookId();
  setNotebookSelectionName(selectedNotebookId);
  renderNotes(selectedNotebookId);
}

window.onhashchange = () => {
  let currentNotebookId = getCurrentNotebookId();
  console.debug('Current notebook: %s', currentNotebookId);
  let event = getNotebookChangedEvent(currentNotebookId);
  document.body.dispatchEvent(event);
}

document.body.addEventListener(notebookChangedEventName, (event) => {
  let notebookId = event.detail.notebookId;  
  renderNotes(notebookId);
});

document.body.addEventListener(noteDeletedEventName, () => {
  let notebookId = getCurrentNotebookId();
  renderNotes(notebookId);
});

bootstrap();