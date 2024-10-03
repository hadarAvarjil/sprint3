const { useState, useEffect } = React


import { NoteList } from "../cmps/NoteList.jsx"
import { NoteForm } from "../cmps/NoteForm.jsx"
import { noteService } from "../services/note.service.js"

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [noteToEdit, setNoteToEdit] = useState(null)

    useEffect(() => {
        loadNotes()
    }, [])

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
                doneAt: todo.doneAt ? new Date(todo.doneAt) : null
            }));
        }
    
        noteService.put(updatedNote);
        loadNotes();
        setNoteToEdit(null);
    };

    function handleDeleteNote(noteId) {
        noteService.remove(noteId);
        setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
    }

    const handleEditClick = (note) => {
        setNoteToEdit(note)
    }

    const handleColorChange = (noteId, color) => {
        const updatedNotes = notes.map(note =>
            note.id === noteId ? { ...note, style: { ...note.style, backgroundColor: color } } : note
        );
        setNotes(updatedNotes)
        noteService.put(updatedNotes.find(note => note.id === noteId))
    };

    return (
        <div className="note-index">
            <NoteForm onSave={noteToEdit ? handleEditNote : handleAddNote} existingNote={noteToEdit} />
            <NoteList notes={notes} onEdit={handleEditClick} onDelete={handleDeleteNote}  onColorChange={handleColorChange} />
        </div>
    );

}