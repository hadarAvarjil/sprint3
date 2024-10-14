
export function BookPreview({ book }) {

    return (
        <article className="book-preview-container">
            <h2>{book.title}</h2>
            <h3>{book.subtitle}</h3>
            <h4>Categories: {book.categories}</h4>
            <h4>Authors: {book.authors}</h4>
            <img src={`assets/img/${book.thumbnail}.jpg`} alt="book-image"></img>
        </article>
    )
}

