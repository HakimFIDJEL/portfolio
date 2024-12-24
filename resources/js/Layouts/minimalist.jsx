import { Link, Head } from "@inertiajs/react"
import { useState, useEffect } from "react";

import { Loader, openLoader } from "@/Components/minimalist/Loader";
import { useRoute } from "ziggy";


import Nav from "@/Components/Nav";



export default function Layout({children, page, isOnHome, version, title, description}) {

    const route = useRoute();
    const [displayLoader, setDisplayLoader] = useState(true);

    if(displayLoader) {
        useEffect(() => {
            openLoader();
        }, [page]);
    }




    return (
        <>

            <Head>
                <title>{title}</title>
                <meta name="description" content={description ?? "Hakim's portfolio (mine), a FullStack engineering apprentice. Discover my projects, skills, and ambitions across the diverse fields of computer engineering."} />
            </Head>

            <main id={page}>
                {children}
            </main>


            <Nav 
                isOnHome={isOnHome}
                version={version}
            />

            <Loader 
                display={displayLoader}
            />
        </>
    )
}