// Needed imports
import Layout from "@/Layouts/admin";
import { Link } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import { useRoute } from "ziggy";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

// Icons
import {
    Loader2,
    ArrowLeft,
    Folder,
    Plus,
    Archive,
    TestTubeDiagonal,
    Trash,
    ArrowUp,
    ArrowDown,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Datepicker } from "@/components/ui/datepicker";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ImageUploader } from "@/Components/admin/image-uploader";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter,
} from "@/components/ui/table";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Custom components
import { TabProject } from "@/Components/admin/projects/tab-project";
import { TabStacks } from "@/Components/admin/projects/tab-stacks";
import { TabTimeline } from "@/Components/admin/projects/tab-timeline";

function Projects({ stackCategories }) {
    const route = useRoute();
    const { toast } = useToast();

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
        end_date: "",
        work_in_progress: false,
        source_code_url: "",
        live_demo_url: "",
        timeline_url: "",

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

    

    function onSubmitImage(image) {
        const updatedImages = [...images, image];
        setImages(updatedImages);
        setImagesData(updatedImages);
    }

    function handleRemoveImage(index) {
        const updatedImages = images.filter((image, i) => i !== index);
        setImages(updatedImages);
        setImagesData(updatedImages);
    }



    function setImagesData(images) {
        setData("images", images);
    }

    function setTimelineData(timeline) {
        setData("timeline", timeline);
    }

    function setStacksData(stacks) {
        setData("stacks", stacks);
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
                                        value="images"
                                        className="w-full"
                                    >
                                        Images
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="timeline"
                                        className="w-full"
                                    >
                                        Timeline
                                    </TabsTrigger>
                                </TabsList>

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

                                <TabsContent value="images" className="my-4">
                                    <div className="grid grid-cols-12 gap-8 items-start">
                                        <div className="grid col-span-6">
                                            <p className="text-lg font-semibold">
                                                File drop
                                            </p>
                                            <Separator className="mt-1" />

                                            <ImageUploader
                                                onSubmitImage={onSubmitImage}
                                                className="my-4"
                                            />
                                        </div>

                                        <div className="grid col-span-6">
                                            <p className="text-lg font-semibold">
                                                Uploaded images{" "}
                                                {images.length > 0
                                                    ? `( ${images.length} )`
                                                    : ""}
                                            </p>

                                            <Separator className="mt-1" />

                                            <div className="grid gap-4 my-4">
                                                {images.length > 0 ? (
                                                    <Table>
                                                        <TableHeader>
                                                            <TableRow>
                                                                <TableHead>
                                                                    Preview
                                                                </TableHead>
                                                                <TableHead>
                                                                    Label
                                                                </TableHead>
                                                                <TableHead className="text-right">
                                                                    Remove
                                                                </TableHead>
                                                            </TableRow>
                                                        </TableHeader>

                                                        <TableBody>
                                                            {images.map(
                                                                (
                                                                    image,
                                                                    index
                                                                ) => (
                                                                    <TableRow
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        <TableCell>
                                                                            <Dialog>
                                                                                <DialogTrigger
                                                                                    asChild
                                                                                >
                                                                                    <img
                                                                                        src={URL.createObjectURL(
                                                                                            image.file
                                                                                        )}
                                                                                        alt={
                                                                                            image.label
                                                                                        }
                                                                                        className="w-16 h-16 cursor-pointer object-cover rounded-lg"
                                                                                    />
                                                                                </DialogTrigger>
                                                                                <DialogContent className="sm:max-w-[425px]">
                                                                                    <DialogHeader>
                                                                                        <DialogTitle>
                                                                                            {
                                                                                                image.label
                                                                                            }
                                                                                        </DialogTitle>
                                                                                        <DialogDescription>
                                                                                            <img
                                                                                                src={URL.createObjectURL(
                                                                                                    image.file
                                                                                                )}
                                                                                                alt={
                                                                                                    image.label
                                                                                                }
                                                                                                className="w-full h-64 pt-4"
                                                                                            />
                                                                                        </DialogDescription>
                                                                                    </DialogHeader>
                                                                                </DialogContent>
                                                                            </Dialog>
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            {
                                                                                image.label
                                                                            }
                                                                        </TableCell>
                                                                        <TableCell className="text-right">
                                                                            <Button
                                                                                variant="destructive"
                                                                                size="icon"
                                                                                onClick={() =>
                                                                                    handleRemoveImage(
                                                                                        index
                                                                                    )
                                                                                }
                                                                            >
                                                                                <Trash />
                                                                            </Button>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                )
                                                            )}
                                                        </TableBody>
                                                    </Table>
                                                ) : (
                                                    <div>
                                                        No images uploaded
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="timeline" className="my-4">

                                    <TabTimeline 
                                        timeline={timeline}
                                        setTimeline={setTimeline}
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
