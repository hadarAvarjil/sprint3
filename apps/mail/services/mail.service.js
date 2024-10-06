// mail service

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'
const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
    getFilterFromSearchParams,
    debounce,
    unReadMail
}

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regExp.test(mail.subject))
            }
            if (filterBy.status === 'inbox') {
                mails = mails.filter(mail => mail.to === loggedinUser.email)
            }

            if (filterBy.status === 'sent') {
                mails = mails.filter(mail => mail.from === loggedinUser.email)
            }
            if (filterBy.status === 'starred') {
                mails = mails.filter(mail => mail.isStarred)
            }
            if (filterBy.status === 'trash') {
                mails = mails.filter(mail => mail.removedAt)
            }

            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
        .then(mail => _setNextPrevMailId(mail))
}

function removeMailDB(mailId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(MAIL_KEY, mailId)
}

function remove(mailId) {
    return storageService.get(MAIL_KEY, mailId)
        .then(mail => {
            return _moveMailToTrash(mail)
        }
        )
        .then(updatedMail => {
            return storageService.put(MAIL_KEY, updatedMail)
        })
}

function _moveMailToTrash(mail) {
    mail.removedAt = Date.now()
    return mail
}

function unReadMail(mailId) {
    return storageService.get(MAIL_KEY, mailId)
        .then(mail => {
            return _unReadMail(mail)
        }
        )
        .then(updatedMail => {
            return storageService.put(MAIL_KEY, updatedMail)
        })
}

function _unReadMail(mail){
    mail.isRead = false
    return mail
}




function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function getEmptyMail(subject = '', createdAt = '', body = '', isRead = false, isStarred = false, sentAt = Date.now, to = 'user@appsus.com',) {
    return { subject, createdAt, body, isRead, isStarred, sentAt, to }
}

function getDefaultFilter() {
    return {
        status: '',
        txt: '',
        isRead: '',
        isStared: '',
        lables: '',
    }
}

function _createMails() {
    const ctgs = ['Critical', 'Family', 'Work', 'Friends', 'Spam', 'Memories', 'Romantic']
    const mails = utilService.loadFromStorage(MAIL_KEY) || []
    const usersMail = ['user@appsus.com', 'momo@momo.com', 'bobo@momo.com', 'dodo@momo.com']

    if (mails && mails.length) return

    for (let i = 0; i < 20; i++) {
        const mail = {
            id: utilService.makeId(),
            createdAt: 1551133930500,
            subject: utilService.makeLorem(4),
            body: utilService.makeLorem(20),
            isRead: Math.random() > 0.7,
            isStarred: Math.random() > 0.7,
            sentAt: utilService.randomPastTime(),
            removedAt: null,
            categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
            from: usersMail[utilService.getRandomIntInclusive(0, usersMail.length - 1)],
            to: 'user@appsus.com',
        }
        mails.push(mail)
    }
    utilService.saveToStorage(MAIL_KEY, mails)
}


function _createMail(subject, createdAt = Date.now) {
    const mail = getEmptyMail(subject, createdAt)
    mail.id = makeId()
    return mail
}



function getFilterFromSearchParams(searchParams) {
    const txt = searchParams.get('txt') || ''
    const mincreatedAt = searchParams.get('mincreatedAt') || ''
    return {
        txt,
        mincreatedAt
    }
}


function _setNextPrevMailId(mail) {
    return query().then((mails) => {
        const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
        const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
        const prevMail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]
        mail.nextMailId = nextMail.id
        mail.prevMailId = prevMail.id
        return mail
    })
}


function debounce(func, delay) {
    let timeoutId
    return (...args) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            func(...args)
        }, delay)
    }
}