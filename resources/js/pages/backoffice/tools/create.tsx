// resources/js/pages/backoffice/tools/create.tsx

// Necessary imports
import { Head, Link, useForm } from '@inertiajs/react';

// Layout
import AppLayout from '@/layouts/app/layout';

// Shadcn UI Components
import {
    AlertDialog,
    AlertDialogAction,
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
import type { BreadcrumbItem, ToolItem } from '@/types';

// Icons
import { SortableTable } from '@/components/sortable-table';
import { TableCell } from '@/components/ui/table';
import { ArrowLeft, Pen, Plus, Trash2 } from 'lucide-react';
import React from 'react';

export default function Create() {
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
            title: 'Create',
            href: route('backoffice.tools.create'),
        },
    ];

    const { data, setData, processing, post, errors } = useForm<{
        name_fr: string;
        name_en: string;
        items: ToolItem[];
    }>({
        name_fr: '',
        name_en: '',
        items: [],
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(route('backoffice.tools.store'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <Card>
                <CardHeader>
                    <CardTitle>Create a tool</CardTitle>
                    <CardDescription>
                        Fill in the form below to create a new tool.
                    </CardDescription>
                    <CardAction>
                        <Link href={route('backoffice.tools.index')}>
                            <Button variant={'outline'}>
                                <ArrowLeft />
                                Go back
                            </Button>
                        </Link>
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
                            {processing ? <Spinner /> : <Plus />}
                            Store Tool
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </AppLayout>
    );
}

interface ItemsProps {
    data: {
        items: ToolItem[];
    };
    setData: (field: string, value: any) => void;
}

export function Items({ data, setData }: ItemsProps) {
    const [open, setOpen] = React.useState(false);
    const [currentItem, setCurrentItem] = React.useState<ToolItem | null>(null);
    const [name, setName] = React.useState('');

    function handleSort(updatedItems: ToolItem[]) {
        setData('items', updatedItems);
    }

    function renderCells(item: ToolItem) {
        return (
            <>
                <TableCell>{item.name}</TableCell>
                <TableCell className='space-x-2'>
                    <Button variant={'secondary'} size={"icon"} onClick={(e) => handleEdit(e, item)} type='button'>
                        <Pen />
                    </Button>
                    <Button variant={'outline'} size={"icon"} onClick={(e) => handleDelete(e, item)} type='button'>
                        <Trash2 />
                    </Button>
                </TableCell>
            </>
        );
    }

    function handleRowClick(item: ToolItem) {
        setCurrentItem(item);
        setName(item.name);
        setOpen(true);
    }

    function handleEdit(e: React.MouseEvent, item: ToolItem) {
        e.stopPropagation();
        setCurrentItem(item);
        setName(item.name);
        setOpen(true);
    }

    function handleDelete(e: React.MouseEvent, item: ToolItem) {
        e.stopPropagation();
        const updatedItems = data.items.filter((i) => i.id !== item.id);
        setData('items', updatedItems);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        e.stopPropagation();

        if (currentItem) {
            // Update existing item
            const updatedItems = data.items.map((item) =>
                item.id === currentItem.id ? { ...currentItem, name } : item,
            );
            setData('items', updatedItems);
        } else {
            // Add new item
            const newItem: ToolItem = {
                id: Date.now(),
                sort_order: data.items.length,
                name: name,
            };
            setData('items', [...data.items, newItem]);
        }

        setName('');
        setCurrentItem(null);
        setOpen(false);
    }

    return (
        <div className="grid gap-8 md:grid-cols-8">
            <div className="md:col-span-2">
                <AlertDialog open={open} onOpenChange={setOpen}>
                    <AlertDialogTrigger asChild>
                        <Button className="w-full md:w-1/2">
                            <Plus />
                            Add Item
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                {currentItem ? 'Edit Item' : 'Add New Item'}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                {currentItem
                                    ? 'Edit the item details below.'
                                    : 'Fill in the form below to add a new item.'}
                            </AlertDialogDescription>
                        </AlertDialogHeader>

                        <form onSubmit={handleSubmit} className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    placeholder="Enter the item name"
                                    autoFocus
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Close</AlertDialogCancel>
                                <AlertDialogAction type="submit">
                                    {currentItem ? 'Update Item' : 'Add Item'}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </form>
                    </AlertDialogContent>
                </AlertDialog>
            </div>

            <div className="col-span-6 overflow-hidden rounded-md border">
                <SortableTable
                    entries={data.items}
                    columns={['Value', 'Actions']}
                    handleSort={handleSort}
                    renderCells={renderCells}
                    handleRowClick={handleRowClick}
                />
            </div>
        </div>
    );
}
