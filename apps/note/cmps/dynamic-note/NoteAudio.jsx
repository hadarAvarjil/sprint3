export function NoteAudio({ info }) {
    return (
        <div className="note-audio">
            <h4>{info.title}</h4>
            <audio controls>
                <source src={info.url} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
}