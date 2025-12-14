// resources/js/pages/backoffice/contacts/create.tsx

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
            title: 'Tags',
            href: route('backoffice.tags.index'),
        },
        {
            title: 'Create',
            href: route('backoffice.tags.create'),
        },
    ];

    const { data, setData, processing, post, errors } = useForm<{
        name_fr: string;
        name_en: string;
    }>({
        name_fr: '',
        name_en: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(route('backoffice.tags.store'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <Card>
                <CardHeader>
                    <CardTitle>Create a tag</CardTitle>
                    <CardDescription>
                        Fill in the form below to create a new tag.
                    </CardDescription>
                    <CardAction>
                        <Link href={route('backoffice.tags.index')}>
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
                    </CardContent>
                    <Separator className="my-4" />
                    <CardFooter>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="w-full"
                        >
                            {processing ? <Spinner /> : <Plus />}
                            Store Tag
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </AppLayout>
    );
}
