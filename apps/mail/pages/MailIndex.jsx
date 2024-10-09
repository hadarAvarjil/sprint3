
const { useEffect, useState } = React
const { Link, useSearchParams } = ReactRouterDOM

import { showErrorMsg, showSuccessMsg, showUserMsg } from "../../../services/event-bus.service.js"
import { utilService } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { MailFolderList } from "../cmps/MailFolderList.jsx"
import { ComposeModal } from "../cmps/ComposeModal.jsx";


export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [searchPrms, setSearchPrms] = useSearchParams()
    const [composeNewMail, setComposeNewMail] = useState(null)
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchPrms))


    useEffect(() => {
        loadMails()
        setSearchPrms(utilService.getTruthyValues(filterBy))
    }, [filterBy])

    function loadMails() {
        mailService.query(filterBy)
            .then(setMails)
            .catch(err => {
                console.log('Problems getting mails:', err)
            })
    }

    function onRemoveMail(mailId) {
        mailService.remove(mailId)
            .then(() => {
                setMails(mails => mails.filter(mail => mail.id !== mailId))
                showSuccessMsg(`mail removed successfully!`)
            })
            .catch(err => {
                console.log('Problems removing mail:', err)
                showErrorMsg(`Problems removing mail (${mailId})`)
            })
    }

    function onUnReadMail(mailId) {
        mailService.unReadMail(mailId)
            .then(() => {
                setMails(mails => mails.map(mail =>
                    mail.id === mailId ? { ...mail, isRead: false } : mail
                ))
            })
    }

    function onReadMail(mailId) {
        mailService.readMail(mailId)
            .then(() => {
                setMails(mails => mails.map(mail =>
                    mail.id === mailId ? { ...mail, isRead: true } : mail
                ))
            })
    }

    function onStarredMail(mailId) {
        mailService.starredMail(mailId)
            .then(() => {
                setMails(mails => mails.map(mail =>
                    mail.id === mailId ? { ...mail, isStarred: !mail.isStarred } : mail
                ))
            })
    }

    function onSetFilterBy(filterBy) {
        setFilterBy(preFilter => ({ ...preFilter, ...filterBy }))
    }

    function onComposeNewMail() {
        const emptyMail = mailService.getEmptyMail()
        setComposeNewMail(emptyMail)
    }


    if (!mails) return <h1>Loading...</h1>
    return (
        <section className="mail-index"
            style={{ backgroundColor: 'rgb(246, 248, 252)' }}>
            <MailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <section className="mail-container">
                <section className="mail-container-left">

                    <button className="compose-btn"
                    onClick={() => onComposeNewMail()}>
                        <img
                            src='./assets/img/compose.png'
                            alt="Inbox Icon"
                            className="icon"
                        />
                        Compose</button>

                    <MailFolderList onSetFilterBy={onSetFilterBy} />
                </section>
                <MailList
                    mails={mails}
                    onRemoveMail={onRemoveMail}
                    onUnReadMail={onUnReadMail}
                    onReadMail={onReadMail}
                    onStarredMail={onStarredMail}

                />
            </section>
            {composeNewMail &&
                <ComposeModal
                    onClose={() => setComposeNewMail(null)}
                />
            }
        </section>
    )

}
