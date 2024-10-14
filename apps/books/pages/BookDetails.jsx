
const { useEffect, useState } = React

import { bookService } from "../services/book.service.js"


export function BookDetails({ onBack, bookId }) {

    const [book, setBook] = useState(null)
    const [pageCount, setPageCount] = useState(null)


    useEffect(() => {
        loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId)
            .then(setBook)
            .catch(err => {
                console.log('Problem getting book', err)
            })
    }

    if (!book) return <div>Loading...</div>

    function getBookLevel(book) {
        if (book.pageCount > 500) return 'Serious Reading'
        if (book.pageCount < 500 && book.pageCount > 200) return 'Descent Reading'
        if (book.pageCount < 100) return 'Light Reading'
        else return ''
    }
    function getBookPublishedDateState(book) {
        const currentYear = new Date().getFullYear()
        if (currentYear - book.publishedDate > 10) return 'Vintage'
        if (currentYear - book.publishedDate < 1) return 'New'
        else return ''
    }



    function getBookPriceClass(book) {
        if (book.listPrice.amount >= 150) return 'red'
        if (book.listPrice.amount <= 20) return 'green'
        return ''
    }

    return (
        <section className="book-details ">
            <section className="title-container">
                <h1>{book.title}</h1>
                <h2 className="subtitle">{book.subtitle}</h2>
            </section>
            <h2 className="authors">Authors: {book.authors}</h2>
            <section className="book-thumbnail-container">
                <img className="book-thumbnail" src={`assets/img/${book.thumbnail}.jpg`} alt="book-image" />
                {book.listPrice.isOnSale && (
                    <img className="sale-icon" src="assets/img/sale.png" alt="sale-icon" />
                )}
            </section>
            <p>Book Description: {book.description}</p>
            <h4 className="categories">Categories: {book.categories}</h4>
            <section className="book-publishedDate">
                <p><img className="details-icon" src="assets/img/publish.png" alt="published-icon" /> from {book.publishedDate}, {getBookPublishedDateState(book)} </p>
            </section>
            <section className="book-pageCount">
                <p><img className="details-icon" src="assets/img/document-page-number.png" alt="page-count-icon" /> {book.pageCount} pages, {getBookLevel(book)}</p>
            </section>
            <section className="book-language">
                <p><img className="details-icon" src="assets/img/language.png" alt="language-icon" /> {book.language}</p>
            </section>
            <section className={`book-pay ${getBookPriceClass(book)}`}>
                <p><img className="details-icon" src="assets/img/pay.png" alt="pay-icon" /> {book.listPrice.amount} {book.listPrice.currencyCode}</p>
            </section>
            <button className="back-btn" onClick={onBack}>Back</button>
        </section>
    );
}


