const { useState, useEffect } = React

export function MailSort({ sortBy, onSetSortBy }) {

    const [sortByToEdit, setSortByToEdit] = useState({ ...sortBy })


    useEffect(() => {
        onSetSortBy(sortByToEdit)
    }, [sortByToEdit])

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
        setSortByToEdit(prevSort => ({ ...prevSort, [field]: value }))
    }


    function onSubmit(ev) {
        ev.preventDefault()
        onSetSortBy(sortByToEdit)
    }

    const { sentAt, subject } = sortByToEdit
    return (
        <section className="mail-sort">
            <form onSubmit={onSubmit}>

                <img
                    src={'./assets/img/sort.png'}
                    alt="Sort Icon"
                    className="icon"
                />

                <div className="sentAt-sort-container">
                    <label htmlFor="sentAt" className="sentAt-sort">
                        Date
                    </label>
                    <input
                        type="checkbox"
                        id="date"
                        name="date"
                        checked={sentAt}
                        className="checkbox-input"
                        onChange={handleChange}
                        title="date"
                    />
                </div>

                <div className="subject-sort-container">
                    <label htmlFor="subject" className="subject-sort">
                        Subject
                    </label>
                    <input
                        type="checkbox"
                        id="subject"
                        name="subject"
                        checked={subject}
                        className="checkbox-input"
                        onChange={handleChange}
                        title="subject"
                    />
                </div>

            </form>
        </section>

    )
}