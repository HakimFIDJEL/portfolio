// Needed imports
import Layout from "@/Layouts/admin";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import { useRoute } from "ziggy";

// Icons
import { Plus, Blocks, Settings2, Trash } from "lucide-react";

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

function Stacks({ stacks }) {
    const route = useRoute();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [stackToDelete, setStackToDelete] = useState(null);

    function handleDeleteClick(e, stack) {
        e.preventDefault();
        setStackToDelete(stack);
        setIsDialogOpen(true);
    }

    function dismissDelete() {
        setIsDialogOpen(false);
        setStackToDelete(null);
    }

    function confirmDelete(e) {
        e.preventDefault();
        setIsDialogOpen(false);
        if (stackToDelete) {
            router.delete(route("admin.stacks.delete", stackToDelete));
            setStackToDelete(null);
        }
    }

    return (
        <>
            <Card>
                {/* Title of the page */}
                <CardHeader className="flex items-center justify-between flex-row gap-2">
                    <span>
                        <CardTitle className="flex items-center gap-2">
                            <Blocks />
                            Stacks
                        </CardTitle>
                        <CardDescription>
                            Here you can manage all the stacks that you master
                        </CardDescription>
                    </span>
                    <Link href={route("admin.stacks.create")}>
                        <Button type="primary">
                            <Plus size={18} />
                            Create a stack
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
                                <TableHead>Label</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        {stacks && stacks.length > 0 ? (
                            <TableBody>
                                {stacks.map((stack) => (
                                    <TableRow key={stack.id}>
                                        <TableCell className="font-semibold">
                                            # {stack.id}
                                        </TableCell>
                                        <TableCell>{stack.label}</TableCell>
                                        <TableCell>{stack.category}</TableCell>
                                        <TableCell className="text-right">
                                            <Link
                                                className="mr-2"
                                                href={route(
                                                    "admin.stacks.edit",
                                                    stack
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
                                                    "admin.stacks.delete",
                                                    stack.id
                                                )}
                                                onClick={(e) => {
                                                    handleDeleteClick(e, stack);
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
                                    <TableCell colSpan={3}>Error</TableCell>
                                    <TableCell className="text-right">
                                        There is no stack to display
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

Stacks.layout = (page) => {
    const route = useRoute();
    const breadcrumbs = [
        {
            title: "Stacks",
            href: route("admin.stacks.index"),
        },
    ];
    return <Layout children={page} breadcrumbs={breadcrumbs} />;
};

export default Stacks;
