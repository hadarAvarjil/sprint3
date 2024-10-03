
export function NoteTxt({ info }) {
    return (
        <div className="note-txt" style={{ backgroundColor: info.style.backgroundColor }}>
            <p>{info.txt}</p>
        </div>
    );
}
