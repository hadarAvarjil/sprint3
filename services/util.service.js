export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    getRandomColor,
    padNum,
    getDayName,
    getMonthName,
    loadFromStorage,
    saveToStorage,
    getTruthyValues,
    getRandomDate,
    randomPastTime,
    elapsedTime
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
    const val = localStorage.getItem(key)
    return JSON.parse(val)
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function padNum(num) {
    return (num > 9) ? num + '' : '0' + num
}

function getRandomColor() {
    const letters = '0123456789ABCDEF'
    var color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

function getDayName(date, locale) {
    date = new Date(date)
    return date.toLocaleDateString(locale, { weekday: 'long' })
}


function getMonthName(date) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
    return monthNames[date.getMonth()]
}

function getTruthyValues(obj) {
    const newObj = {}
    for (const key in obj) {
        const value = obj[key]
        if (value || value === 0) {
            newObj[key] = value
        }
    }
    return newObj
}


function getRandomDate() {
    const now = Date.now()
    const pastDate = now - (365 * 24 * 60 * 60 * 1000)
    return new Date(pastDate + Math.random() * (now - pastDate)).getTime()
}

function randomPastTime() {

    const HOUR = 1000 * 60 * 60
    const DAY = 1000 * 60 * 60 * 24
    const YEAR = 1000 * 60 * 60 * 24 * 365

    const pastTime = getRandomIntInclusive(HOUR, YEAR)
    return Date.now() - pastTime
}


 function elapsedTime(pastMs) {
    const now = new Date();
    const pastDate = new Date(pastMs);

    const isSameDay = now.toDateString() === pastDate.toDateString()
    const isSameYear = now.getFullYear() === pastDate.getFullYear()

    if (isSameDay) {
        return pastDate.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        })
    }

    if (isSameYear) {
        return pastDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        })
    }

    return pastDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

