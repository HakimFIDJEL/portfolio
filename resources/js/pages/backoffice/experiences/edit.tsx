// resources/js/pages/backoffice/experiences/edit.tsx

// Necessary imports
import { Head, Link, router, useForm } from '@inertiajs/react';
import { toast } from 'sonner';
import React from 'react';

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
import { Textarea } from '@/components/ui/textarea';

// Types
import type { BreadcrumbItem, Experience } from '@/types';

// Icons
import { ArrowLeft, Pen, Trash2 } from 'lucide-react';

interface EditProps {
    experience: Experience;
}

export default function Edit({ experience }: EditProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
        {
            title: 'Experiences',
            href: route('backoffice.experiences.index'),
        },
        {
            title: 'Edit',
            href: route('backoffice.experiences.edit', experience.id),
        },
    ];

    const { data, setData, processing, put, errors } = useForm<{
        company: string;
        job_fr: string;
        job_en: string;
        status_fr: string;
        status_en: string;
        duration: string;
        description_fr: string;
        description_en: string;
    }>({
        company: experience.company,
        job_fr: experience.job_fr,
        job_en: experience.job_en,
        status_fr: experience.status_fr,
        status_en: experience.status_en,
        duration: experience.duration,
        description_fr: experience.description_fr,
        description_en: experience.description_en,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(route('backoffice.experiences.update', experience.id));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <Card>
                <CardHeader>
                    <CardTitle>Edit an experience</CardTitle>
                    <CardDescription>
                        Update the form below to edit the experience.
                    </CardDescription>
                    <CardAction className="space-x-2">
                        <Link href={route('backoffice.experiences.index')}>
                            <Button variant={'outline'}>
                                <ArrowLeft />
                                Go back
                            </Button>
                        </Link>
                        <DeleteExperience experience={experience}>
                            <Button variant="destructive">
                                <Trash2 />
                                Delete experience
                            </Button>
                        </DeleteExperience>
                    </CardAction>
                </CardHeader>
                <Separator />
                <form onSubmit={handleSubmit} className="grid gap-4">
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <h3 className="text-lg font-medium">
                                Default Fields
                            </h3>
                            <Separator />
                        </div>

                        <div className="grid gap-3 md:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="company">Company</Label>
                                <Input
                                    id="company"
                                    value={data.company || ''}
                                    placeholder="Enter a company"
                                    onChange={(e) =>
                                        setData('company', e.target.value)
                                    }
                                    aria-invalid={
                                        errors.company ? 'true' : 'false'
                                    }
                                    disabled={processing}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="duration">Duration</Label>
                                <Input
                                    id="duration"
                                    value={data.duration || ''}
                                    placeholder="Enter a duration"
                                    onChange={(e) =>
                                        setData('duration', e.target.value)
                                    }
                                    aria-invalid={
                                        errors.duration ? 'true' : 'false'
                                    }
                                    disabled={processing}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <h3 className="text-lg font-medium">
                                Localized Fields
                            </h3>
                            <Separator />
                        </div>

                        <div className="grid gap-3 md:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="job_en">Job (EN)</Label>
                                <Input
                                    id="job_en"
                                    value={data.job_en || ''}
                                    placeholder="Enter a job (EN)"
                                    onChange={(e) =>
                                        setData('job_en', e.target.value)
                                    }
                                    aria-invalid={
                                        errors.job_en ? 'true' : 'false'
                                    }
                                    disabled={processing}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="job_fr">Job (FR)</Label>
                                <Input
                                    id="job_fr"
                                    value={data.job_fr || ''}
                                    placeholder="Enter a job (FR)"
                                    onChange={(e) =>
                                        setData('job_fr', e.target.value)
                                    }
                                    aria-invalid={
                                        errors.job_fr ? 'true' : 'false'
                                    }
                                    disabled={processing}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="status_en">Status (EN)</Label>
                                <Input
                                    id="status_en"
                                    value={data.status_en || ''}
                                    placeholder="Enter a status (EN)"
                                    onChange={(e) =>
                                        setData('status_en', e.target.value)
                                    }
                                    aria-invalid={
                                        errors.status_en ? 'true' : 'false'
                                    }
                                    disabled={processing}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="status_fr">Status (FR)</Label>
                                <Input
                                    id="status_fr"
                                    value={data.status_fr || ''}
                                    placeholder="Enter a status (FR)"
                                    onChange={(e) =>
                                        setData('status_fr', e.target.value)
                                    }
                                    aria-invalid={
                                        errors.status_fr ? 'true' : 'false'
                                    }
                                    disabled={processing}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="description_en">Description (EN)</Label>
                                <Textarea
                                    id="description_en"
                                    value={data.description_en || ''}
                                    placeholder="Enter a description (EN)"
                                    onChange={(e) =>
                                        setData('description_en', e.target.value)
                                    }
                                    aria-invalid={
                                        errors.description_en ? 'true' : 'false'
                                    }
                                    disabled={processing}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="description_fr">Description (FR)</Label>
                                <Textarea
                                    id="description_fr"
                                    value={data.description_fr || ''}
                                    placeholder="Enter a description (FR)"
                                    onChange={(e) =>
                                        setData('description_fr', e.target.value)
                                    }
                                    aria-invalid={
                                        errors.description_fr ? 'true' : 'false'
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
                            Update Experience
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </AppLayout>
    );
}

interface DeleteExperienceProps {
    children: React.ReactNode;
    experience: Experience;
}

function DeleteExperience({ children, experience }: DeleteExperienceProps) {

    const [deleting, setDeleting] = React.useState(false);

    function handleDelete() {
        toast.loading('Deleting experience...', { id: 'delete_experience' });
        setDeleting(true);
        router.delete(route('backoffice.experiences.destroy', experience.id), {
            onFinish: () => {
                setDeleting(false);
            }
        });
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Experience</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete this experience? This
                        action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
                    <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
                        {deleting ? <Spinner /> : <Trash2 />}
                        Delete
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
