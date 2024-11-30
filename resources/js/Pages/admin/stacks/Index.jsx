// Needed imports
import Layout from "@/Layouts/admin";
import { Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";
import { useRoute } from "ziggy";

// Icons
import { Plus, Blocks, Settings2, Trash, Loader2 } from "lucide-react";

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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

function Stacks({ stacks }) {

    console.log(stacks);

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

    const { data, setData, post, processing, errors } = useForm({
        label: "",
    });

    function onSubmit(e) {
        e.preventDefault();
        post(route("admin.stacks.categories.store"), {
            onSuccess: () => {
                setData({ label: "" });
            }
        })
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

                    <span className="flex gap-4">
                        <Dialog>
                            <DialogTrigger>
                                <Button variant="secondary">
                                    <Plus size={18} />
                                    Create a category
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Create a new category
                                    </DialogTitle>
                                    <DialogDescription asChild>
                                        <form onSubmit={onSubmit} className="pt-2">
                                            <Separator />
                                            <div className="grid gap-4 my-4">
                                                <div className="grid gap-2 w-full">
                                                    <Label htmlFor="label">
                                                        Label
                                                    </Label>
                                                    <Input
                                                        id="label"
                                                        type="text"
                                                        placeholder="e.g. Frontend"
                                                        required
                                                        value={data.label}
                                                        onChange={(e) => setData("label", e.target.value)}
                                                        className={ errors.label ? "border-red-500" : "" }
                                                    />
                                                </div>

                                                <Button
                                                    type="submit"
                                                    className="w-full"
                                                    disabled={processing}
                                                >
                                                    <Loader2
                                                        className="animate-spin"
                                                        hidden={!processing}
                                                    />
                                                    Store category
                                                    <Plus
                                                        size={18}
                                                        hidden={processing}
                                                    />
                                                </Button>
                                            </div>
                                        </form>
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>

                        <Link href={route("admin.stacks.create")}>
                            <Button>
                                <Plus size={18} />
                                Create a stack
                            </Button>
                        </Link>
                    </span>
                </CardHeader>

                <Separator />

                <CardContent>

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
                                        <TableCell>{stack.category.label}</TableCell>
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
