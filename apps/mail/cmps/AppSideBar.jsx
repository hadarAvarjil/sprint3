const { Outlet, Link } = ReactRouterDOM

function AppSideBar() {
    return (
        <aside className="sidebar">
            <nav>
                <ul>
                    <li><Link to="inbox">Inbox</Link></li>
                    <li><Link to="starred">Starred</Link></li>
                    <li><Link to="sent">Sent</Link></li>
                    <li><Link to="draft">Drafts</Link></li>
                    <li><Link to="trash">Trash</Link></li>
                </ul>
            </nav>
            <Outlet />
        </aside>
    )
}
