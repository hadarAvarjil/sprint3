const { useState } = React;
const { Link } = ReactRouterDOM;

export function SideBar({  onSelectTrash, onSelectAllNotes,onSelectArchive  }) {
    const [selectedLink, setSelectedLink] = useState("all")

    const handleLinkClick = (linkName) => {
        setSelectedLink(linkName)

    }

    return (
        <aside className="sidebar-folder">
            <nav>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    <li>
                    <Link 
                            to="/note" 
                            onClick={() => {
                                handleLinkClick('note');
                                onSelectAllNotes();
                            }}
                        >
                            <img src={`./assets/img/${selectedLink === 'all' ? 'notes.svg' : 'notes.svg'}`} className="icon" />
                            Notes
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/note/reminders" 
                            onClick={() => handleLinkClick('pinned')}
                        >
                            <img 
                                src={`./assets/img/${selectedLink === 'reminders' ? 'reminders.svg' : 'Reminder.svg'}`} 
                                className="icon" 
                            />
                            Reminders
                        </Link>
                    </li>
                    <li> 
                    <Link 
                            to="/note/archived" 
                            onClick={() => {
                                handleLinkClick('archived')
                                onSelectArchive()
                            } }
                    >
                            <img 
                                src={`./assets/img/${selectedLink === 'archived' ? 'archive.svg' : 'archive.svg'}`} 
                                alt="Archived Notes" 
                                className="icon" 
                            />
                            Archived
                    </Link>
                    </li>
                    <li>  
                    <Link 
                            to="/note/trash" 
                            onClick={() => {
                                handleLinkClick('trash');
                                onSelectTrash();
                            }}
                        >
                            <img src={`./assets/img/${selectedLink === 'trash' ? 'trash.svg' : 'trash.svg'}`} className="icon" />
                            Trash
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}
