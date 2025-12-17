// resources/js/pages/backoffice/tools/index.tsx

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
import type { BreadcrumbItem, Tool } from '@/types';

// Icons
import { Hammer, Plus } from 'lucide-react';

interface IndexProps {
    tools: Tool[];
}

export default function Index({ tools }: IndexProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
        {
            title: 'Tools',
            href: route('backoffice.tools.index'),
        },
    ];

    function handleSort(updatedTools: Tool[]) {
        toast.loading('Sorting tools...', { id: 'sort_tools' });

        router.post(
            route('backoffice.tools.sort'),
            {
                tools: updatedTools.map((tool) => ({
                    id: tool.id,
                    sort_order: tool.sort_order,
                })),
            },
            {
                onFinish: () => {
                    toast.dismiss('sort_tools');
                },
            },
        );
    }

    function renderCells(tool: Tool) {
        return (
            <>
                <TableCell>{tool.name_fr}</TableCell>
                <TableCell>{tool.name_en}</TableCell>
                <TableCell>{tool.items.length}</TableCell>
            </>
        );
    }

    function handleRowClick(tool: Tool) {
        router.visit(route('backoffice.tools.edit', { tool: tool.id }));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tools" />

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-4 text-xl">
                        <div className="rounded-md border bg-accent p-1">
                            <Hammer className="text-primary" />
                        </div>
                        Tools
                    </CardTitle>
                    <CardAction>
                        <Link href={route('backoffice.tools.create')}>
                            <Button>
                                <Plus />
                                New tool
                            </Button>
                        </Link>
                    </CardAction>
                </CardHeader>
                <Separator />
                <CardContent>
                    <SortableTable
                        entries={tools}
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
