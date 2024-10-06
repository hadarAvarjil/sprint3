import { utilService } from "../../../services/util.service.js"

export function MailPreview({ mail }) {

    let mailClass = getMailReadClass()


    function getMailReadClass() {
        return mail.isRead ? '': 'bold-txt'
    }

    return (
        <article className={`mail-preview ${mailClass}`} >
            <p> {mail.from}</p >
            <p>{mail.subject}</p>
            <p>{utilService.elapsedTime(mail.sentAt)}</p>
        </article >
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