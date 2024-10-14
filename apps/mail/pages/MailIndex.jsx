
const { useEffect, useState } = React
const { useParams, Link, useSearchParams, Outlet } = ReactRouterDOM

import { showErrorMsg, showSuccessMsg, showUserMsg } from "../../../services/event-bus.service.js"
import { utilService } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailSort} from "../cmps/MailFilter.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { MailFolderList } from "../cmps/MailFolderList.jsx"
import { ComposeModal } from "../cmps/ComposeModal.jsx"



export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [searchPrms, setSearchPrms] = useSearchParams()
    const [composeNewMail, setComposeNewMail] = useState(null)
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchPrms))
    const [unreadMailsCount, setUnreadMailsCount] = useState(0)
    const { mailId } = useParams()


    useEffect(() => {
        loadMails()
        setSearchPrms(utilService.getTruthyValues(filterBy))
    }, [filterBy])


    useEffect(() => {
        mailService.getUnreadMailCount().then(count => setUnreadMailsCount(count))
    }, [])

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
                    mail.id === mailId ? { ...mail, isRead: !mail.isRead } : mail
                ))
                mailService.getUnreadMailCount().then(count => setUnreadMailsCount(count))
            })
    }

    function onReadMail(mailId) {
        mailService.readMail(mailId)
            .then(() => {
                setMails(mails => mails.map(mail =>
                    mail.id === mailId ? { ...mail, isRead: true } : mail
                ))
                mailService.getUnreadMailCount().then(count => setUnreadMailsCount(count))
            })
    }

    function onStarredMail(mailId) {
        setMails(mails => mails.map(mail =>
            mail.id === mailId ? { ...mail, isStarred: !mail.isStarred } : mail
        ))
    
        mailService.starredMail(mailId)
            .catch(err => {
                console.log('Error:', err)
                setMails(mails => mails.map(mail =>
                    mail.id === mailId ? { ...mail, isStarred: !mail.isStarred } : mail
                ))
            })
    }
    function onSetFilterBy(filterBy) {
        setFilterBy(preFilter => ({ ...preFilter, ...filterBy }))
    }

    function onSetSortBy(sortBy){
        setSortBy(preSort => ({ ...preSort, ...sortBy }))
    }

    function onComposeNewMail() {
        const emptyMail = mailService.getEmptyMail()
        setComposeNewMail(emptyMail)
    }


    if (!mails) return <h1>Loading...</h1>
    return (
        <section className="mail-index"
            style={{ backgroundColor: 'rgb(246, 248, 252)' }}>
                
            <section className="page">
                <section className="left">

                    <section className="mail-container-left">
                        <MailFolderList
                            onComposeNewMail={onComposeNewMail}
                            onSetFilterBy={onSetFilterBy}
                            unreadMailsCount={unreadMailsCount} />
                    </section>

                </section>

                <section className="right">

                    <MailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
                    {mailId ? (
                        <Outlet />
                    ) : (
                        <MailList
                            mails={mails}
                            onRemoveMail={onRemoveMail}
                            onUnReadMail={onUnReadMail}
                            onReadMail={onReadMail}
                            onStarredMail={onStarredMail}
                            unreadMailsCount={unreadMailsCount}
                        />
                    )}
                </section>
                {composeNewMail && <ComposeModal onClose={() => setComposeNewMail(null)} />}
            </section>
        </section>
    )

}
