const { useNavigate, useParams } = ReactRouterDOM
const { useEffect, useState, useRef } = React

import { mailService } from "../services/mail.service.js"

export function ComposeModal({ onClose }) {

    const [newMail, setnewMail] = useState(mailService.getEmptyMail())
    const navigate = useNavigate()
    const onSetDraftMail = useRef(mailService.debounce(onDraftMail, 5000))

    useEffect(() => {
        return () => {
            onDraftMail(newMail)
        }
    }, [newMail])

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
        onSetDraftMail.current(updatedMail)
        return updatedMail
    }

    function onSendMail(ev) {
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

    function onDraftMail(updatedMail) {
        if (updatedMail.id) {
            mailService.updateDraftMail(updatedMail)
                .then(() => {
                    console.log('Draft updated:', updatedMail)
                })
                .catch(err => {
                    console.log('Error updating draft mail:', err)
                })
        } else {
            mailService.saveDraftMail(updatedMail)
                .then(savedDraft => {
                    setNewMail(savedDraft)
                    console.log('Draft saved:', savedDraft)
                })
                .catch(err => {
                    console.log('Error saving draft mail:', err)
                })
        }
    }


    const { to, subject, body } = newMail

    function evStop(ev) {
        ev.stopPropagation()
    }

    return (
        <section onClick={evStop} className="compose-modal">
            <h1>New Message</h1>
            <form onSubmit={onSendMail}>

                <input value={to} onChange={handleChange} placeholder="To" type="email" pattern="[^ @]*@[^ @]*" name="to" id="to" required />

                <input value={subject} onChange={handleChange} placeholder="Subject" type="text" name="subject" id="subject" />

                <textarea value={body} onChange={handleChange} name="body" id="body" />

                <button className="send-btn">Send</button>
                <button className="x-btn" onClick={onClose}>X</button>
            </form>
        </section>
    )

}

