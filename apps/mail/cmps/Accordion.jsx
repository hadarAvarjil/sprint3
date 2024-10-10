const { useEffect, useState } = React

export function Accordion({ children, title }) {
    const [isOpen, setIsOpen] = useState(false);
    const openClass = isOpen ? 'open' : ''

    return (
        <section className={`accordion ${openClass}`}>
            <section onClick={() => setIsOpen((prev) => !prev)} className="title-container">
                {title}
            </section>
            {isOpen && (
                <section className="content">
                    {children}
                </section>
            )}
        </section>
    );
}