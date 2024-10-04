const { Link } = ReactRouterDOM
import { MailPreview } from "./MailPreview.jsx";


export function MailList({ mails, onRemoveMail }) {

    return (
        <ul className="mail-list">
            {mails.map(mail =>
                <li key={mail.id}>
                    <MailPreview mail={mail} />
                    <section>
                        <button onClick={() => onRemoveMail(mail.id)}>Remove</button>
                        <button ><Link to={`/mail/${mail.id}`}>Details</Link></button>
                        <button ><Link to={`/mail/edit/${mail.id}`}>Edit</Link></button>
                    </section>
                </li>
            )}
        </ul>
    )

}


