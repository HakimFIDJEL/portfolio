import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

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

export interface Attachment {
    file_path: string;
    file_name?: string;
    mime_type?: string;
    file_extension?: string;
    file_size?: number;
    url: string;
}

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

export interface PaginationProps {
    current_page: number;
    first_page_url: string;
    from : number;
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


export interface Theme {
    value: string;
}