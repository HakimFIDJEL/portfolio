// Needed imports
import Layout from "@/Layouts/admin";
import { Link } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import { useRoute } from "ziggy";
import { useState } from "react";

// Icons
import { 
    Loader2, 
    ArrowLeft, 
    Folder, 
    Plus,
    Archive,
    TestTubeDiagonal  
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
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Datepicker
} from "@/components/ui/datepicker"

import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"


function Projects({ stackCategories }) {
    const route = useRoute();

    // Slug
    const [slug, setSlug] = useState("");
    function generateSlug(title) {
        setSlug(title.toLowerCase().replace(/ /g, "-"));
    }

    // Stacks
    const [selectedStacks, setSelectedStacks] = useState([]);

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
        stacks: selectedStacks,
    });

    function onSubmit(e) {
        e.preventDefault();
        post(route("admin.projects.store"));
    }

    function handleToggleChange(e) {
        setSelectedStacks(e);
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
                                
                                <TabsContent value="project" className="my-4">
                                    <h4 className="text-lg font-semibold">Informations</h4>
                                    <Separator className="mt-1" />
                                    <div className="grid gap-4 my-4">
                                        <div className="grid grid-cols-12 gap-2">
                                            <div className="grid gap-2 col-span-6">
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
                                            <div className="grid gap-2 col-span-6">
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
                                        <div className="grid grid-cols-12 gap-2">
                                            <div className="grid gap-2 col-span-8">
                                                <Label htmlFor="subtitle">
                                                    Subtitle
                                                </Label>
                                                <Input
                                                    id="subtitle"
                                                    type="text"
                                                    placeholder="e.g. A project that does something"
                                                    required
                                                    onChange={(e) =>
                                                        setData("subtitle", e.target.value)
                                                    }
                                                    className={
                                                        errors.subtitle ? "border-red-500" : ""
                                                    }
                                                />
                                            </div>
                                            <div className="grid gap-2 col-span-4">
                                                <Label htmlFor="type">
                                                    Type
                                                </Label>
                                                <Select 
                                                    onValueChange={(value) => setData("type", value)}
                                                    required
                                                    className={
                                                        errors.type ? "border-red-500" : ""
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="project">
                                                            
                                                            Project
                                                        </SelectItem>
                                                        <SelectItem value="lab" className="flex">
                                                            Lab
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-12 gap-2">
                                            <div className="grid gap-2 col-span-6">
                                                <Label htmlFor="end_date">
                                                    End date
                                                </Label>
                                                <Datepicker onDateChange={(date) => setData("end_date", date)} required/>
                                            </div>
                                            <div className="grid gap-2 col-span-6">
                                                <Label htmlFor="work_in_progress">
                                                    Status
                                                </Label>
                                                <Select onValueChange={(value) => setData("work_in_progress", value)}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select the status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="true">Work in progress</SelectItem>
                                                        <SelectItem value="false">Project done</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="description">
                                                Description
                                            </Label>
                                            <Textarea
                                                id="description"
                                                type="text"
                                                placeholder="e.g. This project does something"
                                                required
                                                onChange={(e) =>
                                                    setData("description", e.target.value)
                                                }
                                                className={
                                                    errors.description ? "border-red-500" : ""
                                                }
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="feedback">
                                                Feedback
                                            </Label>
                                            <Textarea
                                                id="feedback"
                                                type="text"
                                                placeholder="e.g. I learned a lot from this project"
                                                required
                                                onChange={(e) =>
                                                    setData("feedback", e.target.value)
                                                }
                                                className={
                                                    errors.feedback ? "border-red-500" : ""
                                                }
                                            />
                                        </div>
                                    </div>

                                    <h4 className="text-lg font-semibold">Links</h4>
                                    <Separator className="mt-1" />
                                    <div className="grid gap-4 my-4">
                                        <div className="grid grid-cols-12 gap-2">
                                            <div className="grid gap-2 col-span-6">
                                                <Label htmlFor="source_code_url">
                                                    Source code URL
                                                </Label>
                                                <Input
                                                    id="source_code_url"
                                                    type="text"
                                                    placeholder="e.g. https://github.com/HakimFIDJEL/my-project.git"
                                                    required
                                                    onChange={(e) =>
                                                        setData("source_code_url", e.target.value)
                                                    }
                                                    className={
                                                        errors.source_code_url ? "border-red-500" : ""
                                                    }
                                                />
                                            </div>
                                            <div className="grid gap-2 col-span-6">
                                                <Label htmlFor="live_demo_url">
                                                    Live demo URL
                                                </Label>
                                                <Input
                                                    id="live_demo_url"
                                                    type="text"
                                                    placeholder="e.g. https://my-project.fr"
                                                    required
                                                    onChange={(e) =>
                                                        setData("live_demo_url", e.target.value)
                                                    }
                                                    className={
                                                        errors.live_demo_url ? "border-red-500" : ""
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>
                                <TabsContent value="stacks" className="my-4">

                                    <div className="grid gap-4 my-4">
                                        {(stackCategories && stackCategories.length > 0) ? (
                                            stackCategories.map((category) => (
                                                <div key={category.id} >
                                                    <h4 className="text-lg font-semibold">
                                                        {category.label}
                                                    </h4>
                                                    <Separator className="mt-1" />

                                                    <div className="grid gap-4 my-2">
                                                        {( category.stacks && category.stacks.length > 0 ) ? (
                                                            <ToggleGroup 
                                                                variant="outline" 
                                                                type="multiple" 
                                                                className = "flex gap-2 items-start justify-start"
                                                                onValueChange={handleToggleChange}
                                                                value={selectedStacks}
                                                            >
                                                                {category.stacks.map((stack) => (
                                                                    <ToggleGroupItem 
                                                                        value={stack.id.toString()} 
                                                                        aria-label={stack.label}
                                                                        className="px-6 py-2"
                                                                        key={stack.id}
                                                                    >
                                                                        {stack.label}
                                                                    </ToggleGroupItem>
                                                                ))}
                                                            </ToggleGroup>
                                                        ) : (
                                                            <div>
                                                                No stacks available
                                                            </div>
                                                        )}
                                                    </div>

                                                </div>
                                            ))
                                        ) : (
                                            <div>No categories available</div>
                                        )}
                                    </div>


                                </TabsContent>

                                <TabsContent value="images" className="my-4">
                                    Here you can add images
                                </TabsContent>
                                <TabsContent value="timeline" className="my-4">
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
