const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"
import { showErrorMsg, showSuccessMsg, showUserMsg } from "../../../services/event-bus.service.js"
import { utilService } from "../../../services/util.service.js"

export function MailDetails() {

    const [mail, setMail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [params.mailId])

    function loadMail() {
        mailService.get(params.mailId)
            .then(setMail)
            .catch(err => {
                console.log('Problem getting mail', err)
                showErrorMsg('Problem getting mail')
                navigate('/mail')
            })
    }

    function onBack() {
        navigate('/mail')
    }

    if (!mail) return <div>Loading...</div>
    return (
        <section className="mail-details">

            <section className="mail-actions-details">
                <button className="btn-back" onClick={onBack}>
                    <img
                        src='./assets/img/arrow_back.png'
                        alt="arrow-back Icon"
                        className="arrow-back-btn"
                    />
                </button>
            </section>

            <header className="mail-header">
                <h3 className="mail-subject">{mail.subject}</h3>
                <section className="mail-data">
                    <h4 className="mail-from">{mail.from}</h4>
                    <span className="mail-date">{mail.sentAt ? utilService.elapsedTime(mail.sentAt) : utilService.elapsedTime(mail.createdAt)}</span>
                </section>
            </header>

            <section className="mail-body">
                <p>{mail.body}</p>
            </section>
        </section>
    )
}

