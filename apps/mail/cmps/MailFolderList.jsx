const { Outlet, Link } = ReactRouterDOM
const { useState } = React



export function MailFolderList({ onSetFilterBy, unreadMailsCount, onComposeNewMail }) {

    const [selectedLink, setSelectedLink] = useState('inbox')
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    const handleLinkClick = (linkName) => {
        setSelectedLink(linkName)
        onSetFilterBy({ status: linkName })
    }
    

    return (
        <section>
            <section className="header-section">
                <section className="first-line">
                    <img
                        src={'./assets/img/menu.png'}
                        alt="menu Icon"
                        className="icon-menu"
                    />

                    <img
                        src={'./assets/img/google-mail-icon.png'}
                        alt="menu Icon"
                        className="icon-logo"
                    />
                    <h3 className="logo-title">Hmail</h3>
                </section>
            </section>

            <button className="compose-btn"
                onClick={() => onComposeNewMail()}>
                <img
                    src='./assets/img/compose.png'
                    alt="Inbox Icon"
                    className="icon-compose"
                />
                Compose</button>


            <aside className={"sidebar"}>

                <ul>
                    <li className={selectedLink === 'inbox' ? 'selected-link' : ''}>
                        <Link to="/mail/inbox" onClick={() => handleLinkClick('inbox')}>
                            <img
                                src={selectedLink === 'inbox' ? './assets/img/inbox_clicked.png' : './assets/img/inbox.png'}
                                alt="Inbox Icon"
                                className="icon"
                            />
                            Inbox <span className={selectedLink === 'inbox' ? 'bold-txt' : ''}>{unreadMailsCount > 0 ? `${unreadMailsCount}` : ''}</span>
                        </Link>
                    </li>

                    <li className={selectedLink === 'starred' ? 'selected-link' : ''}>
                        <Link to="/mail/starred" onClick={() => handleLinkClick('starred')}>
                            <img
                                src={selectedLink === 'starred' ? './assets/img/starred_clicked.png' : './assets/img/starred.png'}
                                alt="starred Icon"
                                className="icon"
                            />
                            Starred
                        </Link>
                    </li>

                    <li className={selectedLink === 'sent' ? 'selected-link' : ''}>
                        <Link to="/mail/sent" onClick={() => handleLinkClick('sent')}>
                            <img
                                src={selectedLink === 'sent' ? './assets/img/send_clicked.png' : './assets/img/send.png'}
                                alt="sent Icon"
                                className="icon"
                            />
                            Sent
                        </Link>
                    </li>
                    <li className={selectedLink === 'draft' ? 'selected-link' : ''}>
                        <Link to="/mail/draft" onClick={() => handleLinkClick('draft')}>
                            <img
                                src={selectedLink === 'draft' ? './assets/img/draft_clicked.png' : './assets/img/draft.png'}
                                alt="draft Icon"
                                className="icon"
                            />
                            Drafts
                        </Link>
                    </li>
                    <li className={selectedLink === 'trash' ? 'selected-link' : ''}>
                        <Link to="/mail/trash" onClick={() => handleLinkClick('trash')}>
                            <img
                                src={selectedLink === 'trash' ? './assets/img/trash_clicked.png' : './assets/img/trash.png'}
                                alt="draft Icon"
                                className="icon"
                            />
                            Trash
                        </Link>
                    </li>
                </ul>
            </aside>
        </section>
    )
}
