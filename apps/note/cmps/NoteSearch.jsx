export function SearchBar({ searchTerm, onSearchChange }) {
    return (
        <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={onSearchChange}
            className="search-bar"
        />
    );
}