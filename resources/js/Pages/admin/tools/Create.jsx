// Needed imports
import Layout from "@/Layouts/admin";
import { Link, useForm, router } from "@inertiajs/react";
import { useRoute } from "ziggy";
import { useState, useEffect } from "react";

// Icons
import { Loader2, ArrowLeft, Blocks, Plus, Trash, Hammer } from "lucide-react";

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

function Tools({ categories }) {
    
    const route = useRoute();


    const { data, setData, post, processing, errors } = useForm({
        label: "",
        category_id: null,
    });

    function onSelectChange(id) {
        setData("category_id", id);
    }

    function onSubmit(e) {
        e.preventDefault();
        post(route("admin.tools.store"));
    }

    function onDeleteCategory(e) {
        e.preventDefault();
        if(data.category_id) {
            router.delete(route("admin.tools.categories.delete", data.category_id ));
            setData("category_id", null);
        }
    }

    return (
        <>
            <Card>
                {/* Title of the page */}
                <CardHeader className="flex items-center justify-between flex-row gap-2">
                    <span>
                        <CardTitle className="flex items-center gap-2">
                            <Hammer />
                            Create a tool
                        </CardTitle>
                        <CardDescription>
                            Here you can create a new tool
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
                            <div className="grid grid-cols-12 gap-4 items-end">
                                <div className="grid gap-2 col-span-6">
                                    <Label htmlFor="label">Label</Label>
                                    <Input
                                        id="label"
                                        type="text"
                                        placeholder="e.g. Github"
                                        required
                                        onChange={(e) =>
                                            setData("label", e.target.value)
                                        }
                                        className={
                                            errors.label ? "border-red-500" : ""
                                        }
                                    />
                                </div>

                                <div className={`grid gap-2 ${ categories && categories.length > 0 && data.category_id ? "col-span-4" : "col-span-6" }`} >
                                    <div className="flex items-center">
                                        <Label htmlFor="category">
                                            Category
                                        </Label>
                                    </div>

                                    <Select
                                        id="category_id"

                                        onValueChange={onSelectChange}

                                        value={data.category_id ? data.category_id.toString() : ""}
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
                                { categories && categories.length > 0 && data.category_id && 
                                    (
                                        <div className="grid gap-2 col-span-2">
                                            <Link
                                                onClick={onDeleteCategory}
                                            >
                                                <Button
                                                    variant="outline"
                                                    className="w-full"
                                                >
                                                    <Trash />
                                                    Delete the category
                                                </Button>
                                            </Link>
                                        </div>
                                    )
                                }
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
                                Store tool
                                <Plus size={18} hidden={processing} />
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
            title: "Create",
            href: "",
        },
    ];
    return <Layout children={page} breadcrumbs={breadcrumbs} />;
};

export default Tools;
