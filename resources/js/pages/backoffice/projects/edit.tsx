// resources/js/pages/backoffice/tools/edit.tsx

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
import type { BreadcrumbItem, Tool, ToolItem } from '@/types';

// Icons
import { ArrowLeft, Pen, Trash2 } from 'lucide-react';

interface EditProps {
    tool: Tool;
}

export default function Edit({ tool }: EditProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
        {
            title: 'Tools',
            href: route('backoffice.tools.index'),
        },
        {
            title: 'Edit',
            href: route('backoffice.tools.edit', tool.id),
        },
    ];

    const { data, setData, processing, put, errors } = useForm<{
        name_fr: string;
        name_en: string;
        items: ToolItem[];
    }>({
        name_fr: tool.name_fr,
        name_en: tool.name_en,
        items: tool.items,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(route('backoffice.tools.update', tool.id));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <Card>
                <CardHeader>
                    <CardTitle>Edit a tool</CardTitle>
                    <CardDescription>
                        Update the form below to edit the tool.
                    </CardDescription>
                    <CardAction className="space-x-2">
                        <Link href={route('backoffice.tools.index')}>
                            <Button variant={'outline'}>
                                <ArrowLeft />
                                Go back
                            </Button>
                        </Link>
                        <DeleteTool tool={tool}>
                            <Button variant="destructive">
                                <Trash2 />
                                Delete tool
                            </Button>
                        </DeleteTool>
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
                            Update Tool
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </AppLayout>
    );
}

interface DeleteToolProps {
    children: React.ReactNode;
    tool: Tool;
}

function DeleteTool({ children, tool }: DeleteToolProps) {
    const [deleting, setDeleting] = React.useState(false);

    function handleDelete() {
        setDeleting(true);
        toast.loading('Deleting tool...', { id: 'delete_tool' });
        router.delete(route('backoffice.tools.destroy', tool.id), {
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
                    <AlertDialogTitle>Delete Tool</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete this tool? This action
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
