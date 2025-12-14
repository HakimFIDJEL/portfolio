// resources/js/pages/backoffice/projects/create.tsx

// Necessary imports
import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';

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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { MinimalTiptap } from '@/components/ui/tiptap';
import { DatePicker } from '@/components/ui/date-picker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Custom Components
import { FileUpload } from '@/components/image-upload';

// Types
import type { BreadcrumbItem, Stack, StackItem, Tag } from '@/types';
import type { FileWithPreview } from '@/hooks/use-file-upload';

// Icons
import { ArrowLeft, Plus } from 'lucide-react';

interface CreateProps {
    tags: Tag[];
    stacks: Stack[];
}

export default function Create({ tags, stacks }: CreateProps) {
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
        type: 'project' | 'sandbox' | null;
        end_date: string | null;
        source_code_url: string;
        live_demo_url: string;

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
        type: null,
        end_date: null,
        source_code_url: '',
        live_demo_url: '',
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
                        <Tabs defaultValue="details">
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

                            <TabsContent
                                value="details"
                                className="grid gap-4 py-4"
                            >
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
                                                Titre
                                            </Label>
                                            <Input
                                                id="title_fr"
                                                value={data.title_fr || ''}
                                                placeholder="Entrer un titre"
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
                                                placeholder="Slug généré automatiquement"
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
                                                Sous-titre
                                            </Label>
                                            <Input
                                                id="subtitle_fr"
                                                value={data.subtitle_fr || ''}
                                                placeholder="Entrer un sous-titre"
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
                                                placeholder="Enter a description"
                                            />
                                        </div>

                                        {/* Feedback */}
                                        <div className="grid gap-2 md:col-span-2">
                                            <Label htmlFor="feedback_fr">
                                                Retour d'expérience
                                            </Label>
                                            <MinimalTiptap
                                                content={data.feedback_fr || ''}
                                                onChange={(content) =>
                                                    setData(
                                                        'feedback_fr',
                                                        content,
                                                    )
                                                }
                                                placeholder="Entrer un retour d'expérience"
                                            />
                                        </div>

                                        {/* What I Learned */}
                                        <div className="grid gap-2 md:col-span-2">
                                            <Label htmlFor="what_i_learned_fr">
                                                Ce que j'ai appris
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
                                                placeholder="Entrer ce que vous avez appris"
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
                                                placeholder="Enter a description"
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
                                                placeholder="Enter a feedback"
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
                                                placeholder="Enter what you learned"
                                            />
                                        </div>
                                    </TabsContent>
                                </Tabs>

                                <div className="grid gap-2">
                                    <h3 className="text-lg font-medium">
                                        Other Details
                                    </h3>
                                    <Separator />
                                </div>

                                <div className="grid gap-4 md:grid-cols-3">
                                    {/* New */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="is_new">New</Label>
                                        <Select
                                            value={
                                                data.is_new ? 'true' : 'false'
                                            }
                                            required
                                            onValueChange={(value) =>
                                                setData(
                                                    'is_new',
                                                    value === 'true',
                                                )
                                            }
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Is the project new?" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="true">
                                                        Yes
                                                    </SelectItem>
                                                    <SelectItem value="false">
                                                        No
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Type */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="type">Type</Label>
                                        <Select
                                            value={data.type || ''}
                                            required
                                            onValueChange={(value) =>
                                                setData(
                                                    'type',
                                                    value as
                                                        | 'project'
                                                        | 'sandbox',
                                                )
                                            }
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="What's the project type?" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="project">
                                                        Project
                                                    </SelectItem>
                                                    <SelectItem value="sandbox">
                                                        Sandbox
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* End date */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="end_date">
                                            End date
                                        </Label>
                                        <DatePicker
                                            required
                                            ariaInvalid={!!errors.end_date}
                                            date={
                                                data.end_date
                                                    ? new Date(data.end_date)
                                                    : undefined
                                            }
                                            onDateChange={(date) =>
                                                setData(
                                                    'end_date',
                                                    date
                                                        ? [
                                                              date.getFullYear(),
                                                              String(
                                                                  date.getMonth() +
                                                                      1,
                                                              ).padStart(
                                                                  2,
                                                                  '0',
                                                              ),
                                                              String(
                                                                  date.getDate(),
                                                              ).padStart(
                                                                  2,
                                                                  '0',
                                                              ),
                                                          ].join('-')
                                                        : null,
                                                )
                                            }
                                            placeholder="Select an end date"
                                            className="w-full"
                                        />
                                    </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    {/* Source Code URL */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="source_code_url">
                                            Source Code URL
                                        </Label>
                                        <Input
                                            id="source_code_url"
                                            type="url"
                                            value={data.source_code_url || ''}
                                            placeholder="Enter the source code URL"
                                            onChange={(e) =>
                                                setData(
                                                    'source_code_url',
                                                    e.target.value,
                                                )
                                            }
                                            aria-invalid={
                                                errors.source_code_url
                                                    ? 'true'
                                                    : 'false'
                                            }
                                            disabled={processing}
                                        />
                                    </div>

                                    {/* Live Demo URL */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="live_demo_url">
                                            Live Demo URL
                                        </Label>
                                        <Input
                                            id="live_demo_url"
                                            type="url"
                                            value={data.live_demo_url || ''}
                                            placeholder="Enter the live demo URL"
                                            onChange={(e) =>
                                                setData(
                                                    'live_demo_url',
                                                    e.target.value,
                                                )
                                            }
                                            aria-invalid={
                                                errors.live_demo_url
                                                    ? 'true'
                                                    : 'false'
                                            }
                                            disabled={processing}
                                        />
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent
                                value="tags"
                                className="grid gap-4 py-4"
                            >
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

                            <TabsContent
                                value="stack"
                                className="grid gap-4 py-4"
                            >
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
                                    stacks={stacks}
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
    setData: (field: string, value: Tag[]) => void;
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
    stacks: Stack[];
    data: {
        stackItems: StackItem[];
    };
    setData: (field: string, value: StackItem[]) => void;
}

export function StackItems({ stacks, data, setData }: StackItemProps) {
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
        <div className="grid gap-6">
            {stacks && stacks.length > 0 ? (
                stacks.map((stack) => (
                    <div key={stack.name} className="grid gap-3">
                        <h4 className="text-lg font-semibold">{stack.name}</h4>

                        <div className="flex flex-wrap gap-2">
                            {stack.items && stack.items.length > 0 ? (
                                stack.items.map((stack_item) => (
                                    <Button
                                        key={stack_item.id}
                                        type="button"
                                        variant={
                                            data.stackItems.find(
                                                (t) => t.id === stack_item.id,
                                            )
                                                ? 'default'
                                                : 'secondary'
                                        }
                                        onClick={() =>
                                            toggleStackItem(stack_item)
                                        }
                                    >
                                        {stack_item.name}
                                    </Button>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground">
                                    No stack items available in this group.
                                </p>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-sm text-muted-foreground">
                    No stacks available. Please create stacks first.
                </p>
            )}
        </div>
    );
}
