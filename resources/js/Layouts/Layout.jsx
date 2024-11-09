import { Link } from "@inertiajs/react"

export default function Layout({children}) {
    return (
        <>
            <header>
                {/*  */}
            </header>

            <main>
                {children}
            </main>

            <footer>
                {/*  */}
            </footer>

            <nav>
                <Link 
                    href="/"
                    preserveScroll
                >
                    Mon Switch - { new Date().toLocaleTimeString() }
                </Link>
            </nav>
        </>
    )
}