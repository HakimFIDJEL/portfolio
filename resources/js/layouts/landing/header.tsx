// resources/js/layouts/landing/header.tsx

import UnderlineLink from "@/components/landing/underline-link";

export default function Header() {
    return (
        <header className="grid grid-cols-3 px-12.5 py-10">
            <div className="col-span-1">
                Menu
            </div>
            <div className="col-span-1 text-center text-base italic font-medium">
                HF
            </div>
            <div className="col-span-1 text-right">
                <UnderlineLink href="#">
                    Contact
                </UnderlineLink>
            </div>
        </header>
    )
}