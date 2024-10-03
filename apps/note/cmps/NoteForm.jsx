const { useState, useEffect } = React


export function NoteForm({ onSave, existingNote }) {
    const [note, setNote] = useState(existingNote || { type: 'NoteTxt', info: { txt: '' } });

    useEffect(() => {
        setNote(existingNote || { type: 'NoteTxt', info: { txt: '' } });
    }, [existingNote]); // עדכון הטופס כאשר הערך של existingNote משתנה

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNote((prev) => ({
            ...prev,
            info: { ...prev.info, [name]: value }
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!note.info.txt.trim()) {
            alert('Please enter some text for the note.');
            return;
        }
        onSave(note); // שמירה או עדכון של הפתק
        setNote({ type: 'NoteTxt', info: { txt: '' } }); // איפוס הטופס
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="txt"
                value={note.info.txt}
                onChange={handleChange}
                placeholder="Note content"
            />
            <button type="submit">{existingNote ? 'Update Note' : 'Add Note'}</button>
        </form>
    );
}