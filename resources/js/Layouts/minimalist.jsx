import { Link } from "@inertiajs/react"
import { useState, useEffect } from "react";



import Nav from "@/Components/Nav";

export default function Layout({children, page, isOnHome, version}) {


    return (
        <>
            <main id={page}>
                {children}
            </main>


            <Nav 
                isOnHome={isOnHome}
                version={version}
            />
        </>
    )
}