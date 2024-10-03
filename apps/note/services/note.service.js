import { utilService } from '../../../services/util.service.js';

const notes = [
    {
        id: 'n101',
        createdAt: Date.now(),
        type: 'NoteTxt',
        isPinned: true,
        style: { backgroundColor: '#f9b4ff' },
        info: { txt: 'Fullstack Me Baby!' }
    },
    {
        id: 'n102',
        createdAt: Date.now(),
        type: 'NoteImg',
        isPinned: false,
        info: { url: 'http://some-img/me', title: 'Bobi and Me' },
        style: { backgroundColor: '#ffb4b4' }
    },
    {
        id: 'n103',
        createdAt: Date.now(),
        type: 'NoteTodos',
        isPinned: false,
        info: {
            title: 'Get my stuff together',
            todos: [{ txt: 'Driving license', doneAt: null }, { txt: 'Coding power', doneAt: 187111111 }]
        }
    }
];

export const noteService = {
    query,
    get,
    post,
    put,
    remove,
    filterNotesBySearch,
    filterNotesByType
};

function filterNotesBySearch(searchTerm) {
    return notes.filter(note => {
        const txtMatches = note.info.txt && note.info.txt.toLowerCase().includes(searchTerm.toLowerCase());
        const titleMatches = note.info.title && note.info.title.toLowerCase().includes(searchTerm.toLowerCase());
        return txtMatches || titleMatches;
    });
}

function filterNotesByType(type) {
    return notes.filter(note => note.type === type);
}

function query() {
    return notes;
}

function get(noteId) {
    return notes.find(note => note.id === noteId);
}

function post(note) {
    const newNote = { ...note, id: _makeId(), createdAt: Date.now() };
    notes.push(newNote);
    return newNote;
}

function put(updatedNote) {
    const index = notes.findIndex(note => note.id === updatedNote.id);
    if (index !== -1) {
        notes[index] = updatedNote;
        return updatedNote;
    }
}

function remove(noteId) {
    const index = notes.findIndex(note => note.id === noteId);
    if (index !== -1) {
        notes.splice(index, 1);
        return true; 
    }
}

function _makeId() {
    return 'n' + Math.random().toString(36).substr(2, 9);
}
