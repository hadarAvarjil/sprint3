const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter

const { Link } = ReactRouterDOM

import { bookService } from '../services/book.service.js'

export function BookDetails() {
    const [book, setBook] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        setIsLoading(true)
        bookService.get(params.bookId)
        .then(book => {
            setBook(book)
        })
        .catch(() => {
            alert('Couldn`t get book...')
            navigate('/book')
        })
        .finally(() => {
            setIsLoading(false)
        })
    }, [params.bookId])

    if (isLoading) return <h3>Loading...</h3>
    return <section className="book-details">
        <Link to="/book"><button>X</button></Link>
        <h3>Title: {book.title}</h3>
        <p>
            Price: {book.price}<br />
            {/* Description: {book.description}<br />
            Amount: {book.listPrice.amount}<br />
            Currency Code: {book.listPrice.currencyCode}<br />
            On Sale: {book.listPrice.isOnSale ? 'Yes' : 'No'} */}
        </p>
        <img src={`assets/img/BooksImages/${book.title}.jpg`} alt="" />
        <section className="actions">
            <Link to={`/book/${book.prevBookId}`}><button>Prev</button></Link>
            <Link to={`/book/${book.nextBookId}`}><button>Next</button></Link>
        </section>
    </section>
}