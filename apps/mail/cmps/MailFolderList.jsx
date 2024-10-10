const { Outlet, Link } = ReactRouterDOM
const { useState } = React



export function MailFolderList({ onSetFilterBy, unreadMailsCount }) {

    const [selectedLink, setSelectedLink] = useState('inbox')

    const handleLinkClick = (linkName) => {
        setSelectedLink(linkName)
        onSetFilterBy({ status: linkName })
    }

    return (
        <aside className={"sidebar"}>
            <ul>
                <li className={selectedLink === 'inbox' ? 'selected-link' : ''}>
                    <Link to="/mail/inbox" onClick={() => handleLinkClick('inbox')}>
                        <img
                            src={selectedLink === 'inbox' ? './assets/img/inbox_clicked.png' : './assets/img/inbox.png'}
                            alt="Inbox Icon"
                            className="icon"
                        />
                        Inbox <span>{unreadMailsCount > 0 ? `${unreadMailsCount}` : ''}</span>
                    </Link>
                    <span></span>
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
            {/* <Outlet /> */}
        </aside>
    )
}
