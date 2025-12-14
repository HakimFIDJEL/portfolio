// resources/js/pages/backoffice/educations/create.tsx

// Necessary imports
import { Head, Link, useForm } from '@inertiajs/react';

// Layout
import AppLayout from '@/layouts/app/layout';

// Shadcn UI Components
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
import type { BreadcrumbItem } from '@/types';

// Icons
import { ArrowLeft, Plus } from 'lucide-react';

export default function Create() {
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
            title: 'Create',
            href: route('backoffice.educations.create'),
        },
    ];

    const { data, setData, processing, post, errors } = useForm<{
        institution: string;
        type_fr: string;
        type_en: string;
        duration: string;
        description_fr: string;
        description_en: string;
    }>({
        institution: '',
        type_fr: '',
        type_en: '',
        duration: '',
        description_fr: '',
        description_en: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(route('backoffice.educations.store'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <Card>
                <CardHeader>
                    <CardTitle>Create an education</CardTitle>
                    <CardDescription>
                        Fill in the form below to create a new education.
                    </CardDescription>
                    <CardAction>
                        <Link href={route('backoffice.educations.index')}>
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
                            {processing ? <Spinner /> : <Plus />}
                            Store Education
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </AppLayout>
    );
}
