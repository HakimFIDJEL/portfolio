import { usePage } from '@inertiajs/react';
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"

import { useEffect } from 'react';



export default function Layout({children}) {

    const props = usePage().props;
    const { toast } = useToast();

    useEffect(() => {
        if(props.flash.error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: props.flash.error,
            });
        }
        if(props.flash.success) {
            toast({
                title: "Success!",
                description: props.flash.success,
            });
        }
    }, [props.flash]);

    return (
        <>
            <main>
                {children}
            </main>
            <Toaster />
        </>
    )
}