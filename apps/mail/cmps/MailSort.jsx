const { useState, useEffect } = React

export function MailSort({ sortBy, onSetSortBy }) {

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
        // <section className="mail-filter">
        //     <form onSubmit={onSubmit}>
        //         <div className="search-container">
        //             <i className="fas fa-search search-icon"></i>
        //             <input
        //                 value={txt}
        //                 onChange={handleChange}
        //                 type="text"
        //                 name="txt"
        //                 id="txt"
        //                 placeholder="Search mail"
        //                 className="search-input"
        //             />
        //             <div className="unread-container">
        //                 <input
        //                     type="checkbox"
        //                     id="isRead"
        //                     name="isRead"
        //                     checked={isRead}
        //                     className="checkbox-input"
        //                     onChange={handleChange}
        //                     title =  "Unread"
        //                 />
        //                 <img
        //                     src={'./assets/img/unread.png'}
        //                     alt="Unread Icon"
        //                     className="unread-icon"
        //                 />
        //             </div>


        //             <button type="submit" className="filter-icon">

        //             </button>
        //         </div>
        //     </form>
        // </section>
        console.log('hey')
        
    )
}