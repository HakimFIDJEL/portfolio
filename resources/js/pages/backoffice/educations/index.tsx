// resources/js/pages/backoffice/educations/index.tsx

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
import type { BreadcrumbItem, Education } from '@/types';

// Icons
import { Plus, School } from 'lucide-react';

interface IndexProps {
    educations: Education[];
}

export default function Index({ educations }: IndexProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
        {
            title: 'Educations',
            href: route('backoffice.educations.index'),
        },
    ];

    function handleSort(updatedEducations: Education[]) {
        toast.loading('Sorting educations...', { id: 'sort_educations' });

        router.post(
            route('backoffice.educations.sort'),
            {
                educations: updatedEducations.map((education) => ({
                    id: education.id,
                    sort_order: education.sort_order,
                })),
            },
            {
                onFinish: () => {
                    toast.dismiss('sort_educations');
                },
            },
        );
    }

    function renderCells(education: Education) {
        return (
            <>
                <TableCell>{education.institution}</TableCell>
                <TableCell>{education.type}</TableCell>
                <TableCell>{education.duration}</TableCell>
            </>
        );
    }

    function handleRowClick(education: Education) {
        router.visit(
            route('backoffice.educations.edit', { education: education.id }),
        );
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <Card>
                <CardHeader>
                    <CardTitle className='flex items-center gap-4 text-xl'>
                        <div className='p-1 rounded-md bg-accent border'>
                            <School className='text-primary'/>
                        </div>
                        Education
                    </CardTitle>
                    <CardAction>
                        <Link href={route('backoffice.educations.create')}>
                            <Button>
                                <Plus />
                                New education
                            </Button>
                        </Link>
                    </CardAction>
                </CardHeader>
                <Separator />
                <CardContent>
                    <SortableTable
                        entries={educations}
                        columns={[
                            'Institution',
                            'Type',
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
