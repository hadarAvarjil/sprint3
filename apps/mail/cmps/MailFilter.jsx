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

    const { txt, isRead } = filterByToEdit
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
                    <div className="unread-container">

                        <img
                            src={'./assets/img/filter.png'}
                            alt="Sort Icon"
                            className="icon sort-icon"
                        />
                        <label htmlFor="isRead" className="isRead">
                            Unread
                            <input
                                type="checkbox"
                                id="isRead"
                                name="isRead"
                                checked={isRead}
                                className="checkbox-input"
                                onChange={handleChange}
                                title="Unread"
                            />

                        </label>
                    </div>


                    <button type="submit" className="filter-icon">

                    </button>
                </div>
            </form>
        </section>
    )
}