// Needed imports
import Layout from "@/Layouts/admin";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import { useRoute } from "ziggy";

// Icons
import { Plus, Folder, Settings2, Trash } from "lucide-react";

// Components
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
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
} from "@/Components/ui/table";
import { AppAlert } from "@/Components/admin/app-alert";

function Projects({ projects }) {
    const route = useRoute();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);

    function handleDeleteClick(e, project) {
        e.preventDefault();
        setProjectToDelete(project);
        setIsDialogOpen(true);
    }

    function dismissDelete() {
        setIsDialogOpen(false);
        setProjectToDelete(null);
    }

    function confirmDelete(e) {
        e.preventDefault();
        setIsDialogOpen(false);
        if (projectToDelete) {
            router.delete(route("admin.projects.delete", projectToDelete));
            setProjectToDelete(null);
        }
    }

    return (
        <>
            <Card>
                {/* Title of the page */}
                <CardHeader className="flex items-center justify-between flex-row gap-2">
                    <span>
                        <CardTitle className="flex items-center gap-2">
                            <Folder />
                            Projects
                        </CardTitle>
                        <CardDescription>
                            Here you can manage all of your projects
                        </CardDescription>
                    </span>
                    <Link href={route("admin.projects.create")}>
                        <Button type="primary">
                            <Plus size={18} />
                            Create a project
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
                                <TableHead>Status</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        {projects && projects.length > 0 ? (
                            <TableBody>
                                {projects.map((project) => (
                                    <TableRow key={project.id}>
                                        <TableCell className="font-semibold">
                                            # {project.id}
                                        </TableCell>

                                        <TableCell>
                                            <Badge
                                                variant={project.work_in_progress ? "secondary" : "primary"}
                                            >
                                                {project.work_in_progress ? "In progress" : "Completed"}
                                            </Badge>
                                        </TableCell>

                                        <TableCell>
                                            <Badge variant={project.type === "project" ? "primary" : "secondary"}>
                                                {project.type === "project" ? "Project" : "Laboratory"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {project.title}
                                        </TableCell>

                                        <TableCell className="text-right">
                                            <Link
                                                className="mr-2"
                                                href={route(
                                                    "admin.projects.edit",
                                                    project
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
                                                    "admin.projects.delete",
                                                    project.id
                                                )}
                                                onClick={(e) => {
                                                    handleDeleteClick(e, project);
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
                                    <TableCell colSpan={5}>Error</TableCell>
                                    <TableCell className="text-right">
                                        There is no project to display
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

Projects.layout = (page) => {
    const route = useRoute();
    const breadcrumbs = [
        {
            title: "Projects",
            href: route("admin.projects.index"),
        },
    ];
    return <Layout children={page} breadcrumbs={breadcrumbs} />;
};

export default Projects;
