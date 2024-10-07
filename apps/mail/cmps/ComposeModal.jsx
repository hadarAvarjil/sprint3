const { useNavigate, useParams } = ReactRouterDOM
const { useEffect, useState } = React

import { mailService } from "../services/mail.service.js"


export function ComposeModal({ onClose }) {

    const [newMail, setnewMail] = useState(mailService.getEmptyMail())
    const navigate = useNavigate()

    function handleChange({ target }) {
        console.log('handleChange');
        
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
        setnewMail(prevMail => ({ ...prevMail, [field]: value }))
    }

    function onSaveMail(ev) {
        console.log('onSaveMail', newMail);
        ev.preventDefault()
        mailService.save(newMail)
            .then(mail => {
            })
            .catch(err => {
                console.log('err:', err)
            })
            .finally(() => {
                navigate('/mail')
                onClose()
            })
    }

    const { from, subject, body } = newMail

    function evStop(ev) {
        ev.stopPropagation()
    }

    return (
            <section onClick={evStop} className="compose-modal">
                <h1>New Message</h1>
                <form onSubmit={onSaveMail}>
                    <input value={from} onChange={handleChange} placeholder="To" type="text" name="from" id="from" />
                    <input value={subject} onChange={handleChange} placeholder="Subject" type="text" name="subject" id="subject" />
                    <textarea value={body} onChange={handleChange} name="body" id="body" />
                    <button className="send-btn">Send</button>
                    <button className="x-btn" onClick={onClose}>X</button>
                </form>
            </section>
    )

}

