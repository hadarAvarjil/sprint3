const { Link } = ReactRouterDOM
import { MailPreview } from "./MailPreview.jsx";


export function MailList({ mails, onRemoveMail, onUnReadMail }) {
    return (
        <section className="mail-list">
            <table className="mail-container">
                <tbody>
                    {mails.map(mail => (
                        <tr key={mail.id}>
                            <td>
                                <img
                                    // src={mail.isStarred ? '../../../assets/img/star_indicator_fillIn.png' : '../../../assets/img/star_indicator.png'}
                                    alt="Inbox Icon"
                                    className="icon"
                                    src={`assets/img/${mail.isStarred ? 'star_indicator_fillIn.png' : 'star_indicator.png'}`} 
                                />
                            </td>
                            <td>
                                <Link to={`/mail/${mail.id}`}>
                                    <MailPreview mail={mail} />
                                </Link>
                            </td>
                            <td>
                                <section className="mail-actions">
                                    <button onClick={(e) => { e.stopPropagation(); onRemoveMail(mail.id); }}>
                                        <img
                                            src='../../../assets/img/trash.png'
                                            alt="Remove Icon"
                                            className="icon remove-btn"
                                        />
                                    </button>
                                    <button onClick={(e) => { e.stopPropagation(); onUnReadMail(mail.id); }}>
                                        <img
                                            src='../../../assets/img/unread.png'
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


