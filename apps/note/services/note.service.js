// services/note.service.js

const notes = [
    {
        id: 'n101',
        createdAt: Date.now(),
        type: 'NoteTxt',
        isPinned: true,
        style: { backgroundColor: '#00d' },
        info: { txt: 'Fullstack Me Baby!' }
    },
    {
        id: 'n102',
        createdAt: Date.now(),
        type: 'NoteImg',
        isPinned: false,
        info: { url: 'http://some-img/me', title: 'Bobi and Me' },
        style: { backgroundColor: '#00d' }
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
]

export const noteService = {
    query,
    get,
    post,
    put,
    remove
}

function query() {
    return Promise.resolve(notes)
}

function get(noteId) {
    const note = notes.find(note => note.id === noteId)
    return Promise.resolve(note)
}

function post(note) {
    notes.push({ ...note, id: _makeId() })
    return Promise.resolve(note)
}

function put(updatedNote) {
    const index = notes.findIndex(note => note.id === updatedNote.id)
    if (index !== -1) {
        notes[index] = updatedNote
        return Promise.resolve(updatedNote)
    }

}

function remove(noteId) {
    const index = notes.findIndex(note => note.id === noteId)
    if (index !== -1) {
        notes.splice(index, 1)
        return Promise.resolve()
    }
}

