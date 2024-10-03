import { NoteList } from "../NoteList.jsx"
import { noteService } from "../../../services/note.service.js"
import React, { useEffect, useState } from "react"

export function NoteIndex() {
    const [notes, setNotes] = useState([])

    useEffect(() => {
        noteService.query().then(setNotes)
    }, [])

    return (
        <div className="note-index">
            <h1>Your Notes</h1>
            <NoteList notes={notes} />
        </div>
    );
}
