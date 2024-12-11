import { Link } from "@inertiajs/react"
import { useState, useEffect } from "react";

import { Loader, openLoader } from "@/Components/minimalist/Loader";
import { useRoute } from "ziggy";


import Nav from "@/Components/Nav";



export default function Layout({children, page, isOnHome, version}) {

    const route = useRoute();
    const [displayLoader, setDisplayLoader] = useState(true);

    if(displayLoader) {
        useEffect(() => {
            openLoader();
        }, [page]);
    }



    return (
        <>
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