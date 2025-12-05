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
                // Default styles
                'fixed top-0 right-0 left-0 z-10 mx-auto grid w-[90%] max-w-7xl',
                'transition-all delay-1000 duration-1000',

                // Responsive styles
                'px-8 py-6 lg:px-12.5 lg:py-10',
                'grid-cols-2 md:grid-cols-3',

                // Conditional styles based on showMenu state
                !showMenu && 'translate-y-[-100%] delay-0 duration-500',
            )}
        >
            <div
                className={cn(
                    // Default styles
                    'col-span-1',

                    // Responsive styles
                    'hidden md:block',
                )}
            >
                <MenuButton handleClick={handleMenuToggle} />
            </div>
            <div
                className={cn(
                    // Default styles
                    'col-span-1 text-base font-medium italic',

                    // Responsive styles
                    'text-left md:text-center',
                )}
            >
                HF
            </div>
            <div className={cn('col-span-1 text-right')}>
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
                'transition-all focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-primary',
            )}
        >
            <span className="block h-[2px] w-[45px] bg-foreground"></span>
            <span className="block h-[2px] w-[30px] bg-foreground transition-all group-hover:w-[45px] group-focus-visible:w-[45px]"></span>
        </button>
    );
}
