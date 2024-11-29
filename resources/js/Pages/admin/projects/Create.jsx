// Needed imports
import Layout from "@/Layouts/admin";
import { Link } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import { useRoute } from "ziggy";
import { useState } from "react";

// Icons
import { Loader2, ArrowLeft, Folder, Plus } from "lucide-react";

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
import { Textarea } from "@/Components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs"


function Projects() {
    const route = useRoute();

    const [slug, setSlug] = useState("");

    function generateSlug(title) {
        setSlug(title.toLowerCase().replace(/ /g, "-"));
    }

    const { data, setData, post, processing, errors } = useForm({
        // Projet data
        type: "",
        slug: slug,
        title: "",
        subtitle: "",
        description: "",
        feedback: "",
        end_date: "",
        work_in_progress: false,
        source_code_url: "",
        live_demo_url: "",
        timeline_url: "",

        // Project images
        images: [],

        // Project timeline
        timeline: [],

        // Project stacks
        stacks: [],
    });

    function onSubmit(e) {
        e.preventDefault();
        post(route("admin.projects.store"));
    }

    return (
        <>
            <Card>
                {/* Title of the page */}
                <CardHeader className="flex items-center justify-between flex-row gap-2">
                    <span>
                        <CardTitle className="flex items-center gap-2">
                            <Folder />
                            Create a project
                        </CardTitle>
                        <CardDescription>
                            Here you can create a new project
                        </CardDescription>
                    </span>
                    <Link href={route("admin.projects.index")}>
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

                            <Tabs defaultValue="project" className="w-full">
                                <TabsList className="flex gap-4 w-full">
                                    <TabsTrigger value="project" className="w-full">
                                        Project
                                    </TabsTrigger>
                                    <TabsTrigger value="stacks" className="w-full">
                                        Stacks
                                    </TabsTrigger>
                                    <TabsTrigger value="images" className="w-full">
                                        Images
                                    </TabsTrigger>
                                    <TabsTrigger value="timeline" className="w-full">
                                        Timeline
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="project" className="w-full mt-4">
                                    <div className="flex flex-row gap-4">
                                        <div className="grid gap-2 w-full">
                                            <Label htmlFor="title">Title</Label>
                                            <Input
                                                id="title"
                                                type="text"
                                                placeholder="e.g. My awesome project"
                                                required
                                                onChange={(e) => {
                                                    setData("title", e.target.value);
                                                    generateSlug(e.target.value);
                                                }}
                                                className={
                                                    errors.title ? "border-red-500" : ""
                                                }
                                            />
                                        </div>
                                        <div className="grid gap-2 w-full">
                                            <Label htmlFor="slug">Slug</Label>
                                            <Input
                                                id="slug"
                                                type="text"
                                                placeholder="e.g. my-awesome-project"
                                                required
                                                disabled
                                                value={slug}
                                                className={
                                                    errors.slug ? "border-red-500" : ""
                                                }
                                            />
                                        </div>
                                    </div>
                                </TabsContent>
                                <TabsContent value="stacks">
                                    Here you can fill the stacks
                                </TabsContent>
                                <TabsContent value="images">
                                    Here you can add images
                                </TabsContent>
                                <TabsContent value="timeline">
                                    Here you can add a timeline
                                </TabsContent>
                            </Tabs>



                            <Button
                                type="submit"
                                className="w-full"
                                disabled={processing}
                            >
                                <Loader2
                                    className="animate-spin"
                                    hidden={!processing}
                                />
                                Store project
                                <Plus size={18} hidden={processing} />
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
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
        {
            title: "Create",
            href: "",
        },
    ];
    return <Layout children={page} breadcrumbs={breadcrumbs} />;
};

export default Projects;
