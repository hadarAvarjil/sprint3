const { useState, useEffect } = React


import { NoteList } from "../cmps/NoteList.jsx"
import { NoteForm } from "../cmps/NoteForm.jsx"
import { noteService } from "../services/note.service.js"

export function NoteIndex() {
    const [notes, setNotes] = useState([]);
    const [noteToEdit, setNoteToEdit] = useState(null);

    useEffect(() => {
        loadNotes();
    }, []);

    const loadNotes = () => {
        const notes = noteService.query();
        setNotes(notes);
    };

    const handleAddNote = (newNote) => {
        noteService.post(newNote);
        loadNotes();
    };

    const handleEditNote = (updatedNote) => {
        noteService.put(updatedNote);
        loadNotes();
        setNoteToEdit(null); // Reset after updating
    };

    function handleDeleteNote(noteId) {
        noteService.remove(noteId); // מחיקת הפתק מהשירות
        setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId)); // עדכון המצב
    }

    const handleEditClick = (note) => {
        setNoteToEdit(note); // Set the note to edit in the form
    };

    return (
        <div className="note-index">
            <h1>Your Notes</h1>
            <NoteForm onSave={noteToEdit ? handleEditNote : handleAddNote} existingNote={noteToEdit} />
            <NoteList notes={notes} onEdit={handleEditClick} onDelete={handleDeleteNote} />
        </div>
    );
}