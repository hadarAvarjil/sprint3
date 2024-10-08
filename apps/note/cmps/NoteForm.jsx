const { useState, useEffect,useRef } = React
import { NoteRecorder } from './dynamic-note/NoteRecorder.jsx'; 

export function NoteForm({ onSave, existingNote,onCancel }) {
    const [note, setNote] = useState(existingNote || { type: 'NoteTxt', info: { title: '', txt: '', url: '', todos: [] } })
    const [audioUrl, setAudioUrl] = useState('')
    const textAreaRef = useRef(null)

    useEffect(() => {
        setNote(existingNote || { type: 'NoteTxt', info: { title: '', txt: '', url: '', todos: [] } })
    }, [existingNote])

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto'
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
        }
    }, [note.info.txt])

    const handleChange = (event) => {
        const { name, value } = event.target
        setNote((prev) => ({
            ...prev,
            info: { ...prev.info, [name]: value }
        }))
    }

    const handleTodoChange = (index, value) => {
        const updatedTodos = note.info.todos.map((todo, i) => (
            i === index ? { ...todo, txt: value } : todo
        ))
        setNote((prev) => ({
            ...prev,
            info: { ...prev.info, todos: updatedTodos }
        }))
    }

    const handleAddTodo = () => {
        setNote((prev) => ({
            ...prev,
            info: {
                ...prev.info,
                todos: [...(prev.info.todos || []), { txt: '', doneAt: null }]
            }
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!note.info.title.trim() || (note.type === 'NoteTxt' && !note.info.txt.trim())) {
            alert('Please enter a title and some content.')
            return;
        }
        onSave(note)
        setNote({ type: 'NoteTxt', info: { title: '', txt: '', url: '', todos: [] } })
        setAudioUrl('')
    }

    const handleCancelClick = () => {
        onCancel()
    }

    const handleAudioSave = (audioUrl) => {
        setNote((prev) => ({
            ...prev,
            info: { ...prev.info, url: audioUrl }
        }));
    };
    return (
        <form onSubmit={handleSubmit} className="note-form">
            <input
                type="text"
                name="title"
                value={note.info.title}
                onChange={handleChange}
                placeholder="Title"
                className="note-input title"
            />
            <select name="type" value={note.type} onChange={(e) => setNote({ ...note, type: e.target.value })}>
                <option value="NoteImg">Image Note</option>
                <option value="NoteTodos">Todo List Note</option>
                <option value="NoteAudio">Audio Note</option>
            </select>
            
            {note.type === 'NoteTxt' && (
                <textarea
                    name="txt"
                    value={note.info.txt}
                    onChange={handleChange}
                    placeholder="New Note..."
                    className="note-input content"
                    rows="1" 
                    ref={textAreaRef} 
                />
            )}
            
            {note.type === 'NoteImg' && (
                <input
                    type="text"
                    name="url"
                    value={note.info.url}
                    onChange={handleChange}
                    placeholder="Image URL"
                    className="note-input"
                />
            )}
            
            {note.type === 'NoteVideo' && (
                <input
                    type="text"
                    name="url"
                    value={note.info.url}
                    onChange={handleChange}
                    placeholder="Video URL"
                    className="note-input"
                />
            )}
            
            {note.type === 'NoteAudio' && (
                <div>
                    <NoteRecorder onSave={handleAudioSave} />
                    {audioUrl && <p>Audio recorded successfully! <audio src={audioUrl} controls /></p>}
                </div>
            )}
            
            {note.type === 'NoteTodos' && (
                <div>
                    {note.info.todos && note.info.todos.length > 0 ? (
                        note.info.todos.map((todo, index) => (
                            <div key={index} className="todo-item">
                                <input
                                    type="text"
                                    value={todo.txt}
                                    onChange={(e) => handleTodoChange(index, e.target.value)}
                                    placeholder={`Todo ${index + 1}`}
                                    className="note-input"
                                />
                            </div>
                        ))
                    ) : null}
                    <button type="button" onClick={handleAddTodo} className="add-todo-button">Add Todo</button>
                </div>
            )}
            
            <button type="submit">{existingNote ? 'Update Note' : 'Add Note'}</button>
            <button type="button" onClick={handleCancelClick} className="cancel-button">Cancel</button>
        </form>
    )
}