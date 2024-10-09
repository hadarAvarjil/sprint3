export function SearchBar({ searchTerm, onSearchChange }) {
    return (
        <section className="note-filter">
            <div className="keep-header">
                <div className="keep-logo-header">
                    <span className="material-icons">menu</span>
                    <img className="keep-logo" src="assets/img/keep_google_logo.png" alt="keep-logo" />
                    Keep
                </div>

                <div className="search-bar-container">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={onSearchChange}
                        className="search-bar"
                    />
                </div>
            </div>
        </section>
    )
}