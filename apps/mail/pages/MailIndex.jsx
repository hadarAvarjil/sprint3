
const { useEffect, useState } = React
const { Link, useSearchParams } = ReactRouterDOM

import { showErrorMsg, showSuccessMsg, showUserMsg } from "../../../services/event-bus.service.js"
import { utilService } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { MailFolderList } from "../cmps/MailFolderList.jsx"


export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [searchPrms, setSearchPrms] = useSearchParams()
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


    function onSetFilterBy(filterBy) {
        setFilterBy(preFilter => ({ ...preFilter, ...filterBy }))
    }

    if (!mails) return <h1>Loading...</h1>
    return (
        <section className="mail-index">
            <MailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <section>
                <Link to="/mail/edit" >Compose</Link>
            </section>
            <section className="mail-container">
                <MailFolderList />
                <MailList
                    mails={mails}
                    onRemoveMail={onRemoveMail}
                />
            </section>

        </section>
    )

}
