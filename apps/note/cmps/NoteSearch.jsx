    export function SearchBar({ searchTerm, onSearchChange }) {
        return (
            <input
                type="text"
                placeholder="Search notes..."
                value={searchTerm}
                onChange={onSearchChange}
                style={{
                    width: '100%', 
                    padding: '10px', 
                    borderRadius: '5px', 
                    border: '1px solid #ccc', 
                    marginBottom: '20px' 
                }}
            />
        )
    }
