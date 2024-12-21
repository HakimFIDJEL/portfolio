
import { usePage } from '@inertiajs/react';
import { Toaster } from "@/Components/ui/toaster"
import { useToast } from "@/hooks/use-toast"

import { useEffect } from 'react';



export default function Layout({children}) {


    const props = usePage().props;
    const { toast } = useToast();

    console.log('flash', props.flash);

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


    useEffect(() => {
        Object.entries(props.errors).forEach(([field, messages]) => {
            messages.forEach((message) => {
                toast({
                    variant: "destructive",
                    title: `Uh oh! Something went wrong.`,
                    description: message,
                });
            });
        });
    }, [props.errors]);


    return (
        <>
            <main>
                {children}
            </main>
            <Toaster />
        </>
    )
}