import { NotePreview } from "../cmps/NotePreview.jsx"
import { NoteAudio } from './path/to/NoteAudio'
const { useState } = React

export function NoteList({ notes, onDelete, onEdit, onColorChange, onTogglePin, onDuplicate, onArchive, onRestore,onDrop,onSetReminder }) {
    const [colorPickerVisible, setColorPickerVisible] = useState(null)
    const colors = ['#ffb4b4', '#b4ffe0', '#b4b7ff', '#f9b4ff', '#c0e794', '#91c6f0']

    const sortedNotes = [...notes].sort((a, b) => b.isPinned - a.isPinned)

    const handleColorChange = (noteId, color) => {
        onColorChange(noteId, color)
        setColorPickerVisible(null)
    }

    const handleDragStart = (event, noteId) => {
        event.dataTransfer.setData("text/plain", noteId)
    }

    const handleDrop = (event, targetNoteId) => {
        event.preventDefault()
        const noteId = event.dataTransfer.getData("text/plain")
        if (noteId && noteId !== targetNoteId) {
            onDrop(noteId, targetNoteId)
        }
    }

    const handleDragOver = (event) => {
        event.preventDefault()
    }

    return (
        <div className="note-list">
            {sortedNotes.map(note => (
                <div 
                    key={note.id} 
                    className="note-card" 
                    style={{ backgroundColor: (note.style && note.style.backgroundColor) || '#fff' }}
                    draggable
                    onDragStart={(event) => handleDragStart(event, note.id)}
                    onDrop={(event) => handleDrop(event, note.id)}
                    onDragOver={handleDragOver}
                >
                    {note.type === 'NoteTxt' && (
                        <div>
                            <h3>{note.info.title ? `Title: ${note.info.title}` : ''}</h3>
                            <p>{note.info.txt}</p>
                        </div>
                    )}
                    {note.type === 'NoteImg' && (
                        <div>
                            <h3>{note.info.title ? `Title: ${note.info.title}` : 'Untitled Note'}</h3>
                            <img src={note.info.url} alt={note.info.title} style={{ maxWidth: '100%', height: 'auto' }} />
                        </div>
                    )}
                    {note.type === 'NoteTodos' && (
                        <div>
                            <h3>{note.info.title ? `Title: ${note.info.title}` : 'Untitled Todo'}</h3>
                            <ul>
                                {note.info.todos.map((todo, index) => (
                                    <li key={todo.id} style={{ textDecoration: todo.doneAt ? 'line-through' : 'none' }}>
                                        {todo.txt}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {note.type === 'NoteAudio' && (
                        <NoteAudio info={note.info} />
                    )}

                    <div className="buttons-container">
                        <button onClick={() => onTogglePin(note.id)} className="icon" title={note.isPinned ? "Unpin Note" : "Pin Note"}>
                            <img className="icon" src={note.isPinned ? "assets/img/unpin.svg" : "assets/img/pin.svg"} alt="Pin Icon" />
                        </button>

                        <button onClick={() => onEdit(note)}>
                            <img className="icon" src="assets/img/edit.svg" alt="Edit Icon" />
                        </button>

                        <button onClick={() => onDelete(note.id)}>
                            <img className="icon" src="assets/img/delete.svg" alt="Delete Icon" />
                        </button>

                        <button onClick={() => setColorPickerVisible(note.id)}>
                            <img className="icon" src="assets/img/palette.svg" alt="Palette Icon" />
                        </button>
                        <button onClick={() => onSetReminder(note.id)}>
                            <img className="icon" src="assets/img/reminder.svg" alt="reminders Icon" />
                        </button>
                        <button onClick={() => onDuplicate(note.id)}>
                            <img className="icon" src="assets/img/duplicate.svg" alt="Duplicate Icon" />
                        </button>

                        <button onClick={() => onArchive(note.id)}>
                            <img className="icon" src="assets/img/archive.svg" alt="Archive Icon" />
                        </button>
                        {note.isTrashed && (
                            <button onClick={() => onRestore(note.id)}>
                                <img src="assets/img/X.svg" alt="Restore" />
                            </button>
                        )}
                        

                        {colorPickerVisible === note.id && (
                            <div style={{ display: 'flex', gap: '10px', margin: '10px 0' }}>
                                {colors.map(color => (
                                    <div
                                        key={color}
                                        onClick={() => handleColorChange(note.id, color)}
                                        style={{
                                            backgroundColor: color,
                                            width: '30px',
                                            height: '30px',
                                            borderRadius: '50%',
                                            cursor: 'pointer',
                                            border: (note.style && note.style.backgroundColor === color) ? '2px solid black' : 'none'
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}
