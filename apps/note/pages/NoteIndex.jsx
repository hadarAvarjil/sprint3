const { useState, useEffect } = React
const { NavLink, Outlet, useSearchParams } = ReactRouterDOM

import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"

export function NoteIndex() {
    const [notes, setNotes] = useState([])

    useEffect(() => {
        noteService.query().then(setNotes).catch(err => console.error(err))
    }, []);

    return (
        <div className="note-index">
            <h1>Your Notes</h1>
            <NoteList notes={notes} />
        </div>
    );
}
