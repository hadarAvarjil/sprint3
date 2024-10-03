
import { NotePreview } from "../cmps/NotePreview.jsx";

export function NoteList({ notes, onDelete, onEdit }) {
    return (
        <div className="note-list">
            {notes.map(note => (
                <div key={note.id} className="note-card">
                    {note.type === 'NoteTxt' && (
                        <div>
                            <h3>{note.info.title || ''}</h3> 
                            <p>{note.info.txt}</p>
                        </div>
                    )}
                    {note.type === 'NoteImg' && (
                        <div>
                            <h3>{note.info.title || 'Untitled Image'}</h3>
                            <img src={note.info.url} alt={note.info.title} />
                        </div>
                    )}
                    {note.type === 'NoteTodos' && (
                        <div>
                            <h3>{note.info.title || 'Untitled Todos'}</h3>
                            <ul>
                                {note.info.todos.map((todo, index) => (
                                    <li key={index} style={{ textDecoration: todo.doneAt ? 'line-through' : 'none' }}>
                                        {todo.txt}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <button onClick={() => onEdit(note)}>Edit</button>
                    <button onClick={() => onDelete(note.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}