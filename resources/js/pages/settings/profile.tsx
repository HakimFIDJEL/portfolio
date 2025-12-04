
// Necessary imports
import { Head, useForm, usePage } from '@inertiajs/react';

// Layout
import AppLayout from '@/layouts/app/layout';
import SettingsLayout from '@/layouts/settings/layout';

// Translation Hook
import { useTrans } from '@/lib/translation';

// Custom components
import HeadingSmall from '@/components/heading-small';

// Shadcn UI Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

// Types
import type { BreadcrumbItem, SharedData } from '@/types';

// Icons
import { Save } from 'lucide-react';

import AvatarUpload from '@/components/avatar-upload';
import FileUpload from '@/components/file-upload';

export default function Profile() {
    const { auth } = usePage<SharedData>().props;
    const __ = useTrans();

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: __('settings.pages.breadcrumbs.settings'),
            href: route('settings.profile.edit'),
        },
        {
            title: __('settings.pages.breadcrumbs.profile'),
            href: route('settings.profile.edit'),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={__('settings.pages.profile.head_title')} />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title={__('settings.pages.profile.info_form.title')}
                        description={__(
                            'settings.pages.profile.info_form.description',
                        )}
                    />

                    <InformationForm auth={auth} />
                </div>

            </SettingsLayout>
        </AppLayout>
    );
}

function InformationForm({ auth }: { auth: SharedData['auth'] }) {
    const __ = useTrans();

    const { data, setData, post, processing, errors } = useForm<{
        _method: 'PATCH';
        name: string;
        email: string;
        avatar?: File | null;
        resume?: File | null;
    }>({
        _method: 'PATCH',
        name: auth.user.name ?? '',
        email: auth.user.email ?? '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('settings.profile.update'), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                setData((current) => {
                    const { ...rest } = current;
                    return { ...rest, avatar: undefined, resume: undefined } as typeof current;
                });
            },
        });
    };

    const MAX_RESUME_SIZE_MB = 5;
    const ALLOWED_RESUME_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

    return (
        <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="grid md:grid-cols-3 gap-x-8 gap-y-4"
        >
            {/* Colonnes 1 & 2 : Nom et Email */}
            <div className="md:col-span-2 flex flex-col gap-2">
                <Label htmlFor="name">
                    {__('settings.pages.profile.info_form.fields.name.label')}
                </Label>
            </div>

            {/* Colonne 3 : Label Avatar */}
            <div className="flex flex-col justify-end">
                <Label htmlFor="avatar" className="text-left">
                    {__('settings.pages.profile.info_form.fields.avatar.label')}
                </Label>
            </div>

            {/* Colonnes 1 & 2 : Champs Input */}
            <div className="space-y-4 md:col-span-2">
                <Input
                    id="name"
                    name="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    required
                    placeholder={__('settings.pages.profile.info_form.fields.name.placeholder')}
                    aria-invalid={errors.name ? 'true' : 'false'}
                />

                <div className="grid gap-2">
                    <Label htmlFor="email">
                        {__('settings.pages.profile.info_form.fields.email.label')}
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        placeholder={__('settings.pages.profile.info_form.fields.email.placeholder')}
                        aria-invalid={errors.email ? 'true' : 'false'}
                    />
                </div>
            </div>

            {/* Colonne 3 : Avatar Upload */}
            <div className="flex flex-col items-start gap-3 md:col-span-1">
                <AvatarUpload
                    defaultUrl={auth.user?.avatar?.url ?? null}
                    onFileChange={(file) => {
                        setData('avatar', file);
                    }}
                />
            </div>

            {/* Séparateur pour le CV */}
            <div className="md:col-span-3 h-px bg-border my-2" />
            
            {/* Colonnes 1 & 2 : Label CV */}
            <div className="md:col-span-2 flex flex-col gap-2">
                <Label htmlFor="resume">
                    {__('settings.pages.profile.info_form.fields.resume.label')}
                </Label>
            </div>
            
            {/* Colonnes 1, 2, 3 : Champ CV */}
            <div className="md:col-span-3 space-y-2">
                <FileUpload
                    defaultAttachment={auth.user?.resume ?? null}
                    onFileChange={(file) => {
                        setData('resume', file);
                    }}
                    labelKey={__("settings.pages.profile.info_form.fields.resume.label")}
                    descriptionKey={__("settings.pages.profile.info_form.fields.resume.description")}
                    maxSizeMB={MAX_RESUME_SIZE_MB}
                    allowedTypes={ALLOWED_RESUME_TYPES}
                />
            </div>

            {/* Bouton de Soumission */}
            <div className="md:col-span-3 flex pt-2">
                <Button disabled={processing} type="submit">
                    {processing ? <Spinner /> : <Save />}
                    {__('settings.pages.profile.info_form.buttons.submit')}
                </Button>
            </div>
        </form>
    );
}

