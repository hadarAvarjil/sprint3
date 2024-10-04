const { useState, useEffect } = React





export function NoteForm({ onSave, existingNote }) {
    const [note, setNote] = useState(existingNote || { type: 'NoteTxt', info: { title: '', txt: '', url: '', todos: [] } })

    useEffect(() => {
        setNote(existingNote || { type: 'NoteTxt', info: { title: '', txt: '', url: '', todos: [] } })
    }, [existingNote])

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
        ));
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
    }

    return (
        <form onSubmit={handleSubmit} className="note-form">
        <input
            type="text"
            name="title"
            value={note.info.title}
            onChange={handleChange}
            placeholder="Note Title" 
        />
        <select name="type" value={note.type} onChange={(e) => setNote({ ...note, type: e.target.value })}>
            <option value="NoteTxt">Text Note</option>
            <option value="NoteImg">Image Note</option>
            <option value="NoteVideo">Video Note</option>
            <option value="NoteTodos">Todo List Note</option>
        </select>
        {note.type === 'NoteTxt' && (
            <input
                type="text"
                name="txt"
                value={note.info.txt}
                onChange={handleChange}
                placeholder="Note Content"
            />
        )}
        {note.type === 'NoteImg' && (
            <input
                type="text"
                name="url"
                value={note.info.url}
                onChange={handleChange}
                placeholder="Image URL"
            />
        )}
        {note.type === 'NoteVideo' && (
            <input
                type="text"
                name="url"
                value={note.info.url}
                onChange={handleChange}
                placeholder="Video URL"
            />
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
                            />
                        </div>
                    ))
                ) : null}
                <button type="button" onClick={handleAddTodo} className="add-todo-button">Add Todo</button>
            </div>
        )}
        <button type="submit">{existingNote ? 'Update Note' : 'Add Note'}</button>
    </form>

    )
}