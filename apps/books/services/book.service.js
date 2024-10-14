import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { booksServiceDB } from './books.js'

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getNextBookId,
    getDefaultFilter
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) {
                console.log(filterBy.txt);

                const regex = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regex.test(book.title))
                console.log(books);
            }
            if (filterBy.price) {
                books = books.filter(book => book.listPrice.amount >= filterBy.price)
            }
            return books
        })
}



function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
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

function getEmptyBook(title = '', price = 0) {
    return { id: '', title, price }
}


function getDefaultFilter() {

    return {
        txt: '',
        price: '',
    }
}

function getNextBookId(bookId) {
    return storageService.query(BOOK_KEY)
        .then(Books => {
            let nextBookIdx = Books.findIndex(book => book.id === bookId) + 1
            if (nextBookIdx === Books.length) nextBookIdx = 0
            return Books[nextBookIdx].id
        })
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = booksServiceDB.booksDB()
        convertPricesToILS(books)
        utilService.saveToStorage(BOOK_KEY, books)

    }
}


function convertPricesToILS(books) {
    books.forEach(book => {
        const price = book.listPrice;
        switch (price.currencyCode) {
            case 'EUR':
                price.amount = (price.amount * 1.1).toFixed(2)
                break
            case 'ILS':
                price.amount = (price.amount * 0.27).toFixed(2)
                break;
            case 'USD':
                break
        }
        price.currencyCode = 'USD'
    })
}

function _createBook(vendor, maxSpeed = 250) {
    const book = getEmptyBook(vendor, maxSpeed)
    book.id = utilService.makeId()
    return book
}