// resources/js/pages/backoffice/tags/edit.tsx

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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';

// Types
import type { BreadcrumbItem, Tag } from '@/types';

// Icons
import { ArrowLeft, Pen, Trash2 } from 'lucide-react';
import React from 'react';

interface EditProps {
    tag: Tag;
}

export default function Edit({ tag }: EditProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
        {
            title: 'Tags',
            href: route('backoffice.tags.index'),
        },
        {
            title: 'Edit',
            href: route('backoffice.tags.edit', tag.id),
        },
    ];

    const { data, setData, processing, put, errors } = useForm<{
        name_fr: string;
        name_en: string;
    }>({
        name_fr: tag.name_fr,
        name_en: tag.name_en,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(route('backoffice.tags.update', tag.id));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <Card>
                <CardHeader className='flex flex-col md:items-center justify-between md:flex-row'>
                    <div className="flex flex-col">
                        <CardTitle>Edit a tag</CardTitle>
                        <CardDescription>
                            Update the form below to edit the tag.
                        </CardDescription>
                    </div>
                    <CardAction className="flex flex-col md:items-center justify-between md:flex-row gap-2 w-full md:w-auto">
                        <Link href={route('backoffice.tags.index')}>
                            <Button variant={'outline'} className="w-full md:w-auto">
                                <ArrowLeft />
                                Go back
                            </Button>
                        </Link>
                        <DeleteTag tag={tag}>
                            <Button variant="destructive" className="w-full md:w-auto">
                                <Trash2 />
                                Delete tag
                            </Button>
                        </DeleteTag>
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
                    </CardContent>
                    <Separator className="my-4" />
                    <CardFooter>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="w-full"
                        >
                            {processing ? <Spinner /> : <Pen />}
                            Update Tag
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </AppLayout>
    );
}

interface DeleteTagProps {
    children: React.ReactNode;
    tag: Tag;
}

function DeleteTag({ children, tag }: DeleteTagProps) {
    const [deleting, setDeleting] = React.useState(false);

    function handleDelete() {
        setDeleting(true);
        toast.loading('Deleting tag...', { id: 'delete_tag' });
        router.delete(route('backoffice.tags.destroy', tag.id), {
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
                    <AlertDialogTitle>Delete Tag</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete this tag? This action
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
