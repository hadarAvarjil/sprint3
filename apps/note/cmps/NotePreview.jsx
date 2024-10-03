
export function NotePreview({ note }) {
    switch (note.type) {
        case 'NoteTxt':
            return <NoteTxt info={note.info} />;
        default:
            return <div>Unknown note type</div>;
    }
}
