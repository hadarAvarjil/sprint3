export function BookPreview({ book }) {
    const defaultImageSrc = './assets/img/BooksImages/default-image.jpg'
    return <article className="book-preview">
        <h3>Title: {book.title}</h3>
        <p>
            Price: {book.price}<br />
            {/* Description: {book.description}<br />
            Amount: {book.listPrice.amount}<br />
            Currency Code: {book.listPrice.currencyCode}<br />
            On Sale: {book.listPrice.isOnSale ? 'Yes' : 'No'} */}
        </p>
        <img
            src={`assets/img/BooksImages/${book.title}.jpg`}
            alt=""
            onError={(e) => {
                e.target.src = defaultImageSrc
            }}/>
        </article>
}