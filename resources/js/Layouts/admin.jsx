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




export default function Layout({ children, breadcrumbs }) {
    const props = usePage().props;
    const { toast } = useToast();

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
