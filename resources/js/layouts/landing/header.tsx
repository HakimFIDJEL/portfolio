// resources/js/layouts/landing/header.tsx

// Necessary imports
import { cn } from '@/lib/utils';

// Components
import UnderlineLink from '@/components/landing/underline-link';

interface HeaderProps {
    showMenu: boolean;
    handleMenuToggle: (open: boolean) => void;
}

export default function Header({ showMenu, handleMenuToggle }: HeaderProps) {
    return (
        <header
            className={cn(
                'fixed top-0 right-0 left-0 z-10 mx-auto w-[90%] max-w-7xl',
                'grid grid-cols-3 px-12.5 py-10',
                'transition-all delay-300 duration-1000',
                !showMenu && 'translate-y-[-100%] delay-0 duration-500',
            )}
        >
            <div className="col-span-1">
                <MenuButton handleClick={handleMenuToggle} />
            </div>
            <div className="col-span-1 text-center text-base font-medium italic">
                HF
            </div>
            <div className="col-span-1 text-right">
                <UnderlineLink href="#">Contact</UnderlineLink>
            </div>
        </header>
    );
}

interface MenuButtonProps {
    handleClick: (open: boolean) => void;
}
function MenuButton({ handleClick }: MenuButtonProps) {
    return (
        <button
            onClick={() => handleClick(true)}
            className={cn(
                'group flex h-full cursor-pointer flex-col justify-center gap-[8px]',
                'focus:outline-primary focus:outline-2 focus:outline-offset-8 transition-all'
            )}
        >
            <span className="block h-[2px] w-[45px] bg-foreground"></span>
            <span className="block h-[2px] w-[30px] bg-foreground transition-all group-hover:w-[45px] group-focus:w-[45px]"></span>
        </button>
    );
}
