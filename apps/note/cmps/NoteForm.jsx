const { useState, useEffect } = React


export function NoteForm({ onSave, existingNote }) {
    const [note, setNote] = useState(existingNote || { type: 'NoteTxt', info: { title: '', txt: '' } });

    useEffect(() => {
        setNote(existingNote || { type: 'NoteTxt', info: { title: '', txt: '' } });
    }, [existingNote]); // Update the form when existingNote changes

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNote((prev) => ({
            ...prev,
            info: { ...prev.info, [name]: value }
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!note.info.title.trim() || !note.info.txt.trim()) {
            alert('Please enter a title and some text for the note.');
            return;
        }
        onSave(note); // Save or update the note
        setNote({ type: 'NoteTxt', info: { title: '', txt: '' } }); // Reset the form
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                value={note.info.title}
                onChange={handleChange}
                placeholder="Note Title" // Title input
            />
            <input
                type="text"
                name="txt"
                value={note.info.txt}
                onChange={handleChange}
                placeholder="Note Content" // Content input
            />
            <button type="submit">{existingNote ? 'Update Note' : 'Add Note'}</button>
        </form>
    );
}