
export function MailPreview({ mail }) {


    return (
        <article className="mail-preview">
            <h3>{mail.from}</h3>
            <h3>{mail.subject}</h3>
            <h3>{mail.createdAt}</h3>
        </article>
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