// Needed imports
import React from "react";

// Components
import { SidebarTrigger } from "@/Components/ui/sidebar";
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from "@/Components/ui/breadcrumb";
import { Separator } from "@/Components/ui/separator";

export function AppHeader({ breadcrumbs }) {
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href={route("admin.home")}>
                                Portfolio
                            </BreadcrumbLink>
                        </BreadcrumbItem>

                        {breadcrumbs &&
                            breadcrumbs.map((breadcrumb, index) => (
                                <React.Fragment key={index}>
                                    <BreadcrumbSeparator className="hidden md:block" />
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href={breadcrumb.href}>
                                            {index ===
                                            breadcrumbs.length - 1 ? (
                                                <BreadcrumbPage>
                                                    {breadcrumb.title}
                                                </BreadcrumbPage>
                                            ) : (
                                                breadcrumb.title
                                            )}
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                </React.Fragment>
                            ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    );
}
