const { Link } = ReactRouterDOM
import { MailPreview } from "./MailPreview.jsx";


export function MailList({ mails, onRemoveMail, onUnReadMail, onReadMail, onStarredMail }) {
    return (
        <section className="mail-list"
            style={{ backgroundColor: 'white' }}>
            <table className="mail-container">
                <tbody>
                    {mails.map(mail => (
                        <tr key={mail.id}
                            onClick={() => onReadMail(mail.id)}
                            className={mail.isRead ? 'read-mail' : ''}
                        >
                            <td>
                                <button className="star-btn" onClick={(e) => { e.stopPropagation(); onStarredMail(mail.id); }}>
                                    <img
                                        src={mail.isStarred ? './assets/img/star_indicator_fillIn.png' : './assets/img/star_indicator.png'}
                                        alt="star Icon"
                                        className="icon star-btn"
                                    />
                                </button>
                            </td>
                            <td>
                                <Link to={`/mail/${mail.id}`}>
                                    <MailPreview mail={mail} />
                                </Link>
                            </td>
                            <td>
                                <section className="mail-actions" >
                                    <button onClick={(e) => { e.stopPropagation(); onRemoveMail(mail.id); }}>
                                        <img
                                            src={'./assets/img/trash.png'}
                                            alt="Remove Icon"
                                            className="icon remove-btn"
                                        />
                                    </button>
                                    <button onClick={(e) => { e.stopPropagation(); onUnReadMail(mail.id); }}>
                                        <img
                                            src='./assets/img/unread.png'
                                            alt="Unread Icon"
                                            className="icon unread-btn"
                                        />
                                    </button>
                                </section>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}

// id: utilService.makeId(),
// createdAt : 1551133930500,
// subject: utilService.makeLorem(4),
// body: utilService.makeLorem(20),
// isRead:  Math.random() > 0.7,
// sentAt : 1551133930594,
// removedAt : null,
// from: 'momo@momo.com',
// to: 'user@appsus.com'


