// Needed imports
import Layout from "@/Layouts/admin";
import { Link } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import { useRoute } from "ziggy";
import { useState, useRef, useEffect } from "react";

// Icons
import {
    Loader2,
    ArrowLeft,
    Folder,
    Settings2,
    SquareArrowOutUpRight,
} from "lucide-react";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";



// Custom components
import { TabProject } from "@/Components/admin/projects/tab-project";
import { TabStacks } from "@/Components/admin/projects/tab-stacks";
import { TabTimeline } from "@/Components/admin/projects/tab-timeline";
import { TabImages } from "@/Components/admin/projects/tab-images";

function Projects({ project, stackCategories }) {
    const route = useRoute();


    const [selectedStacks, setSelectedStacks] = useState(
        project.stacks.map((stack) => stack.id.toString())
    );
    const [images, setImages] = useState([]);
    const [timeline, setTimeline] = useState(project.timeline);


    const { data, setData, post, processing, errors } = useForm({
        // Projet data
        type: project.type ?? "",
        title: project.title ?? "",
        subtitle: project.subtitle ?? "",
        description: project.description ?? "",
        feedback: project.feedback ?? "",
        what_i_learned: project.what_i_learned ?? "",
        end_date: project.end_date ?? "",
        work_in_progress: project.work_in_progress.toString() ?? "",
        source_code_url: project.source_code_url ?? "",
        live_demo_url: project.live_demo_url ?? "",
        timeline_url: project.timeline_url ?? "",
        readme_url: project.readme_url ?? "",
        is_new: project.is_new.toString() ?? "",

        // Project images
        images: images,

        // Project timeline
        timeline: timeline,

        // Project stacks
        stacks: selectedStacks,
    });


    function onSubmit(e) {
        e.preventDefault();
        post(route("admin.projects.update", project.id));
    }

   


    return (
        <>
            <Card>
                {/* Title of the page */}
                <CardHeader className="flex items-center justify-between flex-row gap-2">
                    <span>
                        <CardTitle className="flex items-center gap-2">
                            <Folder />
                            Edit a project
                        </CardTitle>
                        <CardDescription>
                            Here you can edit a project
                        </CardDescription>
                    </span>
                    <span className="flex gap-2">
                        <a href={route("project", [project.slug, project])}>
                            <Button type="button" variant="secondary">
                                <SquareArrowOutUpRight  />
                                See project
                            </Button>
                        </a>
                        <Link href={route("admin.projects.index")}>
                            <Button type="primary">
                                <ArrowLeft />
                                Go back
                            </Button>
                        </Link>
                    </span>
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
                                        existingImages={project.images}
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
                                Update project
                                <Settings2 size={18} hidden={processing} />
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
            title: "Edit",
            href: "",
        },
    ];
    return <Layout children={page} breadcrumbs={breadcrumbs} />;
};

export default Projects;
