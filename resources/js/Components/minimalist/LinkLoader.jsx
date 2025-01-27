import { Link, router } from "@inertiajs/react";
import { closeLoader, loaderExists } from "@/Components/minimalist/Loader";

export const LinkLoader = ({ children, ...props }) => {

    if(!loaderExists()) {
        return (
            <Link {...props}>
                {children}
            </Link>
        )
    }

    const handleClick = (e) => {
        e.preventDefault();
        closeLoader();
        setTimeout(() => {
            router.visit(props.href);
        }, 600);
    }

    return (
        <Link 
            {...props}
            onClick={handleClick}
        >
            {children}
        </Link>
    )
}