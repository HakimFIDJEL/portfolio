import { Link } from "@inertiajs/react"
import '../../scss/minimalist.scss'; 

import Nav from "@/Components/Nav";

export default function Layout({children, page, isOnHome}) {
    return (
        <>
            <main id={page}>
                {children}
            </main>

            <footer>
                {/*  */}
            </footer>


            <Nav 
                isOnHome={isOnHome}
            />
        </>
    )
}