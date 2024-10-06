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
            <header className="mail-header">
                <h3 className="mail-subject">{mail.subject}</h3>
                <div className="mail-meta">
                    <h4 className="mail-from">{mail.from}</h4>
                    <span className="mail-date">{utilService.elapsedTime(mail.sentAt)}</span>
                </div>
            </header>
            
            <div className="mail-body">
                <p>{mail.body}</p>
            </div>

            <div className="mail-actions">
                <button className="btn-back" onClick={onBack}>Back</button>
            </div>
        </section>
    )
}

