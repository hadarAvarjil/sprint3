const { useState, useEffect } = React;

import { NoteList } from '../cmps/NoteList.jsx'
import { NoteForm } from '../cmps/NoteForm.jsx'
import { SearchBar } from '../cmps/NoteSearch.jsx'
import { noteService } from '../services/note.service.js'
import { SideBar } from '../cmps/SideBar.jsx'
import { utilService } from '../../../services/util.service.js';

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [noteToEdit, setNoteToEdit] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredNotes, setFilteredNotes] = useState(notes)

    useEffect(() => {
        loadNotes()
    }, [])


    useEffect(() => {
        const fetchedNotes = noteService.query()
        setNotes(fetchedNotes)
    }, [])


    useEffect(() => {
        setFilteredNotes(
            notes.filter(note =>
                (note.info.txt && note.info.txt.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (note.info.title && note.info.title.toLowerCase().includes(searchTerm.toLowerCase()))
            )
        )
    }, [searchTerm, notes])


    const loadNotes = () => {
        const notes = noteService.query()
        setNotes(notes)
    }

  
    const handleAddNote = (newNote) => {
        const addedNote = noteService.post(newNote)
        setNotes((prevNotes) => [...prevNotes, addedNote])
        setNoteToEdit(null)
    }


    const handleEditNote = (updatedNote) => {
        if (updatedNote.type === 'NoteTodos') {
            updatedNote.info.todos = updatedNote.info.todos.map(todo => ({
                ...todo,
                doneAt: todo.doneAt ? new Date(todo.doneAt) : null,
            }))
        }

        noteService.put(updatedNote)
        loadNotes()
        setNoteToEdit(null)
    }

    const handleDeleteNote = (noteId) => {
        noteService.remove(noteId)
        setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
    }


    const handleEditClick = (note) => {
        setNoteToEdit(note)
    }


    const handleColorChange = (noteId, color) => {
        const updatedNotes = notes.map(note =>
            note.id === noteId ? { ...note, style: { ...note.style, backgroundColor: color } } : note
        )
        setNotes(updatedNotes)
        noteService.put(updatedNotes.find(note => note.id === noteId))
    }

 
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
    }


    function handleTogglePin(noteId) {
        setNotes(prevNotes => 
            prevNotes.map(note => note.id === noteId ? { ...note, isPinned: !note.isPinned } : note)
        )
        noteService.togglePin(noteId)
    }

    const duplicateNote = (noteId) => {
        const noteToDuplicate = notes.find(note => note.id === noteId);
        if (noteToDuplicate) {
            const duplicatedNote = {
                ...noteToDuplicate,
                id: utilService.makeId(),
                isPinned: false, 
            };
            console.log('dup',duplicatedNote)
            setNotes(prevNotes => [...prevNotes, duplicatedNote]);
        }
    }

 

    return (
        <div className="note-index-container">
            <SideBar /> 
            <div className="main-content">
                <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
                <NoteForm onSave={noteToEdit ? handleEditNote : handleAddNote} existingNote={noteToEdit} />
                <NoteList 
                    notes={filteredNotes} 
                    onEdit={handleEditClick} 
                    onDelete={handleDeleteNote}  
                    onColorChange={handleColorChange} 
                    onTogglePin={handleTogglePin}
                    onDuplicate={duplicateNote}
                />
            </div>
        </div>
    )
}
