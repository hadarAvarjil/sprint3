const { Route, Routes, Navigate } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./pages/About.jsx"
import { Home } from "./pages/Home.jsx"
import { MailIndex } from "./apps/mail/pages/MailIndex.jsx"
import { NoteIndex } from "./apps/note/pages/NoteIndex.jsx"
import { MailDetails } from "./apps/mail/pages/MailDetails.jsx"
import {Trash} from './apps/note/pages/Trash.jsx';
import {Archive} from './apps/note/pages/Archive.jsx';
import {Reminders} from './apps/note/pages/Reminders.jsx';
import { BookIndex } from "./apps/missBooks/views/BookIndex.jsx"
import { BookDetails } from "./apps/missBooks/views/BookDetails.jsx"
import { BookEdit } from "./apps/missBooks/views/BookEdit.jsx"

export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mail" element={<MailIndex />}>
                    <Route path=":mailId" element={<MailDetails />} />
                </Route>
                <Route path="/note" element={<NoteIndex />} >
                <Route path="/note/Trash" element={<Trash />} />
                <Route path="/note/archived" element={<Archive />} />
                <Route path="/note/reminders" element={<Reminders />} />
                </Route>
                <Route path="/book" element={<BookIndex />} />
                <Route path="/book/:bookId" element={<BookDetails />} />
                <Route path="/book/edit/" element={<BookEdit />} />
                <Route path="/book/edit/:bookId" element={<BookEdit />} />
            </Routes>
        </section>
    </Router>
}
