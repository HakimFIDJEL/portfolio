// resources/js/pages/backoffice/projects/create.tsx

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
import { MinimalTiptap } from '@/components/ui/tiptap';

// Custom Components
import { FileUpload } from '@/components/image-upload';

// Types
import type { BreadcrumbItem, StackItem, Tag } from '@/types';

// Icons
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Plus } from 'lucide-react';
import React, { useEffect } from 'react';
import { FileWithPreview } from '@/hooks/use-file-upload';

interface CreateProps {
    tags: Tag[];
    stack_items: StackItem[];
}

export default function Create({ tags, stack_items }: CreateProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
        {
            title: 'Projects',
            href: route('backoffice.projects.index'),
        },
        {
            title: 'Create',
            href: route('backoffice.projects.create'),
        },
    ];

    const { data, setData, processing, post, errors } = useForm<{
        title_fr: string;
        title_en: string;
        slug_fr: string;
        slug_en: string;
        subtitle_fr: string;
        subtitle_en: string;
        description_fr: string;
        description_en: string;
        feedback_fr: string;
        feedback_en: string;
        what_i_learned_fr: string;
        what_i_learned_en: string;

        is_new: boolean;
        end_date: string | null;

        tags: Tag[];
        stackItems: StackItem[];
        attachments: FileWithPreview[];
    }>({
        title_fr: '',
        title_en: '',
        subtitle_fr: '',
        subtitle_en: '',
        slug_fr: '',
        slug_en: '',
        description_fr: '',
        description_en: '',
        feedback_fr: '',
        feedback_en: '',
        what_i_learned_fr: '',
        what_i_learned_en: '',
        is_new: false,
        end_date: null,
        tags: [],
        stackItems: [],
        attachments: [],
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(route('backoffice.projects.store'));
    }

    function generateSlug(title: string) {
        return title
            .toLowerCase()
            .trim()
            .replace(/[\s\W-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    function handleAttachmentsChange(files: FileWithPreview[]) {
        console.log('Attachments changed:', files);
        setData('attachments', files);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <Card>
                <CardHeader>
                    <CardTitle>Create a project</CardTitle>
                    <CardDescription>
                        Fill in the form below to create a new project.
                    </CardDescription>
                    <CardAction>
                        <Link href={route('backoffice.projects.index')}>
                            <Button variant={'outline'}>
                                <ArrowLeft />
                                Go back
                            </Button>
                        </Link>
                    </CardAction>
                </CardHeader>
                <Separator />
                <form onSubmit={handleSubmit} className="grid gap-4">
                    <CardContent className="grid gap-12">
                        <Tabs defaultValue="attachments">
                            <TabsList className="w-full">
                                <TabsTrigger value="details">
                                    Project Details
                                </TabsTrigger>
                                <TabsTrigger value="tags">Tags</TabsTrigger>
                                <TabsTrigger value="stack">Stack</TabsTrigger>
                                <TabsTrigger value="attachments">
                                    Attachments
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="details" className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <h3 className="text-lg font-medium">
                                        Localized Fields
                                    </h3>
                                    <Separator />
                                </div>

                                <Tabs
                                    defaultValue="french"
                                    className="grid gap-4"
                                >
                                    {/* Fields */}
                                    <TabsList className="w-full">
                                        <TabsTrigger value="french">
                                            French (FR)
                                        </TabsTrigger>
                                        <TabsTrigger value="english">
                                            English (EN)
                                        </TabsTrigger>
                                    </TabsList>
                                    <TabsContent
                                        value="french"
                                        className="grid gap-4 md:grid-cols-2"
                                    >
                                        {/* Title */}
                                        <div className="grid gap-2">
                                            <Label htmlFor="title_fr">
                                                Title
                                            </Label>
                                            <Input
                                                id="title_fr"
                                                value={data.title_fr || ''}
                                                placeholder="Enter a title"
                                                onChange={(e) => {
                                                    setData(
                                                        'title_fr',
                                                        e.target.value,
                                                    );
                                                    setData(
                                                        'slug_fr',
                                                        generateSlug(
                                                            e.target.value,
                                                        ),
                                                    );
                                                }}
                                                aria-invalid={
                                                    errors.title_fr
                                                        ? 'true'
                                                        : 'false'
                                                }
                                                disabled={processing}
                                                required
                                            />
                                        </div>

                                        {/* Slug */}
                                        <div className="grid gap-2">
                                            <Label htmlFor="slug_fr">
                                                Slug
                                            </Label>
                                            <Input
                                                id="slug_fr"
                                                value={data.slug_fr || ''}
                                                readOnly
                                                placeholder="Auto-generated slug"
                                                aria-invalid={
                                                    errors.title_fr
                                                        ? 'true'
                                                        : 'false'
                                                }
                                                disabled={processing}
                                                required
                                            />
                                        </div>

                                        {/* Subtitle */}
                                        <div className="grid gap-2 md:col-span-2">
                                            <Label htmlFor="subtitle_fr">
                                                Subtitle
                                            </Label>
                                            <Input
                                                id="subtitle_fr"
                                                value={data.subtitle_fr || ''}
                                                placeholder="Enter a subtitle"
                                                onChange={(e) =>
                                                    setData(
                                                        'subtitle_fr',
                                                        e.target.value,
                                                    )
                                                }
                                                aria-invalid={
                                                    errors.subtitle_fr
                                                        ? 'true'
                                                        : 'false'
                                                }
                                                disabled={processing}
                                                required
                                            />
                                        </div>

                                        {/* Description */}
                                        <div className="grid gap-2 md:col-span-2">
                                            <Label htmlFor="description_fr">
                                                Description
                                            </Label>
                                            <MinimalTiptap
                                                content={
                                                    data.description_fr || ''
                                                }
                                                onChange={(content) =>
                                                    setData(
                                                        'description_fr',
                                                        content,
                                                    )
                                                }
                                                placeholder='Enter a description'
                                            />
                                        </div>

                                        {/* Feedback */}
                                        <div className="grid gap-2 md:col-span-2">
                                            <Label htmlFor="feedback_fr">
                                                Feedback
                                            </Label>
                                            <MinimalTiptap
                                                content={data.feedback_fr || ''}
                                                onChange={(content) =>
                                                    setData(
                                                        'feedback_fr',
                                                        content,
                                                    )
                                                }
                                                placeholder='Enter a feedback'
                                            />
                                        </div>

                                        {/* What I Learned */}
                                        <div className="grid gap-2 md:col-span-2">
                                            <Label htmlFor="what_i_learned_fr">
                                                What I Learned
                                            </Label>
                                            <MinimalTiptap
                                                content={
                                                    data.what_i_learned_fr || ''
                                                }
                                                onChange={(content) =>
                                                    setData(
                                                        'what_i_learned_fr',
                                                        content,
                                                    )
                                                }
                                                placeholder='Enter what you learned'
                                            />
                                        </div>
                                    </TabsContent>
                                    <TabsContent
                                        value="english"
                                        className="grid gap-4 md:grid-cols-2"
                                    >
                                        {/* Title */}
                                        <div className="grid gap-2">
                                            <Label htmlFor="title_fr">
                                                Title
                                            </Label>
                                            <Input
                                                id="title_en"
                                                value={data.title_en || ''}
                                                placeholder="Enter a title"
                                                onChange={(e) => {
                                                    setData(
                                                        'title_en',
                                                        e.target.value,
                                                    );
                                                    setData(
                                                        'slug_en',
                                                        generateSlug(
                                                            e.target.value,
                                                        ),
                                                    );
                                                }}
                                                aria-invalid={
                                                    errors.title_en
                                                        ? 'true'
                                                        : 'false'
                                                }
                                                disabled={processing}
                                                required
                                            />
                                        </div>

                                        {/* Slug */}
                                        <div className="grid gap-2">
                                            <Label htmlFor="slug_en">
                                                Slug
                                            </Label>
                                            <Input
                                                id="slug_en"
                                                value={data.slug_en || ''}
                                                readOnly
                                                placeholder="Auto-generated slug"
                                                aria-invalid={
                                                    errors.title_en
                                                        ? 'true'
                                                        : 'false'
                                                }
                                                disabled={processing}
                                                required
                                            />
                                        </div>

                                        {/* Subtitle */}
                                        <div className="grid gap-2 md:col-span-2">
                                            <Label htmlFor="subtitle_en">
                                                Subtitle
                                            </Label>
                                            <Input
                                                id="subtitle_en"
                                                value={data.subtitle_en || ''}
                                                placeholder="Enter a subtitle"
                                                onChange={(e) =>
                                                    setData(
                                                        'subtitle_en',
                                                        e.target.value,
                                                    )
                                                }
                                                aria-invalid={
                                                    errors.subtitle_en
                                                        ? 'true'
                                                        : 'false'
                                                }
                                                disabled={processing}
                                                required
                                            />
                                        </div>

                                        {/* Description */}
                                        <div className="grid gap-2 md:col-span-2">
                                            <Label htmlFor="description_en">
                                                Description
                                            </Label>
                                            <MinimalTiptap
                                                content={
                                                    data.description_en || ''
                                                }
                                                onChange={(content) =>
                                                    setData(
                                                        'description_en',
                                                        content,
                                                    )
                                                }
                                                placeholder='Enter a description'
                                            />
                                        </div>

                                        {/* Feedback */}
                                        <div className="grid gap-2 md:col-span-2">
                                            <Label htmlFor="feedback_en">
                                                Feedback
                                            </Label>
                                            <MinimalTiptap
                                                content={data.feedback_en || ''}
                                                onChange={(content) =>
                                                    setData(
                                                        'feedback_en',
                                                        content,
                                                    )
                                                }
                                                placeholder='Enter a feedback'
                                            />
                                        </div>

                                        {/* What I Learned */}
                                        <div className="grid gap-2 md:col-span-2">
                                            <Label htmlFor="what_i_learned_en">
                                                What I Learned
                                            </Label>
                                            <MinimalTiptap
                                                content={
                                                    data.what_i_learned_en || ''
                                                }
                                                onChange={(content) =>
                                                    setData(
                                                        'what_i_learned_en',
                                                        content,
                                                    )
                                                }
                                                placeholder='Enter what you learned'
                                            />
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </TabsContent>

                            <TabsContent value="tags" className="grid gap-4 py-4">
                                <div className="grid">
                                    <h3 className="text-lg font-medium">
                                        Tags
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Select the tags associated with this
                                        project.
                                    </p>
                                    <Separator className="mt-2" />
                                </div>

                                <Tags
                                    tags={tags}
                                    data={data}
                                    setData={setData}
                                />

                                {/*  */}
                            </TabsContent>

                            <TabsContent value="stack" className="grid gap-4 py-4">
                                <div className="grid">
                                    <h3 className="text-lg font-medium">
                                        Stacks
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Select the stack items associated with
                                        this project.
                                    </p>
                                    <Separator className="mt-2" />
                                </div>

                                <StackItems
                                    stack_items={stack_items}
                                    data={data}
                                    setData={setData}
                                />
                            </TabsContent>

                            <TabsContent
                                value="attachments"
                                className="grid gap-4 py-4"
                            >
                                <div className="grid">
                                    <h3 className="text-lg font-medium">
                                        Attachments
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Attach files related to this project.
                                    </p>
                                    <Separator className="mt-2" />
                                </div>

                                <FileUpload
                                    value={data.attachments}
                                    onValueChange={handleAttachmentsChange}
                                />

                            </TabsContent>
                        </Tabs>
                    </CardContent>
                    <Separator className="my-4" />
                    <CardFooter>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="w-full"
                        >
                            {processing ? <Spinner /> : <Plus />}
                            Store Project
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </AppLayout>
    );
}

interface TagsProps {
    tags: Tag[];
    data: {
        tags: Tag[];
    };
    setData: (field: string, value: any) => void;
}

export function Tags({ tags, data, setData }: TagsProps) {
    function toggleTag(tag: Tag) {
        const exists = data.tags.find((t) => t.id === tag.id);
        if (exists) {
            setData(
                'tags',
                data.tags.filter((t) => t.id !== tag.id),
            );
        } else {
            setData('tags', [...data.tags, tag]);
        }
    }

    return (
        <div className="flex flex-wrap gap-2">
            {tags && tags.length > 0 ? (
                tags.map((tag) => (
                    <Button
                        key={tag.id}
                        type="button"
                        variant={
                            data.tags.find((t) => t.id === tag.id)
                                ? 'default'
                                : 'secondary'
                        }
                        onClick={() => toggleTag(tag)}
                    >
                        {tag.name}
                    </Button>
                ))
            ) : (
                <p>No tags available. Please create tags first.</p>
            )}
        </div>
    );
}

interface StackItemProps {
    stack_items: StackItem[];
    data: {
        stackItems: StackItem[];
    };
    setData: (field: string, value: any) => void;
}

export function StackItems({ stack_items, data, setData }: StackItemProps) {
    function toggleStackItem(stack_item: StackItem) {
        const exists = data.stackItems.find((t) => t.id === stack_item.id);
        if (exists) {
            setData(
                'stackItems',
                data.stackItems.filter((t) => t.id !== stack_item.id),
            );
        } else {
            setData('stackItems', [...data.stackItems, stack_item]);
        }
    }

    return (
        <div className="flex flex-wrap gap-2">
            {stack_items && stack_items.length > 0 ? (
                stack_items.map((stack_item) => (
                    <Button
                        key={stack_item.id}
                        type="button"
                        variant={
                            data.stackItems.find((t) => t.id === stack_item.id)
                                ? 'default'
                                : 'secondary'
                        }
                        onClick={() => toggleStackItem(stack_item)}
                    >
                        {stack_item.name}
                    </Button>
                ))
            ) : (
                <p>
                    No stack items available. Please create stack items first.
                </p>
            )}
        </div>
    );
}
