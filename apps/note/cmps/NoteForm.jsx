const { useState, useEffect } = React



export function NoteForm({ onSave, existingNote }) {
    const [note, setNote] = useState(existingNote || { type: 'NoteTxt', info: { title: '', txt: '' } });

    useEffect(() => {
        setNote(existingNote || { type: 'NoteTxt', info: { title: '', txt: '' } });
    }, [existingNote]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNote((prev) => ({
            ...prev,
            info: { ...prev.info, [name]: value }
        }));
    };

    const handleTodoChange = (index, value) => {
        const updatedTodos = note.info.todos.map((todo, i) => (
            i === index ? { ...todo, txt: value } : todo
        ));
        setNote((prev) => ({
            ...prev,
            info: { ...prev.info, todos: updatedTodos }
        }));
    };

    const handleAddTodo = () => {
        setNote((prev) => ({
            ...prev,
            info: {
                ...prev.info,
                todos: [...(prev.info.todos || []), { txt: '', doneAt: null }]
            }
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!note.info.title.trim() || (note.type === 'NoteTxt' && !note.info.txt.trim())) {
            alert('Please enter a title and some content.');
            return;
        }
        onSave(note); // Save or update the note
        setNote({ type: 'NoteTxt', info: { title: '', txt: '' } });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                value={note.info.title}
                onChange={handleChange}
                placeholder="Note Title" 
            />
            {note.type === 'NoteTxt' && (
                <input
                    type="text"
                    name="txt"
                    value={note.info.txt}
                    onChange={handleChange}
                    placeholder="Note Content"
                />
            )}
        {note.type === 'NoteTodos' && (
            <div>
                {note.info.todos && note.info.todos.length > 0 ? (
                    note.info.todos.map((todo, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                value={todo.txt}
                                onChange={(e) => handleTodoChange(index, e.target.value)}
                                placeholder={`Todo ${index + 1}`}
                            />
                        </div>
                    ))
                ) : null}
                <button type="button" onClick={handleAddTodo}>Add Todo</button>
            </div>
        )}
        <button type="submit">{existingNote ? 'Update Note' : 'Add Note'}</button>
        </form>
    )
}