// Needed imports
import Layout from "@/Layouts/admin";
import { Link } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import { useRoute } from "ziggy";

// Icons
import { Loader2, ArrowLeft, Blocks, Plus } from "lucide-react";

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
import { Input } from "@/Components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

function Stacks({ stack }) {

    const route = useRoute();
    const { data, setData, post, processing, errors } = useForm({
        label: stack.label,
        category: stack.category,
    });

    function onSubmit(e) {
        e.preventDefault();
        post(route("admin.stacks.update", stack));
    }

    return (
        <>
            <Card>
                {/* Title of the page */}
                <CardHeader className="flex items-center justify-between flex-row gap-2">
                    <span>
                        <CardTitle className="flex items-center gap-2">
                            <Blocks />
                            Edit a stack
                        </CardTitle>
                        <CardDescription>
                            Here you can edit an existing stack
                        </CardDescription>
                    </span>
                    <Link href={route("admin.stacks.index")}>
                        <Button type="primary">
                            <ArrowLeft />
                            Go back
                        </Button>
                    </Link>
                </CardHeader>

                <Separator />

                <CardContent>
                    <form onSubmit={onSubmit} className="mt-4">
                        <div className="grid gap-4">
                            <div className="flex flex-row gap-4">
                                <div className="grid gap-2 w-full">
                                    <Label htmlFor="label">Label</Label>
                                    <Input
                                        id="label"
                                        type="text"
                                        placeholder="e.g. Laravel"
                                        value={data.label}
                                        required
                                        onChange={(e) =>
                                            setData("label", e.target.value)
                                        }
                                        className={
                                            errors.label ? "border-red-500" : ""
                                        }
                                    />
                                </div>
                                <div className="grid gap-2 w-full">
                                    <div className="flex items-center">
                                        <Label htmlFor="category">
                                            Category
                                        </Label>
                                    </div>
                                    <Select
                                        id="category"
                                        onValueChange={(e) =>
                                            setData("category", e)
                                        }
                                        value={data.category}
                                        className={
                                            errors.category
                                                ? "border-red-500"
                                                : ""
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Frontend">
                                                Frontend
                                            </SelectItem>
                                            <SelectItem value="Backend">
                                                Backend
                                            </SelectItem>
                                            <SelectItem value="Database">
                                                Database
                                            </SelectItem>
                                            <SelectItem value="Others">
                                                Others
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
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
                                Update stack
                                <Plus size={18} hidden={processing} />
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </>
    );
}

Stacks.layout = (page) => {
    const breadcrumbs = [
        {
            title: "Stacks",
            href: route("admin.stacks.index"),
        },
        {
            title: "Edit",
            href: "",
        },
    ];
    return <Layout children={page} breadcrumbs={breadcrumbs} />;
};

export default Stacks;
