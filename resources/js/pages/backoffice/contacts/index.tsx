// resources/js/pages/backoffice/contacts/index.tsx

// Necessary imports
import { getIcon } from '@/lib/render';
import { Head, Link, router } from '@inertiajs/react';
import { toast } from 'sonner';

// Layout
import AppLayout from '@/layouts/app/layout';

// Shadcn UI Components
import { SortableTable } from '@/components/sortable-table';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TableCell } from '@/components/ui/table';

// Types
import type { BreadcrumbItem, Contact } from '@/types';

// Icons
import { Mail, Plus } from 'lucide-react';

interface IndexProps {
    contacts: Contact[];
}

export default function Index({ contacts }: IndexProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
        {
            title: 'Contacts',
            href: route('backoffice.contacts.index'),
        },
    ];

    function handleSort(updatedContacts: Contact[]) {
        toast.loading('Sorting contacts...', { id: 'sort_contacts' });

        router.post(
            route('backoffice.contacts.sort'),
            {
                contacts: updatedContacts.map((contact) => ({
                    id: contact.id,
                    sort_order: contact.sort_order,
                })),
            },
            {
                onFinish: () => {
                    toast.dismiss('sort_contacts');
                },
            },
        );
    }

    function renderCells(contact: Contact) {
        return (
            <>
                <TableCell>
                    {getIcon(contact.icon, { className: 'h-5 w-5' })}
                </TableCell>
                <TableCell>{contact.label}</TableCell>
                <TableCell>{contact.link}</TableCell>
                <TableCell>{contact.name}</TableCell>
            </>
        );
    }

    function handleRowClick(contact: Contact) {
        router.visit(
            route('backoffice.contacts.edit', { contact: contact.id }),
        );
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <Card>
                <CardHeader >
                    <CardTitle className='flex items-center gap-4 text-xl'>
                        <div className='p-1 rounded-md bg-accent border'>
                            <Mail className='text-primary'/>
                        </div>
                        Contact
                    </CardTitle>
                    <CardAction>
                        <Link href={route('backoffice.contacts.create')}>
                            <Button>
                                <Plus />
                                New contact
                            </Button>
                        </Link>
                    </CardAction>
                </CardHeader>
                <Separator />
                <CardContent>
                    <SortableTable
                        entries={contacts}
                        columns={[
                            'Icon',
                            'Label',
                            'Link',
                            'Value',
                        ]}
                        handleSort={handleSort}
                        renderCells={renderCells}
                        handleRowClick={handleRowClick}
                    />
                </CardContent>
            </Card>
        </AppLayout>
    );
}
