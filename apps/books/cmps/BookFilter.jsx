const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilterBy }) {

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

    // function handleTxtChange(ev) {
    //     const value = ev.target.value
    //     setFilterByToEdit(prevFilter => ({ ...prevFilter, txt: value }))
    // }

    // function handleMinSpeedChange(ev) {
    //     const value = ev.target.value
    //     setFilterByToEdit(prevFilter => ({ ...prevFilter, minSpeed: value }))
    // }


    function onSubmit(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { txt, price } = filterByToEdit

    const isValid = txt
    return (
        <section className="book-filter">
            <h2>Books List</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="txt">Book Title </label>
                <input value={txt} onChange={handleChange} type="text" name="txt" id="txt" />

                <label htmlFor="price">Price </label>
                <input value={price || ''} onChange={handleChange} type="number" name="price" id="price" />

                <button disabled={!isValid}>Submit</button>
            </form>
        </section>
    )
}