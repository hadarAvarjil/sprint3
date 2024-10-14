import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'
let notes = []

_createNotes()

function _createNotes() {
    let storedNotes = utilService.loadFromStorage(NOTE_KEY)
    if (!storedNotes || !storedNotes.length) {

        notes = createSampleNotes()
        utilService.saveToStorage(NOTE_KEY, notes)
    } else {
        notes = storedNotes
    }
}

export const noteService = {
    query,
    get,
    post,
    put,
    remove,
    filterNotesBySearch,
    filterNotesByType,
    filterTrashedNotes,
    togglePin,
    saveNotesToStorage,
    loadNotesFromStorage,
}

function query() {
    return notes
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
        .then(note => note || notes.find(note => note.id === noteId))
}

function post(note) {
    const newNote = { ...note, id: utilService.makeId(), createdAt: Date.now() }
    notes.push(newNote)
    utilService.saveToStorage(NOTE_KEY, notes)
    return newNote
}

function put(updatedNote) {
    const index = notes.findIndex(note => note.id === updatedNote.id)
    if (index !== -1) {
        notes[index] = updatedNote
        utilService.saveToStorage(NOTE_KEY, notes)
        return updatedNote
    }
}

function remove(noteId) {
    const index = notes.findIndex(note => note.id === noteId);
    if (index === -1) {
        console.error(`Error: Cannot find note with id: ${noteId}`);
        return false;
    }
    notes.splice(index, 1);
    utilService.saveToStorage(NOTE_KEY, notes);
    return true;
}

function togglePin(noteId) {
    const note = get(noteId);
    if (!note) return null;

    const updatedNote = { ...note, isPinned: !note.isPinned };
    put(updatedNote);
    return updatedNote;
}

function filterNotesBySearch(searchTerm) {
    return notes.filter(note => {
        const txtMatches = note.info.txt && note.info.txt.toLowerCase().includes(searchTerm.toLowerCase());
        const titleMatches = note.info.title && note.info.title.toLowerCase().includes(searchTerm.toLowerCase());
        return txtMatches || titleMatches;
    });
}

function filterTrashedNotes() {
    return notes.filter(note => note.isTrashed);
}

function filterNotesByType(type) {
    return notes.filter(note => note.type === type);
}

function saveNotesToStorage() {
    utilService.saveToStorage(NOTE_KEY, notes);
}

function loadNotesFromStorage() {
    _createNotes()
}

function createSampleNotes() {
    const sampleNotes = []
    const img = {
        id: utilService.makeId(5),
        createdAt: Date.now(),
        type: 'NoteImg',
        isPinned: true,
        isTrashed: false,
        isArchived: false,
        info: {
            title: 'NoteImg',
            url: 'assets/img/flower.png',
        },
    }
    sampleNotes.push(img)

    const NoteAudio = {
        id: utilService.makeId(5),
        createdAt: Date.now(),
        type: 'NoteAudio',
        isPinned: true,
        isTrashed: false,
        isArchived: false,
        style: { backgroundColor: '#b4ffe0' },
        info: { title: 'NoteAudio', url: 'assets/audio/be-happy.mp3' },
    };
    sampleNotes.push(NoteAudio);

    const NoteToDo = {
        id: utilService.makeId(5),
        createdAt: Date.now(),
        isPinned: true,
        isTrashed: false,
        isArchived: false,
        type: 'NoteTodos',
        isPinned: false,
        info: {
            title: 'Get my stuff together',
            todos: [{ txt: 'Driving license', doneAt: null }, { txt: 'Coding power', doneAt: 187111111 }]
        },
        style: { backgroundColor: '#b4b7ff' }
    }
    sampleNotes.push(NoteToDo);

   
    const note = {
            id: utilService.makeId(5),
            createdAt: Date.now(),
            type: 'NoteTxt',
            isPinned: true,
            isTrashed: false,
            isArchived: false,
            style: { backgroundColor: '#f9b4ff' },
            info: { txt: 'Fullstack Me Baby!' },
    }
        sampleNotes.push(note)
    
    return sampleNotes
}


