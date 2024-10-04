const { Outlet, Link } = ReactRouterDOM
const { useState } = React



export function MailFolderList() {

    const [selectedLink, setSelectedLink] = useState('inbox')

    const handleLinkClick = (linkName) => {
        setSelectedLink(linkName)
    }

    return (
        <aside className="sidebar">
            <nav>
                <ul>
                    <li>
                        <Link to="inbox" onClick={() => handleLinkClick('inbox')}>
                            <img
                                src={selectedLink === 'inbox' ? '../../../assets/img/inbox_clicked.png' : '../../../assets/img/inbox.png'}
                                alt="Inbox Icon"
                                className="icon"
                            />
                            Inbox
                        </Link>
                    </li>

                    <li>
                        <Link to="starred" onClick={() => handleLinkClick('starred')}>
                            <img
                                src={selectedLink === 'starred' ? '../../../assets/img/starred_clicked.png' : '../../../assets/img/starred.png'}
                                alt="starred Icon"
                                className="icon"
                            />
                            Starred
                        </Link>
                    </li>

                    <li>
                        <Link to="sent" onClick={() => handleLinkClick('sent')}>
                            <img
                                src={selectedLink === 'sent' ? '../../../assets/img/send_clicked.png' : '../../../assets/img/send.png'}
                                alt="sent Icon"
                                className="icon"
                            />
                            Sent
                        </Link>
                    </li>
                    <li>
                        <Link to="draft" onClick={() => handleLinkClick('draft')}>
                            <img
                                src={selectedLink === 'draft' ? '../../../assets/img/draft_clicked.png' : '../../../assets/img/draft.png'}
                                alt="draft Icon"
                                className="icon"
                            />
                            Drafts
                        </Link>
                    </li>
                    <li>
                        <Link to="trash" onClick={() => handleLinkClick('trash')}>
                            <img
                                src={selectedLink === 'trash' ? '../../../assets/img/trash_clicked.png' : '../../../assets/img/trash.png'}
                                alt="draft Icon"
                                className="icon"
                            />
                            Trash
                        </Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </aside>
    )
}
