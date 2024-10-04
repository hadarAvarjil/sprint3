
import { NotePreview } from "../cmps/NotePreview.jsx"
const { useState, useEffect } = React

export function NoteList({ notes, onDelete, onEdit, onColorChange, onTogglePin }) {
    const [colorPickerVisible, setColorPickerVisible] = useState(null)
    const colors = ['#ffb4b4', '#b4ffe0', '#b4b7ff', '#f9b4ff', '#c0e794', '#91c6f0']

    const sortedNotes = [...notes].sort((a, b) => b.isPinned - a.isPinned)

    const handleColorChange = (noteId, color) => {
        onColorChange(noteId, color)
        setColorPickerVisible(null)
    }

    return (
        <div className="note-list">
            {sortedNotes.map(note => (
                <div key={note.id} className="note-card" style={{ backgroundColor: (note.style && note.style.backgroundColor) || '#fff' }}>
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
                                    <li key={index} style={{ textDecoration: todo.doneAt ? 'line-through' : 'none' }}>
                                        {todo.txt}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div className="buttons-container">
                        <button onClick={() => onTogglePin(note.id)} className="icon" title={note.isPinned ? "Unpin Note" : "Pin Note"}>
                            <img className="icon" src={note.isPinned ? "assets/img/unpin.svg" : "assets/img/pin.svg"} alt="Pin Icon" />
                        </button>

                        <button onClick={() => onEdit(note)}>
                        <img className="icon" src="assets/img/edit.svg" alt="Edit Icon"/> 
                        </button>

                        <button onClick={() => onDelete(note.id)}>
                            <img className="icon" src="assets/img/delete.svg" alt="Delete Icon" />
                        </button>

                        <button onClick={() => setColorPickerVisible(note.id)}>
                            <img className="icon" src="assets/img/palette.svg" alt="Palette Icon" />
                        </button>

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
    );
}