// resources/js/pages/backoffice/educations/edit.tsx

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
import { IconName, IconPicker } from '@/components/ui/icon-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';

// Types
import type { BreadcrumbItem, Contact, Education, Experience } from '@/types';

// Icons
import { ArrowLeft, Pen, Trash2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';

interface EditProps {
    education: Education;
}

export default function Edit({ education }: EditProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
        {
            title: 'Educations',
            href: route('backoffice.educations.index'),
        },
        {
            title: 'Edit',
            href: route('backoffice.educations.edit', education.id),
        },
    ];

    const { data, setData, processing, put, errors } = useForm<{
        institution: string;
        type_fr: string;
        type_en: string;
        duration: string;
        description_fr: string;
        description_en: string;
    }>({
        institution: education.institution,
        type_fr: education.type_fr,
        type_en: education.type_en,
        duration: education.duration,
        description_fr: education.description_fr,
        description_en: education.description_en,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(route('backoffice.educations.update', education.id));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <Card>
                <CardHeader>
                    <CardTitle>Edit an education</CardTitle>
                    <CardDescription>
                        Update the form below to edit the education.
                    </CardDescription>
                    <CardAction className="space-x-2">
                        <Link href={route('backoffice.educations.index')}>
                            <Button variant={'outline'}>
                                <ArrowLeft />
                                Go back
                            </Button>
                        </Link>
                        <DeleteEducation education={education}>
                            <Button variant="destructive">
                                <Trash2 />
                                Delete education
                            </Button>
                        </DeleteEducation>
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
                                <Label htmlFor="institution">Institution</Label>
                                <Input
                                    id="institution"
                                    value={data.institution || ''}
                                    placeholder="Enter an institution"
                                    onChange={(e) =>
                                        setData('institution', e.target.value)
                                    }
                                    aria-invalid={
                                        errors.institution ? 'true' : 'false'
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
                                <Label htmlFor="type_en">Type (EN)</Label>
                                <Input
                                    id="type_en"
                                    value={data.type_en || ''}
                                    placeholder="Enter a type (EN)"
                                    onChange={(e) =>
                                        setData('type_en', e.target.value)
                                    }
                                    aria-invalid={
                                        errors.type_en ? 'true' : 'false'
                                    }
                                    disabled={processing}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="type_fr">Type (FR)</Label>
                                <Input
                                    id="type_fr"
                                    value={data.type_fr || ''}
                                    placeholder="Enter a type (FR)"
                                    onChange={(e) =>
                                        setData('type_fr', e.target.value)
                                    }
                                    aria-invalid={
                                        errors.type_fr ? 'true' : 'false'
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
                            Update Education
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </AppLayout>
    );
}

interface DeleteEducationProps {
    children: React.ReactNode;
    education: Education;
}

function DeleteEducation({ children, education }: DeleteEducationProps) {

    const [deleting, setDeleting] = React.useState(false);

    function handleDelete() {
        toast.loading('Deleting education...', { id: 'delete_education' });
        setDeleting(true);
        router.delete(route('backoffice.educations.destroy', education.id), {
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
                    <AlertDialogTitle>Delete Education</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete this education? This
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
