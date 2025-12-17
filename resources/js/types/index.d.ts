import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

// --------------------------------
// User and Auth Interfaces
// --------------------------------

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    avatar_id: number | null;
    resume_id: number | null;
    avatar?: Attachment | null;
    resume?: Attachment | null;
    created_at: string;
    updated_at: string;
}

export interface Auth {
    user: User;
}

export interface Theme {
    value: string;
}

// --------------------------------
// System Interfaces
// --------------------------------

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    unread_notifications: number;
    locale: string;

    avatar_url: string | null;
    resume_url: string | null;
    
    [key: string]: unknown;
}

export interface PaginationProps {
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
    links: {
        url: string | null;
        active: boolean;
        label: string;
        page: number | null;
    }
}

// --------------------------------
// Attachment Interface
// --------------------------------

export interface Attachment {
    id: number;
    title?: string;
    file_path: string;
    file_name?: string;
    mime_type?: string;
    file_extension?: string;
    file_size?: number;
    url: string;
}

// --------------------------------
// Backoffice Interfaces
// --------------------------------

export interface Tag {
    id: number;
    sort_order: number;
    name: string;

    name_fr: string;
    name_en: string;
}

export interface Stack {
    id: number;
    sort_order: number;
    name: string;
    items: StackItem[];

    name_fr: string;
    name_en: string;
}

export interface StackItem {
    id: number;
    sort_order: number;
    name: string;
}

export interface Tool {
    id: number;
    sort_order: number;
    name: string;
    items: ToolItem[];

    name_fr: string;
    name_en: string;
}

export interface ToolItem {
    id: number;
    sort_order: number;
    name: string;
}

export interface Project {
    id: number;
    sort_order: number;
    slug: string;
    title: string;
    subtitle: string;

    attachments?: Attachment[];

    source_code_url: string | null;
    live_demo_url: string | null;
    description: string | null;
    feedback: string | null;
    what_i_learned: string | null;

    tags: Tag[];
    stack_items: StackItem[];

    is_new: boolean;
    end_date: string | null;
    type: 'project' | 'sandbox' | null;
    created_at: string;
    updated_at: string;

    title_fr: string;
    title_en: string;
    subtitle_fr: string;
    subtitle_en: string;
    slug_fr: string;
    slug_en: string;
    description_fr: string | null;
    description_en: string | null;
    feedback_fr: string | null;
    feedback_en: string | null;
    what_i_learned_fr: string | null;
    what_i_learned_en: string | null;
}

export interface Contact {
    id: number;
    sort_order: number;
    icon: string;
    label: string;
    name: string;
    link: string;

    name_fr: string;
    name_en: string;
}

export interface Experience {
    id: number;
    sort_order: number;
    company: string;
    job: string;
    status: string;
    duration: string;
    description: string;

    job_fr: string;
    job_en: string;
    status_fr: string;
    status_en: string;
    description_fr: string;
    description_en: string;
}

export interface Education {
    id: number;
    sort_order: number;
    institution: string;
    type: string;
    duration: string;
    description: string;

    type_fr: string;
    type_en: string;
    description_fr: string;
    description_en: string;
}