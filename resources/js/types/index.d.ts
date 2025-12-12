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

export interface Tags {
    id: number;
    sort_order: number;
    name: string;
}

export interface Stacks {
    id: number;
    sort_order: number;
    name: string;
    items: StackItem[];
}

export interface StackItem {
    id: number;
    sort_order: number;
    name: string;
}

export interface Tools {
    id: number;
    sort_order: number;
    name: string;
    items: ToolItem[];
}

export interface ToolItem {
    id: number;
    sort_order: number;
    name: string;
}

export interface Project {
    id: string;
    sort_order: number;
    slug: string;
    title: string;
    subtitle: string;
    date: string;

    attachments?: Attachment[];

    source_code_url: string | null;
    live_demo_url: string | null;
    description: string | null;
    feedback: string | null;
    what_i_learned: string | null;

    tags: Tags[];
    stacks: Stacks[];

    end_date: string | null;
    created_at: string;
    updated_at: string;
}

export interface Contact {
    id: number;
    sort_order: number;
    icon: string;
    label: string;
    name: string;
    link: string;
}

export interface Experience {
    id: number;
    sort_order: number;
    company: string;
    status: string;
    duration: string;
    description: string;
}

export interface Education {
    id: number;
    sort_order: number;
    institution: string;
    type: string;
    duration: string;
    description: string;
}