const { useState, useEffect,useRef } = React
import { NoteRecorder } from './dynamic-note/NoteRecorder.jsx'

export function NoteForm({ onSave, existingNote,onCancel }) {
    const [note, setNote] = useState(existingNote || { type: 'NoteTxt', info: { title: '', txt: '', url: '', todos: [] } })
    const [audioUrl, setAudioUrl] = useState('')
    const textAreaRef = useRef(null)

    useEffect(() => {
        if (existingNote) {
            console.log('useEffect של existingNote הופעל');
            setNote(existingNote);
        }
    }, [existingNote]);

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
        setNote((prev) => {
            const updatedTodos = prev.info.todos.map((todo, i) => {
                if (i === index) {
                    return value !== null ? { ...todo, txt: value } : null
                }
                return todo;
            }).filter(todo => todo !== null)
    
            return {
                ...prev,
                info: { ...prev.info, todos: updatedTodos }
            }
        })
    }

    const handleFileUpload = (event) => {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const url = reader.result
            
                setNote(prev => ({
                    ...prev,
                    info: { ...prev.info, url, title: file.name }
                }))
            }
            reader.readAsDataURL(file);
        }
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
            return
        }
        onSave(note)
        setNote({ type: 'NoteTxt', info: { title: '', txt: '', url: '', todos: [] } })
        setAudioUrl('')
    }

    const handleCancelClick = () => {
        onCancel()
    }

    const handleDeleteTodo = (index) => {
        const updatedTodos = note.info.todos.filter((_, i) => i !== index)
        setNote((prev) => ({
            ...prev,
            info: { ...prev.info, todos: updatedTodos }
        }))
    }

    const handleAudioSave = (audioUrl) => {
        setNote((prev) => ({
            ...prev,
            info: { ...prev.info, url: audioUrl }
        }))
    }

    return (
        <form 
            onSubmit={handleSubmit} className={`note-form ${existingNote ? 'edit-mode' : ''}`}
       
        >
            <input
                type="text"
                name="title"
                value={note.info.title}
                onChange={handleChange}
                placeholder="Title"
                className="note-input title"
            />
            <select 
                name="type" 
                value={note.type} 
                onChange={(e) => setNote({ ...note, type: e.target.value })}
            >
                <option>Choose note</option>
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
                <div>
                    <input
                        type="file"
                        accept="image/*" 
                        onChange={handleFileUpload}
                    />
                    {note.info.url && <img src={note.info.url} alt={note.info.title} style={{ maxWidth: '100%', marginTop: '10px' }} />}
                </div>
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
                        note.info.todos.map((todo) => (
                            <div key={todo.id}  className="todo-item">
                                <input
                                    type="text"
                                    value={todo.txt}
                                    onChange={(e) => handleTodoChange(todo.id, e.target.value)}
                                    placeholder={`Todo ${todo.id}`}
                                    className="note-input"
                                />
                                <button onClick={() => handleDeleteTodo(todo.id)} className="delete-todo-button">
                                    &#10005; 
                                </button>
                            </div>
                        ))
                    ) : null}
                    <button type="button" onClick={handleAddTodo} className="add-todo-button">Add Todo</button>
                </div>
            )}
            
            <button type="submit">{existingNote ? 'Update Note' : 'Add Note'}</button>
            <button type="button" onClick={handleCancelClick} className="cancel-button">Cancel Note</button>
        </form>
    )
    
}