// resources/js/pages/backoffice/projects/index.tsx

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
import type { BreadcrumbItem, Project } from '@/types';

// Icons
import { Badge } from '@/components/ui/badge';
import { Hammer, Plus } from 'lucide-react';

interface IndexProps {
    projects: Project[];
}

export default function Index({ projects }: IndexProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
        {
            title: 'Projects',
            href: route('backoffice.projects.index'),
        },
    ];

    function handleSort(updatedProjects: Project[]) {
        toast.loading('Sorting projects...', { id: 'sort_projects' });

        router.post(
            route('backoffice.projects.sort'),
            {
                projects: updatedProjects.map((project) => ({
                    id: project.id,
                    sort_order: project.sort_order,
                })),
            },
            {
                onFinish: () => {
                    toast.dismiss('sort_projects');
                },
            },
        );
    }

    function renderCells(project: Project) {
        return (
            <>
                <TableCell>{project.is_new === true && <Badge>New</Badge>}</TableCell>
                <TableCell>{project.title}</TableCell>
                {/* <TableCell>{project.subtitle}</TableCell> */}
                <TableCell className='space-x-2'>
                    {(project.tags && project.tags.length > 0) ? (
                        project.tags.map((tag) => (
                            <Badge key={tag.id}>{tag.name}</Badge>
                        ))
                    ) : (
                        <Badge variant="secondary">No tags</Badge>
                    )}
                </TableCell>
                <TableCell>
                    {project.end_date ? (
                        <Badge>
                            {new Date(project.end_date).toLocaleDateString('en-EN', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </Badge>
                    ) : (
                        <Badge variant="secondary">Ongoing</Badge>
                    )}
                </TableCell>
            </>
        );
    }

    function handleRowClick(project: Project) {
        router.visit(route('backoffice.projects.edit', { project: project.id }));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Projects" />

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-4 text-xl">
                        <div className="rounded-md border bg-accent p-1">
                            <Hammer className="text-primary" />
                        </div>
                        Projects
                    </CardTitle>
                    <CardAction>
                        <Link href={route('backoffice.projects.create')}>
                            <Button>
                                <Plus />
                                New project
                            </Button>
                        </Link>
                    </CardAction>
                </CardHeader>
                <Separator />
                <CardContent>
                    <SortableTable
                        entries={projects}
                        columns={['', 'Title', 'Tags', 'End Date']}
                        handleSort={handleSort}
                        renderCells={renderCells}
                        handleRowClick={handleRowClick}
                    />
                </CardContent>
            </Card>
        </AppLayout>
    );
}
