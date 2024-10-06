const { useNavigate, useParams } = ReactRouterDOM


import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React

export function MailCompose() {

    const [mailToEdit, setMailToEdit] = useState(mailService.getEmptyMail())
    const { mailId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (mailId) loadMail()
    }, [])


    function loadMail() {
        mailService.get(mailId)
            .then(setMailToEdit)
            .catch(err => {
                console.log('Problem getting mail', err)
                navigate('/mail')
            })
    }


    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setMailToEdit(prevMail => ({ ...prevMail, [field]: value }))
    }

    function onSaveMail(ev) {
        ev.preventDefault()
        mailService.save(mailToEdit)
            .then(mail => {
            })
            .catch(err => {
                console.log('err:', err)
            })
            .finally(() => {
                navigate('/mail')
            })
    }

    const { subject, body } = mailToEdit

    return (
        <section className="mail-edit">
            <h1>{mailToEdit.id ? 'Edit' : 'Add'} Mail</h1>
            <form onSubmit={onSaveMail}>
                <label htmlFor="subject">subject</label>
                <input value={subject} onChange={handleChange} type="text" name="subject" id="subject" />

                <label htmlFor="body">body</label>
                <input value={body} onChange={handleChange} type="text" name="body" id="body" />
                <button>Save</button>
            </form>
        </section>
    )

}

// id: utilService.makeId(),
// createdAt: 1551133930500,
// subject: utilService.makeLorem(4),
// body: utilService.makeLorem(20),
// isRead: Math.random() > 0.7,
// isStarred: Math.random() > 0.7,
// sentAt: utilService.randomPastTime(),
// removedAt: null,
// from: 'momo@momo.com',
// to: 'user@appsus.com'