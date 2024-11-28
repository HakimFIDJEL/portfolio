// Needed imports
import Layout from "@/Layouts/admin";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import { useRoute } from "ziggy";

// Icons
import { Plus, Activity, Settings2, Trash } from "lucide-react";

// Components
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Separator } from "@/Components/ui/separator";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter,
} from "@/components/ui/table";
import { AppAlert } from "@/Components/admin/app-alert";

function Socials({ socials }) {
    const route = useRoute();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [socialToDelete, setSocialToDelete] = useState(null);

    function handleDeleteClick(e, social) {
        e.preventDefault();
        setSocialToDelete(social);
        setIsDialogOpen(true);
    }

    function dismissDelete() {
        setIsDialogOpen(false);
        setSocialToDelete(null);
    }

    function confirmDelete(e) {
        e.preventDefault();
        setIsDialogOpen(false);
        if (socialToDelete) {
            router.delete(route("admin.socials.delete", socialToDelete));
            setSocialToDelete(null);
        }
    }

    return (
        <>
            <Card>
                {/* Title of the page */}
                <CardHeader className="flex items-center justify-between flex-row gap-2">
                    <span>
                        <CardTitle className="flex items-center gap-2">
                            <Activity />
                            Socials
                        </CardTitle>
                        <CardDescription>
                            Here you can manage all of your socials links
                        </CardDescription>
                    </span>
                    <Link href={route("admin.socials.create")}>
                        <Button type="primary">
                            <Plus size={18} />
                            Create a social link
                        </Button>
                    </Link>
                </CardHeader>

                <Separator />

                <CardContent>
                    {/* Content of the page ( table of all the badges with a button) */}

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Icon</TableHead>
                                <TableHead>Label</TableHead>
                                <TableHead>Url</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        {socials && socials.length > 0 ? (
                            <TableBody>
                                {socials.map((social) => (
                                    <TableRow key={social.id}>
                                        <TableCell className="font-semibold">
                                            # {social.id}
                                        </TableCell>
                                        <TableCell>
                                            <div
                                                className="w-8 h-8 bg-gray-900 rounded-md flex items-center justify-center"
                                                // className="w-8 h-8"
                                                dangerouslySetInnerHTML={{ __html: social.svg }}
                                            />
                                        </TableCell>

                                        <TableCell>{social.label}</TableCell>
                                        <TableCell>
                                            <Link href={social.url} target="_blank" className="text-blue-500">
                                                {social.url}
                                            </Link>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Link
                                                className="mr-2"
                                                href={route(
                                                    "admin.socials.edit",
                                                    social
                                                )}
                                            >
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    Edit
                                                    <Settings2 />
                                                </Button>
                                            </Link>
                                            <Link
                                                href={route(
                                                    "admin.socials.delete",
                                                    social.id
                                                )}
                                                onClick={(e) => {
                                                    handleDeleteClick(e, social);
                                                }}
                                            >
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                >
                                                    Delete
                                                    <Trash />
                                                </Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        ) : (
                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={4}>Error</TableCell>
                                    <TableCell className="text-right">
                                        There is no social link to display
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        )}
                    </Table>
                </CardContent>
            </Card>

            <AppAlert
                isDialogOpen={isDialogOpen}
                dismissDelete={dismissDelete}
                confirmDelete={confirmDelete}
            />
        </>
    );
}

Socials.layout = (page) => {
    const route = useRoute();
    const breadcrumbs = [
        {
            title: "Socials",
            href: route("admin.socials.index"),
        },
    ];
    return <Layout children={page} breadcrumbs={breadcrumbs} />;
};

export default Socials;
