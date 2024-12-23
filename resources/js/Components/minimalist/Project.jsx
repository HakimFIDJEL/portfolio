import { Link } from "@inertiajs/react";

import { LinkLoader } from "@/Components/minimalist/LinkLoader";
import { Alert } from "@/Components/minimalist/Alert";

export const Project = ({title, subtitle, link, is_new}) => {
    return (
        <LinkLoader
            className="project-item"
            href={link} 
        >
            <span className="arrow-left">
                <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.222431 6L12.329 6L7.14049 0.75L7.79276 0L14.2167 6.5L7.79276 13L7.14049 12.25L12.329 7L0.222431 7V6Z" fill="#CECECE"/>
                </svg>
            </span>
            <div className="project-content">
                <div className="project-header">
                    <h3 className="project-title">
                        {title}
                    </h3>
                    {is_new == true && (
                        <Alert variant="primary">
                            New
                        </Alert>
                    )}
                </div>
                <div className="project-footer">
                    <p className="project-subtitle">
                        {subtitle}
                    </p>
                </div>
            </div>
            <span className="arrow-right">
                <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.222431 6L12.329 6L7.14049 0.75L7.79276 0L14.2167 6.5L7.79276 13L7.14049 12.25L12.329 7L0.222431 7V6Z" fill="#CECECE"/>
                </svg>
            </span>
        </LinkLoader>
    )
}