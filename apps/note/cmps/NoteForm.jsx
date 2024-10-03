const { useState, useEffect } = React

export function NoteForm({ onSave, existingNote }) {
    const [note, setNote] = useState(existingNote || { type: 'NoteTxt', info: { title: '', txt: '' }, style: { backgroundColor: '#ffffff' } })
    const [showColorPicker, setShowColorPicker] = useState(false)
    const colors = ['#ffb4b4', '#b4ffe0', '#b4b7ff', '#f9b4ff', '#c0e794', '#91c6f0']

    useEffect(() => {
        setNote(existingNote || { type: 'NoteTxt', info: { title: '', txt: '' }, style: { backgroundColor: '#ffffff' } })
    }, [existingNote]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNote((prev) => ({
            ...prev,
            info: { ...prev.info, [name]: value }
        }));
    };

    const handleColorChange = (color) => {
        setNote((prev) => ({
            ...prev,
            style: { ...prev.style, backgroundColor: color }
        }));
        setShowColorPicker(false)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!note.info.title.trim() || !note.info.txt.trim()) {
            alert('Please enter a title and some text for the note.')
            return
        }
        onSave(note);
        setNote({ type: 'NoteTxt', info: { title: '', txt: '' }, style: { backgroundColor: '#ffffff' } })
    }

    return (
        <form onSubmit={handleSubmit} style={{ backgroundColor: note.style.backgroundColor }}>
            <input
                type="text"
                name="title"
                value={note.info.title}
                onChange={handleChange}
                placeholder="Note Title"
            />
            <input
                type="text"
                name="txt"
                value={note.info.txt}
                onChange={handleChange}
                placeholder="Note Content"
            />
            <button type="button" onClick={() => setShowColorPicker(!showColorPicker)}>
                🎨 Select Color
            </button>
            {showColorPicker && (
                <div style={{ display: 'flex', gap: '10px', margin: '10px 0' }}>
                    {colors.map(color => (
                        <div
                            key={color}
                            onClick={() => handleColorChange(color)}
                            style={{
                                backgroundColor: color,
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                border: note.style.backgroundColor === color ? '2px solid black' : 'none'
                            }}
                        />
                    ))}
                </div>
            )}
            <button type="submit">{existingNote ? 'Update Note' : 'Add Note'}</button>
        </form>
    );
}