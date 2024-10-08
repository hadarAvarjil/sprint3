import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'

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
    },
    {
        id: 'n104',
        createdAt: Date.now(),
        type: 'NoteTodos',
        isPinned: false,
        info: {
            title: 'Things To Do',
            todos: [{ txt: 'Driving license', doneAt: null }, { txt: 'Coding power', doneAt: 187111111 }]
        },
        style: { backgroundColor: '#b4b7ff' }
    },
    {
        id: 'n105',
        createdAt: Date.now(),
        type: 'NoteAudio',
        isPinned: true,
        style: { backgroundColor: '#b4ffe0' },
        info: { title: 'NoteAudio', url: 'assets/audio/be-happy.mp3' }
    },
]

export const noteService = {
    query,
    get,
    post,
    put,
    remove,
    filterNotesBySearch,
    filterNotesByType,
    togglePin
}

function filterNotesBySearch(searchTerm) {
    return notes.filter(note => {
        const txtMatches = note.info.txt && note.info.txt.toLowerCase().includes(searchTerm.toLowerCase())
        const titleMatches = note.info.title && note.info.title.toLowerCase().includes(searchTerm.toLowerCase())
        return txtMatches || titleMatches
    })
}

function filterNotesByType(type) {
    return notes.filter(note => note.type === type)
}

function query() {
    return notes
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
        .then(note => {
            
            return note || notes.find(note => note.id === noteId)
        })
}

function post(note) {
    const newNote = { ...note, id: utilService.makeId(), createdAt: Date.now() }
    notes.push(newNote)
    console.log('newNote from service', newNote)
    storageService.post(NOTE_KEY, newNote)
    return newNote
}

function put(updatedNote) {
    const index = notes.findIndex(note => note.id === updatedNote.id)
    if (index !== -1) {
        notes[index] = updatedNote
        storageService.put(NOTE_KEY, updatedNote)
        return updatedNote
    }
}

function remove(noteId) {
    const index = notes.findIndex(note => note.id === noteId)
    if (index !== -1) {
        notes.splice(index, 1)
        storageService.remove(NOTE_KEY, noteId)
        return true
    }
}

function togglePin(noteId) {
    const note = get(noteId)
    if (!note) return null

    const updatedNote = { ...note, isPinned: !note.isPinned }
    put(updatedNote)
    return updatedNote
}
