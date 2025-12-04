// resources/js/layouts/landing/header.tsx

import UnderlineLink from "@/components/landing/underline-link";
import { Button } from "@/components/ui/button";

interface HeaderProps {
    handleMenuToggle: (open: true) => void;
}

export default function Header({ handleMenuToggle } : HeaderProps) {
    return (
        <header className="grid grid-cols-3 px-12.5 py-10">
            <div className="col-span-1" >
                <Button variant="ghost" onClick={() => handleMenuToggle(true)} className="p-0 h-auto hover:!bg-transparent">
                    Menu
                </Button>
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