import React, { useEffect, useState } from 'react'
import { noteService } from '../../../services/note.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

export function Archive() {
    const [archivedNotes, setArchivedNotes] = useState([])

    useEffect(() => {
        noteService.query()
            .then(notes => {
                console.log(notes)
                setArchivedNotes(notes.filter(note => note.isArchived))
            })
            .catch(err => showErrorMsg('Failed to fetch archived notes'))
    }, [])

    function unarchiveNote(noteId) {
        noteService.get(noteId)
            .then(note => {
                note.isArchived = false
                return noteService.put(note)
            })
            .then(() => {
                setArchivedNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
                showSuccessMsg(`Note ${noteId} restored from archive successfully!`)
            })
            .catch(err => showErrorMsg('Failed to restore note from archive'))
    }

    return (
        <section className="note-index-container">
            <div className="note-list-container">
                {archivedNotes.length === 0 ? (
                    <div className="empty-message">No notes in the archive</div>
                ) : (
                    <ul className="note-list">
                        {archivedNotes.map(note => (
                            <li key={note.id} className="note-item">
                                <h3>{note.info.title}</h3>
                                <p>{note.info.txt}</p>
                                <div className="buttons-container">
                                    <button className="icon-button" onClick={() => unarchiveNote(note.id)}>
                                        <span className="material-icons icon">restore</span>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    )
}
