import { NoteTxt } from "./dynamic-note/NoteTxt.jsx"
import { NoteAudio } from "./dynamic-note/NoteAudio.jsx"

const NOTE_TYPE_COMPONENTS = {
    txt: NoteTxt,
    NoteAudio: NoteAudio,
};

export function NotePreview({ note }) {
    const NoteComponent = NOTE_TYPE_COMPONENTS[note.type] || null;
    const { title = 'Untitled', createdAt = '', type = '' } = note.info || {};

    return (
        <article className="note-preview">
            <h3>Title: {title}</h3>
            <div className="audio-content">
                {NoteComponent ? <NoteComponent info={note.info} /> : <p>Unsupported note type</p>}
            </div>
        </article>
    );
}