const { useState } = React;
const { Link } = ReactRouterDOM;

export function SideBar() {
    const [selectedLink, setSelectedLink] = useState("all")

    const handleLinkClick = (linkName) => {
        setSelectedLink(linkName)
    }

    return (
        <aside className="sidebar">
            <nav>
                <ul style={{ listStyleType: 'none', padding: 0 }}> {}
                    <li>
                        <Link 
                            to="/note/all" 
                            onClick={() => handleLinkClick('all')}
                        >
                            <img 
                                src={`assets/img/${selectedLink === 'all' ? 'notes.svg' : 'notes.svg'}`} 
                                className="icon" 
                            />
                            Notes
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/note/pinned" 
                            onClick={() => handleLinkClick('pinned')}
                        >
                            <img 
                                src={`assets/img/${selectedLink === 'pinned' ? 'pinned_clicked.svg' : 'reminder.svg'}`} 
                                className="icon" 
                            />
                            Reminders
                        </Link>
                        </li>
                        <li> 
                        <Link 
                            to="/note/archived" 
                            onClick={() => handleLinkClick('archived')}
                        >
                            <img 
                                src={`assets/img/${selectedLink === 'archived' ? 'archive_clicked.svg' : 'archive.svg'}`} 
                                alt="Archived Notes" 
                                className="icon" 
                            />
                            Archived
                        </Link>
                        </li>
                        <li>  
                        <Link 
                            to="/note/trash" 
                            onClick={() => handleLinkClick('trash')}
                        >
                            <img 
                                src={`assets/img/${selectedLink === 'trash' ? 'trash_clicked.svg' : 'trash.svg'}`} 
                                alt="Trash Notes" 
                                className="icon" 
                            />
                            Trash
                        </Link>
                        </li>
                    {}
                </ul>
            </nav>
        </aside>
    );
}
