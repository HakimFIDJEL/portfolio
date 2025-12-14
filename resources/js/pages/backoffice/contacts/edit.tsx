// resources/js/pages/backoffice/contacts/edit.tsx

// Necessary imports
import { Head, Link, router, useForm } from '@inertiajs/react';
import { toast } from 'sonner';

// Layout
import AppLayout from '@/layouts/app/layout';

// Shadcn UI Components
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { IconName, IconPicker } from '@/components/ui/icon-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';

// Types
import type { BreadcrumbItem, Contact } from '@/types';

// Icons
import { ArrowLeft, Pen, Trash2 } from 'lucide-react';
import React from 'react';

interface EditProps {
    contact: Contact;
}

export default function Edit({ contact }: EditProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
        {
            title: 'Contacts',
            href: route('backoffice.contacts.index'),
        },
        {
            title: 'Edit',
            href: route('backoffice.contacts.edit', contact.id),
        },
    ];

    const { data, setData, processing, put, errors } = useForm<{
        label: string;
        link: string;
        icon: string;
        name_fr: string;
        name_en: string;
    }>({
        label: contact.label,
        link: contact.link,
        icon: contact.icon,
        name_fr: contact.name_fr,
        name_en: contact.name_en,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(route('backoffice.contacts.update', contact.id));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <Card>
                <CardHeader className='flex flex-col md:items-center justify-between md:flex-row'>
                    <div className='flex flex-col'>
                        <CardTitle>Edit a contact</CardTitle>
                        <CardDescription>
                            Update the form below to edit the contact.
                        </CardDescription>
                    </div>
                    <CardAction className="flex flex-col md:items-center justify-between md:flex-row gap-2 w-full md:w-auto">
                        <Link href={route('backoffice.contacts.index')}>
                            <Button variant={'outline'} className="w-full md:w-auto">
                                <ArrowLeft />
                                Go back
                            </Button>
                        </Link>
                        <DeleteContact contact={contact}>
                            <Button variant="destructive" className="w-full md:w-auto">
                                <Trash2 />
                                Delete contact
                            </Button>
                        </DeleteContact>
                    </CardAction>
                </CardHeader>
                <Separator />
                <form onSubmit={handleSubmit} className="grid gap-4">
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <h3 className="text-lg font-medium">
                                Default Fields
                            </h3>
                            <Separator />
                        </div>

                        <div className="grid gap-3 md:grid-cols-3">
                            <div className="grid gap-2">
                                <Label htmlFor="label">Label</Label>
                                <Input
                                    id="label"
                                    value={data.label || ''}
                                    placeholder="Enter a label"
                                    onChange={(e) =>
                                        setData('label', e.target.value)
                                    }
                                    aria-invalid={
                                        errors.label ? 'true' : 'false'
                                    }
                                    disabled={processing}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="link">Link</Label>
                                <Input
                                    id="link"
                                    value={data.link || ''}
                                    placeholder="Enter a link"
                                    onChange={(e) =>
                                        setData('link', e.target.value)
                                    }
                                    aria-invalid={
                                        errors.link ? 'true' : 'false'
                                    }
                                    disabled={processing}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="icon">Icon</Label>
                                <IconPicker
                                    id="icon"
                                    value={(data.icon as IconName) || ''}
                                    onValueChange={(value) =>
                                        setData('icon', value as string)
                                    }
                                    disabled={processing}
                                    categorized={false}
                                    aria-required="true"
                                />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <h3 className="text-lg font-medium">
                                Localized Fields
                            </h3>
                            <Separator />
                        </div>

                        <div className="grid gap-3 md:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="name_en">Value (EN)</Label>
                                <Input
                                    id="name_en"
                                    value={data.name_en || ''}
                                    placeholder="Enter a value (EN)"
                                    onChange={(e) =>
                                        setData('name_en', e.target.value)
                                    }
                                    aria-invalid={
                                        errors.name_en ? 'true' : 'false'
                                    }
                                    disabled={processing}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="name_fr">Value (FR)</Label>
                                <Input
                                    id="name_fr"
                                    value={data.name_fr || ''}
                                    placeholder="Enter a value (FR)"
                                    onChange={(e) =>
                                        setData('name_fr', e.target.value)
                                    }
                                    aria-invalid={
                                        errors.name_fr ? 'true' : 'false'
                                    }
                                    disabled={processing}
                                    required
                                />
                            </div>
                        </div>
                    </CardContent>
                    <Separator className="my-4" />
                    <CardFooter>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="w-full"
                        >
                            {processing ? <Spinner /> : <Pen />}
                            Update Contact
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </AppLayout>
    );
}

interface DeleteContactProps {
    children: React.ReactNode;
    contact: Contact;
}

function DeleteContact({ children, contact }: DeleteContactProps) {

    const [deleting, setDeleting] = React.useState(false);

    function handleDelete() {
        setDeleting(true);
        toast.loading('Deleting contact...', { id: 'delete_contact' });
        router.delete(route('backoffice.contacts.destroy', contact.id), {
            onFinish: () => {
                setDeleting(false);
            }
        });
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Contact</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete this contact? This
                        action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
                    <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
                        {deleting ? <Spinner /> : <Trash2 />}
                        Delete
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
