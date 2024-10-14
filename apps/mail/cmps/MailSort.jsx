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
            <form className="mail-sort-form" onSubmit={onSubmit}>


                <div className="sentAt-sort-container">
                    <img
                        src={'./assets/img/sort.png'}
                        alt="Sort Icon"
                        className="icon"
                    />
                    <label htmlFor="sentAt" className="sentAt-sort">
                        Date

                        <input
                            type="checkbox"
                            id="sentAt"
                            name="sentAt"
                            checked={sentAt}
                            className="checkbox-input"
                            onChange={handleChange}
                            title="sentAt"
                        />
                    </label>
                </div>

                <div className="subject-sort-container">
                    <img
                        src={'./assets/img/sort.png'}
                        alt="Sort Icon"
                        className="icon"
                    />
                    <label htmlFor="subject" className="subject-sort">
                        Subject

                        <input
                            type="checkbox"
                            id="subject"
                            name="subject"
                            checked={subject}
                            className="checkbox-input"
                            onChange={handleChange}
                            title="subject"
                        />
                    </label>
                </div>

            </form>
        </section>

    )
}