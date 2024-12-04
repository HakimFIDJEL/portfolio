import { Link } from "@inertiajs/react";

export const BigButton = ({children, className, link, ...props}) => {
    return (
        <a 
            className={`big-button hover__effect ${className}`}
            href={link}
            {...props}
        >
            {children}
        </a>
    )
}