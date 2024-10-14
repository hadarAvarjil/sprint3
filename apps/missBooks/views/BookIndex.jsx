const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { bookService } from '../services/book.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

import { BookList } from '../cmps/BookList.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'

export function BookIndex() {

    const [books, setBooks] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [ filterBy, setFilterBy ] = useState(bookService.getFilterFromSearchParams(searchParams))

    useEffect(() =>{
        setSearchParams(filterBy)
        bookService.query(filterBy)
            .then(books => setBooks(books))
    }, [filterBy])

    function onSetFilterBy(newFilter){
        setFilterBy(newFilter)
    }

    function removeBook(bookId){
        bookService.remove(bookId)
        .then(() => {
            setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
            showSuccessMsg(`Book ${bookId} removed successfully!`)
        })
        .catch(err => {
            showErrorMsg('There was a problem')
        })
    }

    return <section>
        <Link to="/book/edit"><button className='add-edit-book'>Add a book</button></Link>
        <BookFilter filterBy={filterBy} onFilter={onSetFilterBy}/>
        {<BookList books={books} onRemove={removeBook}/>}
    </section>
}