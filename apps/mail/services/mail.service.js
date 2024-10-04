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
    debounce
}

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regExp.test(mail.subject))
            }
            // if (filterBy.mincreatedAt) {
            //     mails = mails.filter(mail => mail.createdAt >= filterBy.mincreatedAt)
            // }
            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
        .then(mail => _setNextPrevMailId(mail))
}

function remove(mailId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function getEmptyMail(subject = '', createdAt = '') {
    return { subject, createdAt }
}

function getDefaultFilter() {
    return {
        status: '',
        txt: '',
        isRead: '',
        isStared:'',
        lables: '',
    }
}

function _createMails() {
    const ctgs = ['Critical', 'Family', 'Work', 'Friends', 'Spam', 'Memories', 'Romantic' ]
    const mails = utilService.loadFromStorage(MAIL_KEY) || []

    if (mails && mails.length) return

    for (let i = 0; i < 20; i++) {
        const mail = {
            id: utilService.makeId(),
            createdAt : 1551133930500,
            subject: utilService.makeLorem(4),
            body: utilService.makeLorem(20),
            isRead:  Math.random() > 0.7,
            sentAt : 1551133930594,
            removedAt : null,
            from: 'momo@momo.com',
            to: 'user@appsus.com'
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