const { useState } = React;
const { Link } = ReactRouterDOM;

export function SideBar() {
    const [selectedLink, setSelectedLink] = useState("all");

    const handleLinkClick = (linkName) => {
        setSelectedLink(linkName);
    };

    return (
        <aside className="sidebar-keep">
            <nav>
                <ul style={{ listStyleType: 'none', padding: 0 }}> {}
                    <li className={`sidebar-keep-item ${selectedLink === 'all' ? 'active' : ''}`}>
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
                    <li className={`sidebar-keep-item ${selectedLink === 'pinned' ? 'active' : ''}`}>
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
                    <li className={`sidebar-keep-item ${selectedLink === 'archived' ? 'active' : ''}`}>
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
                    <li className={`sidebar-keep-item ${selectedLink === 'trash' ? 'active' : ''}`}>
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
