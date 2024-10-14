import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
    getCategoryStats,
    getAuthorStats,
    getFilterFromSearchParams,
    addGoogleBook,
    getGoogleBooks,
}
// For Debug (easy access from console):
// window.bs = bookService

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regExp.test(book.title))
            }

            if (filterBy.minPrice) {
                books = books.filter(book => book.price >= filterBy.minPrice)
            }

            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(book => {
            book = _setNextPrevBookId(book)
            return book
        })
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title = '', price = '') {
    return { title, price }
}

function getDefaultFilter(filterBy = { txt: '', minPrice: '' }) {
    return { txt: filterBy.txt, minPrice: filterBy.minPrice }
}

function getFilterFromSearchParams(searchParams) {
    return {
        txt: searchParams.get('txt') || '',
        minPrice: +searchParams.get('minPrice') || ''
    }
}

function getCategoryStats() {
    return storageService.query(BOOK_KEY)
        .then(books => {
            const bookCountByCategoryMap = _getBookCountByCategoryMap(books)
            const data = Object.keys(bookCountByCategoryMap).map(category => ({ title: category, value: bookCountByCategoryMap[category] }))
            return data
        })

}

function getAuthorStats() {
    return storageService.query(BOOK_KEY)
        .then(books => {
            const bookCountByAuthorMap = _getBookCountByAuthorMap(books)
            const data = Object.keys(bookCountByAuthorMap)
                .map(author =>
                ({
                    title: author,
                    value: Math.round((bookCountByAuthorMap[author] / books.length) * 100)
                }))
            return data
        })
}

function addGoogleBook(book) {
    return storageService.post(BOOK_KEY, book, false)
}

function getGoogleBooks(bookName) {
    if (bookName === '') return Promise.resolve()
    const googleBooks = gCache[bookName]
    if (googleBooks) {
        console.log('data from storage...', googleBooks)
        return Promise.resolve(googleBooks)
    }

    const url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${bookName}`
    return axios.get(url)
        .then(res => {
            const data = res.data.items
            console.log('data from network...', data)
            const books = _formatGoogleBooks(data)
            gCache[bookName] = books
            utilService.saveToStorage(CACHE_STORAGE_KEY, gCache)
            return books
        })
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = []
        const titles = ['Between Here and Gone', 'GWENT', 'MAGIC LANTERN', 'Its Just A DOG', 'UNBORED', 'Beat Your Way To The Top', 'Don`t Panic', 'You can`t Be an ASTRONAUT', 'Holes', 'AKARNAE']
        const prices = [10, 15, 20, 25, 30]
        for (let i = 0; i < 20; i++) {
            const title = titles[utilService.getRandomIntInclusive(0, titles.length - 1)]
            books.push(_createBook(title, prices[utilService.getRandomIntInclusive(0, prices.length - 1)]))
        }
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(title, price) {
    const book = getEmptyBook(title, price)
    book.id = utilService.makeId()
    book.description = "placerat nisi sodales suscipit tellus"
    book.thumbnail = "http://ca.org/books-photos/20.jpg"
    book.listPrice = {
        amount: 109,
        currencyCode: "EUR",
        isOnSale: false
    }
    return book
}

function _setNextPrevBookId(book) {
    return storageService.query(BOOK_KEY).then((books) => {
        const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextBookId = nextBook.id
        book.prevBookId = prevBook.id
        return book
    })
}

function _getBookCountByCategoryMap(books) {
    const bookCountByCategoryMap = books.reduce((map, book) => {
        if (!map[book.category]) map[book.category] = 0
        map[book.category]++
        return map
    }, {})
    return bookCountByCategoryMap
}

function _getBookCountByAuthorMap(books) {
    const bookCountByAuthorMap = books.reduce((map, book) => {
        if (!map[book.author]) map[book.author] = 0
        map[book.author]++
        return map
    }, {})
    return bookCountByAuthorMap
}

function _formatGoogleBooks(googleBooks) {
    // console.log('googleBooks:', googleBooks)
    return googleBooks.map(googleBook => {
        const { volumeInfo } = googleBook
        const book = {
            id: googleBook.id,
            title: volumeInfo.title,
            description: volumeInfo.description,
            pageCount: volumeInfo.pageCount,
            authors: volumeInfo.authors,
            categories: volumeInfo.categories,
            publishedDate: volumeInfo.publishedDate,
            language: volumeInfo.language,
            listPrice: {
                amount: utilService.getRandomIntInclusive(80, 500),
                currencyCode: "EUR",
                isOnSale: Math.random() > 0.7
            },
            reviews: []
        }
        if (volumeInfo.imageLinks) book.thumbnail = volumeInfo.imageLinks.thumbnail
        return book
    })
}