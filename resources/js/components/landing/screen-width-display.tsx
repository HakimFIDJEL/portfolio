import { cn } from "@/lib/utils";

export default function ScreenWidthDisplay() {
    return (
        <div className={cn(
            // Default styles
            'fixed bottom-4 left-1/2 z-99999 -translate-x-1/2 w-[200px] h-8 rounded-md border',

            // Responsive styles
            'bg-red-400 sm:bg-green-400 md:bg-blue-400 lg:bg-black',
        )}>

        </div>
    )
}