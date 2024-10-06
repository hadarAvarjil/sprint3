const { useState, useEffect } = React;

import { NoteList } from '../cmps/NoteList.jsx';
import { NoteForm } from '../cmps/NoteForm.jsx';
import { SearchBar } from '../cmps/NoteSearch.jsx';
import { noteService } from '../services/note.service.js';
import { SideBar } from '../cmps/SideBar.jsx';
import { utilService } from '../../../services/util.service.js';

export function NoteIndex() {
    const [notes, setNotes] = useState([]);
    const [noteToEdit, setNoteToEdit] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredNotes, setFilteredNotes] = useState(notes);
    const [showAddNoteForm, setShowAddNoteForm] = useState(false);
    const [noteType, setNoteType] = useState('NoteTxt');

    useEffect(() => {
        loadNotes();
    }, []);

    useEffect(() => {
        setFilteredNotes(
            notes.filter(note =>
                (note.info.txt && note.info.txt.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (note.info.title && note.info.title.toLowerCase().includes(searchTerm.toLowerCase()))
            )
        );
    }, [searchTerm, notes]);

    const loadNotes = () => {
        const fetchedNotes = noteService.query();
        setNotes(fetchedNotes);
    };

    const handleAddNote = (newNote) => {
        const addedNote = noteService.post(newNote);
        setNotes((prevNotes) => [...prevNotes, addedNote]);
        setNoteToEdit(null);
        setShowAddNoteForm(false);
    };

    const handleEditNote = (updatedNote) => {
        const updatedNotes = notes.map(note =>
            note.id === updatedNote.id ? updatedNote : note
        );

        setNotes(updatedNotes);
        setNoteToEdit(null);
        setShowAddNoteForm(false);
    };

    const handleDeleteNote = (noteId) => {
        noteService.remove(noteId);
        setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
    };

    const handleEditClick = (note) => {
        setNoteToEdit(note);
        setShowAddNoteForm(true);
    };

    const handleColorChange = (noteId, color) => {
        const updatedNotes = notes.map(note =>
            note.id === noteId ? { ...note, style: { ...note.style, backgroundColor: color } } : note
        );
        setNotes(updatedNotes);
        noteService.put(updatedNotes.find(note => note.id === noteId));
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    function handleTogglePin(noteId) {
        setNotes(prevNotes => 
            prevNotes.map(note => note.id === noteId ? { ...note, isPinned: !note.isPinned } : note)
        );
        noteService.togglePin(noteId);
    }

    const duplicateNote = (noteId) => {
        const noteToDuplicate = notes.find(note => note.id === noteId);
        if (noteToDuplicate) {
            const duplicatedNote = {
                ...noteToDuplicate,
                id: utilService.makeId(),
                isPinned: false,
            };
            setNotes(prevNotes => [...prevNotes, duplicatedNote]);
        }
    };

    const handleCancel = () => {
        setShowAddNoteForm(false);
        setNoteToEdit(null);
    };

    return (
        <div className="note-index-container">
            <SideBar />
            <div className="main-content">
                <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />

                <div className="add-note-container">
                    <div className="take-note-input" onClick={() => setShowAddNoteForm(true)}>
                        {!showAddNoteForm ? (
                            <span>Take a note...</span>
                        ) : null}
                    </div>
                    {showAddNoteForm && (
                        <NoteForm 
                            onSave={noteToEdit ? handleEditNote : handleAddNote}
                            existingNote={noteToEdit} 
                            noteType={noteType}
                            onTypeChange={setNoteType}
                            onCancel={handleCancel} 
                        />
                    )}
                </div>

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
    );
}
