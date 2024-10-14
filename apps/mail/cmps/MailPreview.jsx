import { utilService } from "../../../services/util.service.js"
import { LongTxt } from "../../../cmps/LongTxt.jsx"
import { mailService } from "../services/mail.service.js"



export function MailPreview({ mail }) {

    let mailClass = getMailReadClass()


    function getMailReadClass() {
        return mail.isRead ? '' : 'bold-txt'
    }

    return (
        <article className={`mail-preview ${mailClass}`}>
            <p className="p-from"> {mailService.userNameDisplayOnly(mail.from)}</p>
            <p className="p-subject">
                {mail.subject && <LongTxt txt={mail.subject} />}
            </p>
            <p className="p-body">
                {mail.subject && <LongTxt txt={mail.body} length={60} />}
            </p>
            <p className="p-date">{mail.sentAt ? utilService.elapsedTime(mail.sentAt) : utilService.elapsedTime(mail.createdAt)}
            </p>
        </article>
    )
}

