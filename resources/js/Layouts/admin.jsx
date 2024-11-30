// Needed imports
import { usePage } from "@inertiajs/react";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

// Components
import { 
    Toaster 
} from "@/components/ui/toaster";
import { 
    SidebarProvider, 
    SidebarTrigger,
    SidebarInset,
} from "@/Components/ui/sidebar";
import { 
    AppSidebar 
} from "@/Components/admin/app-sidebar";
import { 
    AppHeader 
} from "@/Components/admin/app-header";




export default function Layout({ children, breadcrumbs, errors }) {
    const props = usePage().props;
    const { toast } = useToast();

    console.log('props: ',props.errors);

    useEffect(() => {
        if (props.flash.error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: props.flash.error,
            });
        }
        if (props.flash.success) {
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
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AppHeader breadcrumbs={breadcrumbs} />

                <main className="flex-1 p-4">
                    {children}
                </main>
                <Toaster /> 
            </SidebarInset>
        </SidebarProvider>
    );
}
