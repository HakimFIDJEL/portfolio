// resources/js/pages/backoffice/stacks/index.tsx

// Necessary imports
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
import type { BreadcrumbItem, Stack } from '@/types';

// Icons
import { Layers, Plus } from 'lucide-react';

interface IndexProps {
    stacks: Stack[];
}

export default function Index({ stacks }: IndexProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
        {
            title: 'Stacks',
            href: route('backoffice.stacks.index'),
        },
    ];

    function handleSort(updatedStacks: Stack[]) {
        toast.loading('Sorting stacks...', { id: 'sort_stacks' });

        router.post(
            route('backoffice.stacks.sort'),
            {
                stacks: updatedStacks.map((stack) => ({
                    id: stack.id,
                    sort_order: stack.sort_order,
                })),
            },
            {
                onFinish: () => {
                    toast.dismiss('sort_stacks');
                },
            },
        );
    }

    function renderCells(stack: Stack) {
        return (
            <>
                <TableCell>{stack.name_fr}</TableCell>
                <TableCell>{stack.name_en}</TableCell>
                <TableCell>{stack.items.length}</TableCell>
            </>
        );
    }

    function handleRowClick(stack: Stack) {
        router.visit(route('backoffice.stacks.edit', { stack: stack.id }));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Stacks" />

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-4 text-xl">
                        <div className="rounded-md border bg-accent p-1">
                            <Layers className="text-primary" />
                        </div>
                        Stacks
                    </CardTitle>
                    <CardAction>
                        <Link href={route('backoffice.stacks.create')}>
                            <Button>
                                <Plus />
                                New stack
                            </Button>
                        </Link>
                    </CardAction>
                </CardHeader>
                <Separator />
                <CardContent>
                    <SortableTable
                        entries={stacks}
                        columns={['Value (FR)', 'Value (EN)', 'Items']}
                        handleSort={handleSort}
                        renderCells={renderCells}
                        handleRowClick={handleRowClick}
                    />
                </CardContent>
            </Card>
        </AppLayout>
    );
}
