
class NoteElement extends HTMLElement {
    constructor(data, notebookId) {
        super();
        this.innerHTML = `<div class="card" style="width: 18rem; margin-top: 10px; margin-left: 5px;">
        <div class="card-body">
          <h5 class="card-title">${data ? data.title : 'invalid note'}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${data ? new Date(data.date).toLocaleString() : 'invalid date'}</h6>
          <p class="card-text">${data ? data.message : 'invalid date'}</p>
          <a id="removeNoteElement" href="javascript:void(0);" class="card-link">Remove</a>
        </div>
      </div>`;

      this.note = data;
      this.notebookId = notebookId;
    }

    connectedCallback() { 
        let removeButton = this.querySelector('#removeNoteElement');
        removeButton.addEventListener('click', () => {
            fetch(`/notebooks/${this.notebookId}/notes/${this.note.id}`, {
                method: 'DELETE'
            }).then(() => {
                console.log('note deleted');
                this.dispatchEvent(new CustomEvent('note-deleted', {bubbles: true, detail: {notebookId: this.notebookId}}));
            }).catch((error) => console.error(error));
        }, false);
        console.dir(removeButton);
      }
}

window.customElements.define('note-element', NoteElement);