// resources/js/pages/backoffice/experiences/index.tsx

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
import type { BreadcrumbItem, Experience } from '@/types';

// Icons
import { Building2, Plus } from 'lucide-react';

interface IndexProps {
    experiences: Experience[];
}

export default function Index({ experiences }: IndexProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
        {
            title: 'Experiences',
            href: route('backoffice.experiences.index'),
        },
    ];

    function handleSort(updatedExperiences: Experience[]) {
        toast.loading('Sorting experiences...', { id: 'sort_experiences' });

        router.post(
            route('backoffice.experiences.sort'),
            {
                experiences: updatedExperiences.map((experience) => ({
                    id: experience.id,
                    sort_order: experience.sort_order,
                })),
            },
            {
                onFinish: () => {
                    toast.dismiss('sort_experiences');
                },
            },
        );
    }

    function renderCells(experience: Experience) {
        return (
            <>
                <TableCell>{experience.company}</TableCell>
                <TableCell>{experience.job}</TableCell>
                <TableCell>{experience.status}</TableCell>
                <TableCell>{experience.duration}</TableCell>
            </>
        );
    }

    function handleRowClick(experience: Experience) {
        router.visit(
            route('backoffice.experiences.edit', { experience: experience.id }),
        );
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <Card>
                <CardHeader>
                    <CardTitle className='flex items-center gap-4 text-xl'>
                        <div className='p-1 rounded-md bg-accent border'>
                            <Building2 className='text-primary'/>
                        </div>
                        Experiences
                    </CardTitle>
                    <CardAction>
                        <Link href={route('backoffice.experiences.create')}>
                            <Button>
                                <Plus />
                                New experience
                            </Button>
                        </Link>
                    </CardAction>
                </CardHeader>
                <Separator />
                <CardContent>
                    <SortableTable
                        entries={experiences}
                        columns={[
                            'Company',
                            'Job',
                            'Status',
                            'Duration',
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
