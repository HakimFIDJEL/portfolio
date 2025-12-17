// resources/js/pages/backoffice/tags/index.tsx

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
import type { BreadcrumbItem, Tag } from '@/types';

// Icons
import { Plus, Tag as TagIcon } from 'lucide-react';

interface IndexProps {
    tags: Tag[];
}

export default function Index({ tags }: IndexProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
        {
            title: 'Tags',
            href: route('backoffice.tags.index'),
        },
    ];

    function handleSort(updatedTags: Tag[]) {
        toast.loading('Sorting tags...', { id: 'sort_tags' });

        router.post(
            route('backoffice.tags.sort'),
            {
                tags: updatedTags.map((tag) => ({
                    id: tag.id,
                    sort_order: tag.sort_order,
                })),
            },
            {
                onFinish: () => {
                    toast.dismiss('sort_tags');
                },
            },
        );
    }

    function renderCells(tag: Tag) {
        return (
            <>
                <TableCell>{tag.name_fr}</TableCell>
                <TableCell>{tag.name_en}</TableCell>
            </>
        );
    }

    function handleRowClick(tag: Tag) {
        router.visit(route('backoffice.tags.edit', { tag: tag.id }));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tags" />

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-4 text-xl">
                        <div className="rounded-md border bg-accent p-1">
                            <TagIcon className="text-primary" />
                        </div>
                        Tags
                    </CardTitle>
                    <CardAction>
                        <Link href={route('backoffice.tags.create')}>
                            <Button>
                                <Plus />
                                New tag
                            </Button>
                        </Link>
                    </CardAction>
                </CardHeader>
                <Separator />
                <CardContent>
                    <SortableTable
                        entries={tags}
                        columns={['Value (FR)', 'Value (EN)']}
                        handleSort={handleSort}
                        renderCells={renderCells}
                        handleRowClick={handleRowClick}
                    />
                </CardContent>
            </Card>
        </AppLayout>
    );
}
