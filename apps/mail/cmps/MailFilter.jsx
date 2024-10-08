const { useState, useEffect } = React

export function MailFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }


    function onSubmit(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { txt } = filterByToEdit
    return (
        <section className="mail-filter">
            <form onSubmit={onSubmit}>
                <div className="search-container">
                    <i className="fas fa-search search-icon"></i>
                    <input
                        value={txt}
                        onChange={handleChange}
                        type="text"
                        name="txt"
                        id="txt"
                        placeholder="Search mail"
                        className="search-input"
                    />
                    <input
                        type="checkbox"
                        id="isread"
                        name="isread"
                        checked={isOnSale}
                        onChange={handleChange}
                        className="search-input"
                    />


                    <button type="submit" className="filter-icon">
                        <i className="fas fa-sliders-h"></i>
                    </button>
                </div>
            </form>
        </section>
    )
}