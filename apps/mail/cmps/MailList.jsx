const { Link } = ReactRouterDOM
import { MailPreview } from "./MailPreview.jsx";


export function MailList({ mails, onRemoveMail }) {

    return (
        <section className="mail-list">
            < table className="mail-container">
                <tbody>
                    {mails.map(mail =>
                        <tr key={mail.id}>
                            <td>
                            <img
                                src={mail.isStarred ? '../../../assets/img/star_indicator_fillIn.png' : '../../../assets/img/star_indicator.png'}
                                alt="Inbox Icon"
                                className="icon"
                            />
                            </td>
                            <td>
                                <MailPreview mail={mail} />
                            </td>
                            <td>
                                <section className="mail-actions">
                                    <button onClick={() => onRemoveMail(mail.id)}>Remove</button>
                                    <button><Link to={`/mail/${mail.id}`}>Details</Link></button>
                                    <button><Link to={`/mail/edit/${mail.id}`}>Edit</Link></button>
                                </section>
                            </td>
                        </tr>
                    )}
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


