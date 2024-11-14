import { Link } from "@inertiajs/react";

export default function BigButton({children, className, link}) {
    return (
        <Link 
            className={`big-button hover__effect ${className}`}
            href={link}
            preserveScroll
        >
            {children}
        </Link>
    )
}