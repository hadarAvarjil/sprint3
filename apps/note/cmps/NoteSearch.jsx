    export function SearchBar({ searchTerm, onSearchChange }) {
        return (
            <input
                type="text"
                placeholder="Search notes..."
                value={searchTerm}
                onChange={onSearchChange}
                style={{
                    width: '100%', // Full width of its container
                    padding: '10px', // Some padding for aesthetics
                    borderRadius: '5px', // Rounded corners
                    border: '1px solid #ccc', // Light border
                    marginBottom: '20px' // Spacing below the input
                }}
            />
        );
    }
