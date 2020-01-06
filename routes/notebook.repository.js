const uuid = require('uuid').v1;
const mongo = require('mongodb').MongoClient
const url = process.env.MONGODB_CONNECTIONSTRING;

console.log(`Connection-String: ${url}`);


class NotebookRepository {

    async getNotebooks() {
        const client = await this.getClient();
        let collection = this.getCollection(client);
        let result = await collection.find({});
        let resultAsArray = await result.toArray();
        return resultAsArray.map(n => {
            console.dir(n);
            return {id: n.id, notes: n.notes.length};
        });
    }

    async createNotebook() {
        const client = await this.getClient();
        let collection = this.getCollection(client);
        let notebookUuid = uuid();
        console.log(`CREATE NEW NOTEBOOK! ${notebookUuid}`);
      
        let notebook = { id: notebookUuid, notes: [] };

        await collection.insertOne(notebook);

        return notebookUuid;
    }

    async getNotebook(notebookUuid) {
        const client = await this.getClient();
        let collection = this.getCollection(client);
        return await collection.findOne({id: notebookUuid});
    }
    
    async addNote(notebookUuid, title, content) {
        const client = await this.getClient();
        let collection = this.getCollection(client);

        let notebook = await collection.findOne({id: notebookUuid});

         if (!client) {
            return null;
        }

        let noteUid = uuid();

        let note = {
            id: noteUid,
            title: title,
            date: Date.now(),
            message: content
        }
        notebook.notes.push(note);
        console.log(`Insert note in notebook ${notebookUuid}`);
        await collection.updateOne({id: notebookUuid}, { $set: {notes: notebook.notes}}, notebook);

        return noteUid;
    }

    async getClient() {
        return await mongo.connect(url).catch((err) => console.log(err));
    }

    async getNotes(notebookUuid) {
        const client = await this.getClient();
        let collection = this.getCollection(client);

        let notebook = await collection.findOne({id: notebookUuid});
        return notebook.notes;
    }

    async deleteNote(notebookUuid, noteUid) {
        const client = await this.getClient();
        let collection = this.getCollection(client);
        let notebook = await collection.findOne({id: notebookUuid});

        let filteredNotes = notebook.notes.filter(n => n.id !== noteUid);
        await collection.updateOne({id: notebookUuid}, { $set: {notes: filteredNotes}}, notebook);
        return true;
    }

    getCollection(client) {
        const db = client.db('notes-example-app');
        let collection = db.collection('notebooks');
        return collection;
    }
}


module.exports = NotebookRepository; 