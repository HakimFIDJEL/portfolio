// resources/js/pages/backoffice/stacks/edit.tsx

// Necessary imports
import { Head, Link, router, useForm } from '@inertiajs/react';
import React from 'react';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';

// Components
import { Items } from './create';

// Types
import type { BreadcrumbItem, Stack, StackItem } from '@/types';

// Icons
import { ArrowLeft, Pen, Trash2 } from 'lucide-react';

interface EditProps {
    stack: Stack;
}

export default function Edit({ stack }: EditProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
        {
            title: 'Stacks',
            href: route('backoffice.stacks.index'),
        },
        {
            title: 'Edit',
            href: route('backoffice.stacks.edit', stack.id),
        },
    ];

    const { data, setData, processing, put, errors } = useForm<{
        name_fr: string;
        name_en: string;
        items: StackItem[];
    }>({
        name_fr: stack.name_fr,
        name_en: stack.name_en,
        items: stack.items,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(route('backoffice.stacks.update', stack.id));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Stack" />

            <Card>
                <CardHeader className='flex flex-col md:items-center justify-between md:flex-row'>
                    <div className='flex flex-col'>
                        <CardTitle>Edit a stack</CardTitle>
                        <CardDescription>
                            Update the form below to edit the stack.
                        </CardDescription>
                    </div>
                    <CardAction className="flex flex-col md:items-center justify-between md:flex-row gap-2 w-full md:w-auto">
                        <Link href={route('backoffice.stacks.index')}>
                            <Button variant={'outline'} className="w-full md:w-auto">
                                <ArrowLeft />
                                Go back
                            </Button>
                        </Link>
                        <DeleteStack stack={stack}>
                            <Button variant="destructive" className="w-full md:w-auto">
                                <Trash2 />
                                Delete stack
                            </Button>
                        </DeleteStack>
                    </CardAction>
                </CardHeader>
                <Separator />
                <form onSubmit={handleSubmit} className="grid gap-4">
                    <CardContent className="grid gap-4">
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

                        <div className="grid gap-2">
                            <h3 className="text-lg font-medium">Items</h3>
                            <Separator />
                        </div>

                        <Items data={{ items: data.items }} setData={setData} />
                    </CardContent>
                    <Separator className="my-4" />
                    <CardFooter>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="w-full"
                        >
                            {processing ? <Spinner /> : <Pen />}
                            Update Stack
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </AppLayout>
    );
}

interface DeleteStackProps {
    children: React.ReactNode;
    stack: Stack;
}

function DeleteStack({ children, stack }: DeleteStackProps) {
    const [deleting, setDeleting] = React.useState(false);

    function handleDelete() {
        setDeleting(true);
        toast.loading('Deleting stack...', { id: 'delete_stack' });
        router.delete(route('backoffice.stacks.destroy', stack.id), {
            onFinish: () => {
                setDeleting(false);
            },
        });
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Stack</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete this stack? This action
                        cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={deleting}>
                        Cancel
                    </AlertDialogCancel>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={deleting}
                    >
                        {deleting ? <Spinner /> : <Trash2 />}
                        Delete
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
