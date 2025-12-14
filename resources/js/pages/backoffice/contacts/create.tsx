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
import { IconName, IconPicker } from '@/components/ui/icon-picker';
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
            title: 'Contacts',
            href: route('backoffice.contacts.index'),
        },
        {
            title: 'Create',
            href: route('backoffice.contacts.create'),
        },
    ];

    const { data, setData, processing, post, errors } = useForm<{
        label: string;
        link: string;
        icon: string;
        name_fr: string;
        name_en: string;
    }>({
        label: '',
        link: '',
        icon: '',
        name_fr: '',
        name_en: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(route('backoffice.contacts.store'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <Card>
                <CardHeader className='flex flex-col md:items-center justify-between md:flex-row'>
                    <div className='flex flex-col'>
                        <CardTitle>Create a contact</CardTitle>
                        <CardDescription>
                            Fill in the form below to create a new contact.
                        </CardDescription>
                    </div>
                    <CardAction className="flex flex-col md:items-center justify-between md:flex-row gap-2 w-full md:w-auto">
                        <Link href={route('backoffice.contacts.index')}>
                            <Button variant={'outline'} className='w-full md:w-auto'>
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

                        <div className="grid gap-3 md:grid-cols-3">
                            <div className="grid gap-2">
                                <Label htmlFor="label">Label</Label>
                                <Input
                                    id="label"
                                    value={data.label || ''}
                                    placeholder="Enter a label"
                                    onChange={(e) =>
                                        setData('label', e.target.value)
                                    }
                                    aria-invalid={
                                        errors.label ? 'true' : 'false'
                                    }
                                    disabled={processing}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="link">Link</Label>
                                <Input
                                    id="link"
                                    value={data.link || ''}
                                    placeholder="Enter a link"
                                    onChange={(e) =>
                                        setData('link', e.target.value)
                                    }
                                    aria-invalid={
                                        errors.link ? 'true' : 'false'
                                    }
                                    disabled={processing}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="icon">Icon</Label>
                                <IconPicker
                                    id="icon"
                                    value={(data.icon as IconName) || ''}
                                    onValueChange={(value) =>
                                        setData('icon', value as string)
                                    }
                                    disabled={processing}
                                    categorized={false}
                                    aria-required="true"
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
                            Store Contact
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </AppLayout>
    );
}
