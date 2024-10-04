const { Link } = ReactRouterDOM
import { MailPreview } from "./MailPreview.jsx";


export function MailList({ mails, onRemoveMail }) {

    return (
        < table className="mail-list">
            <tbody>
                {mails.map(mail =>
                    <tr key={mail.id}>
                        <td>
                            <i className={mail.isStarred ? "icon-starred" : "icon-unstarred"}></i>
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
    )

}


