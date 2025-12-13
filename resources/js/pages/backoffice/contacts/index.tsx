// resources/js/pages/backoffice/contacts/index.tsx

// Necessary imports
import { Head } from "@inertiajs/react";

// Layout
import AppLayout from "@/layouts/app/layout";

// Types
import type { BreadcrumbItem, Contact } from "@/types";


interface IndexProps {
    contacts: Contact[];
}

export default function Index({ contacts } : IndexProps) {
     const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
        {
            title: 'Contacts',
            href: route('backoffice.contacts.index'),
        }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            
        </AppLayout>
    );
}