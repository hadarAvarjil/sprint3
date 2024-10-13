const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    return <header className="app-header">
        <Link to="/">
            <section className="logo">
                <img
                    src='./assets/img/logo1.png'
                    alt="Inbox Icon"
                    className="icon-logo"
                />
                <h3>Appsus</h3>
            </section>
        </Link>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail">Mail</NavLink>
            <NavLink to="/note">Note</NavLink>
        </nav>
    </header>
}
