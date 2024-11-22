import { Link } from "@inertiajs/react";

export const BigButton = ({children, className, link, ...props}) => {
    return (
        <Link 
            className={`big-button hover__effect ${className}`}
            href={link}
            preserveScroll
            {...props}
        >
            {children}
        </Link>
    )
}