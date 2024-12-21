// Needed imports
import Layout from "@/Layouts/admin";
import { Link, useForm, router } from "@inertiajs/react";
import { useRoute } from "ziggy";
import { useState } from "react";

// Icons
import { Loader2, ArrowLeft, Blocks, Settings2, Hammer } from "lucide-react";

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
import { Label } from "@/Components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";

function Tools({ tool, categories }) {

    const route = useRoute();

    const { data, setData, post, processing, errors } = useForm({
        label: tool.label,
        category_id : tool.category_id,
    });

    function onSelectChange(id) {
        setData("category_id", id);
    }

    function onSubmit(e) {
        e.preventDefault();
        post(route("admin.tools.update", tool));
    }

    return (
        <>
            <Card>
                {/* Title of the page */}
                <CardHeader className="flex items-center justify-between flex-row gap-2">
                    <span>
                        <CardTitle className="flex items-center gap-2">
                            <Hammer />
                            Edit a tool
                        </CardTitle>
                        <CardDescription>
                            Here you can edit an existing tool
                        </CardDescription>
                    </span>
                    <Link href={route("admin.tools.index")}>
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
                                        id="category_id"

                                        onValueChange={onSelectChange}
                                        defaultValue={tool.category_id.toString()}
                                        required
                                        className={ errors.category_id ? "border-red-500" : "" }
                                        disabled={categories.length === 0}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem
                                                    key={category.id}
                                                    value={category.id.toString()}
                                                >
                                                    {category.label}
                                                </SelectItem>
                                            ))}

                                            {categories.length === 0 && (
                                                <SelectItem value="0">
                                                    No categories found
                                                </SelectItem>
                                            )}
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
                                Update tool
                                <Settings2 size={18} hidden={processing} />
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </>
    );
}

Tools.layout = (page) => {
    const route = useRoute();

    const breadcrumbs = [
        {
            title: "Tools",
            href: route("admin.tools.index"),
        },
        {
            title: "Edit",
            href: "",
        },
    ];
    return <Layout children={page} breadcrumbs={breadcrumbs} />;
};

export default Tools;
