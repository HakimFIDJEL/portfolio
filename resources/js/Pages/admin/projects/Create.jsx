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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Custom components
import { TabProject } from "@/Components/admin/projects/tab-project";
import { TabStacks } from "@/Components/admin/projects/tab-stacks";
import { TabTimeline } from "@/Components/admin/projects/tab-timeline";
import { TabImages } from "@/Components/admin/projects/tab-images";

function Projects({ stackCategories }) {
    const route = useRoute();

    const [selectedStacks, setSelectedStacks] = useState([]);
    const [images, setImages] = useState([]);
    const [timeline, setTimeline] = useState([]);
    
    const { data, setData, post, processing, errors } = useForm({
        // Projet data
        type: "",
        title: "",
        subtitle: "",
        description: "",
        feedback: "",
        what_i_learned: "",
        end_date: "",
        work_in_progress: false,
        source_code_url: "",
        live_demo_url: "",
        timeline_url: "",
        readme_url: "",

        // Project images
        images: images,

        // Project timeline
        timeline: timeline,

        // Project stacks
        stacks: selectedStacks,
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
                            <Tabs defaultValue="images" className="w-full">
                                <TabsList className="flex gap-4 w-full">
                                    <TabsTrigger
                                        value="images"
                                        className="w-full"
                                    >
                                        Images
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="project"
                                        className="w-full"
                                    >
                                        Project
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="stacks"
                                        className="w-full"
                                    >
                                        Stacks
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="timeline"
                                        className="w-full"
                                    >
                                        Timeline
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="images" className="my-4">
                                    <TabImages
                                        images={images}
                                        setImages={setImages}
                                        setData={setData}
                                    />
                                </TabsContent>

                                <TabsContent value="project" className="my-4">
                                    <TabProject
                                        data={data}
                                        setData={setData}
                                        errors={errors}
                                    />
                                </TabsContent>

                                <TabsContent value="stacks" className="my-4">
                                    <TabStacks
                                        selectedStacks={selectedStacks}
                                        stackCategories={stackCategories}
                                        setData={setData}
                                        setSelectedStacks={setSelectedStacks}
                                    />
                                </TabsContent>

                                <TabsContent value="timeline" className="my-4">
                                    <TabTimeline
                                        timeline={timeline}
                                        setTimeline={setTimeline}
                                        setData={setData}
                                    />
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
