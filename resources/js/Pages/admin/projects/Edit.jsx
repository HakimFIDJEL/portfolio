// Needed imports
import Layout from "@/Layouts/admin";
import { Link } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import { useRoute } from "ziggy";
import { useState, useRef, useEffect } from "react";
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
    Settings2,
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

function Projects({ project, stackCategories }) {
    const route = useRoute();
    const { toast } = useToast();


    // Project.images are different from the images state, we have to use the full_url and label fields to display the images by creating File objects



    const [selectedStacks, setSelectedStacks] = useState(project.stacks.map((stack) => stack.id.toString()));
    const [images, setImages] = useState([]);
    const [timeline, setTimeline] = useState(project.timeline);

    useEffect(() => {
        const fetchAndFormatImages = async () => {
            const formatedImages = await Promise.all(
                project.images.map(async (image) => {
                    const blob = await generateImageBlob(image.full_url);
                    const extension = image.extension || "png";
                    const file = new File([blob], `${image.caption || "default"}.${extension}`, {
                        type: image.mime_type || "image/png",
                    });
        
                    return {
                        file: file,
                        label: image.caption || "No label",
                    };
                })
            );
        
            setImages(formatedImages);
            setImagesData(formatedImages);
        };
        
    
        fetchAndFormatImages();
    }, [project.images]);
    
    // Fonction asynchrone pour générer un Blob à partir de l'URL
    async function generateImageBlob(url) {
        const response = await fetch(url); // Récupère l'image
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.blob(); // Retourne le Blob
    }
    


    const { data, setData, post, processing, errors } = useForm({
        // Projet data
        type: project.type ?? "",
        title: project.title ?? "",
        subtitle: project.subtitle ?? "",
        description: project.description ?? "",
        feedback: project.feedback ?? "",
        end_date: project.end_date ?? "",
        work_in_progress: project.work_in_progress.toString() ?? "",
        source_code_url: project.source_code_url ?? "",
        live_demo_url: project.live_demo_url ?? "",
        timeline_url: project.timeline_url ?? "",

        // Project images
        images: images,

        // Project timeline
        timeline: timeline,

        // Project stacks
        stacks: selectedStacks,
    });

  


    // Timeline
    
    const [timelineDialogOpen, setTimelineDialogOpen] = useState(false);
    const [timelineDuration, setTimelineDuration] = useState("");
    const [timelineTitle, setTimelineTitle] = useState("");
    const [timelineDate, setTimelineDate] = useState("");
    const timelineTitleRef = useRef(null);
    const timelineDurationRef = useRef(null);

    
    function onSubmit(e) {
        e.preventDefault();
        post(route("admin.projects.update", project.id));
    }

    function handleToggleChange(e) {
        const updatedStacks = e;
        setSelectedStacks(updatedStacks);
        setStacksData(updatedStacks);
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
    

    function onSubmitTimeline(e) {
        e.preventDefault();

        if (!timelineTitle) {
            timelineTitleRef.current.focus();
            return;
        }

        if (!timelineDate) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "The starting date is required",
            });
            return;
        }

        if (!timelineDuration) {
            timelineDurationRef.current.focus();
            return;
        }

        const updatedTimeline = [
            ...timeline,
            {
                title: timelineTitle,
                date: timelineDate,
                duration: timelineDuration,
            },
        ];

        setTimeline(updatedTimeline);
        setTimelineData(updatedTimeline);
        
        setTimelineDialogOpen(false);
        clearTimelineInfo();
    }

    function handleRemoveTimeline(index) {
        const updatedTimeline = timeline.filter((event, i) => i !== index);

        setTimeline(updatedTimeline);
        setTimelineData(updatedTimeline);

        clearTimelineInfo();
    }


    function clearTimelineInfo() {
        setTimelineDuration("");
        setTimelineTitle("");
        setTimelineDate("");
    }

    function formatDate(date) {
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return new Date(date).toLocaleDateString("en-US", options);
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
                            Edit a project
                        </CardTitle>
                        <CardDescription>
                            Here you can edit a project
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
                                    <h4 className="text-lg font-semibold">
                                        Informations
                                    </h4>
                                    <Separator className="mt-1" />
                                    <div className="grid gap-4 my-4">
                                        <div className="grid grid-cols-12 gap-2">
                                            
                                            {/* Title */}
                                            <div className="grid gap-2 col-span-6">
                                                <Label htmlFor="title">Title</Label>
                                                <Input
                                                    id="title"
                                                    type="text"
                                                    placeholder="e.g. My awesome project"
                                                    required
                                                    value={data.title}
                                                    onChange={(e) => {
                                                        const title = e.target.value;
                                                        setData("title", title); // Met à jour dans le formulaire
                                                    }}
                                                    className={errors.title ? "border-red-500" : ""}
                                                />
                                            </div>

                                            <div className="grid gap-2 col-span-6">
                                                <Label htmlFor="subtitle">
                                                    Subtitle
                                                </Label>
                                                <Input
                                                    id="subtitle"
                                                    type="text"
                                                    placeholder="e.g. A project that does something"
                                                    required
                                                    value={data.subtitle}
                                                    onChange={(e) =>
                                                        setData(
                                                            "subtitle",
                                                            e.target.value
                                                        )
                                                    }
                                                    className={
                                                        errors.subtitle
                                                            ? "border-red-500"
                                                            : ""
                                                    }
                                                />
                                            </div>

                                        </div>
                                        <div className="grid grid-cols-12 gap-2">
                                            <div className="grid gap-2 col-span-4">
                                                <Label htmlFor="type">
                                                    Type
                                                </Label>
                                                <Select
                                                    onValueChange={(value) =>
                                                        setData("type", value)
                                                    }
                                                    required
                                                    value={data.type ? data.type.toString() : ""}
                                                    className={
                                                        errors.type
                                                            ? "border-red-500"
                                                            : ""
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="project">
                                                            Project
                                                        </SelectItem>
                                                        <SelectItem
                                                            value="lab"
                                                            className="flex"
                                                        >
                                                            Lab
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="grid gap-2 col-span-4">
                                                <Label htmlFor="end_date">
                                                    End date 
                                                    <span className="ml-1 text-gray-500">
                                                        (optional)
                                                    </span>
                                                </Label>
                                                <Datepicker
                                                    onDateChange={(date) =>
                                                        setData("end_date",date)
                                                    }
                                                    newDate={data.end_date}
                                                />
                                            </div>
                                            <div className="grid gap-2 col-span-4">
                                                <Label htmlFor="work_in_progress">
                                                    Status
                                                </Label>
                                                <Select
                                                    onValueChange={(value) =>
                                                        setData(
                                                            "work_in_progress",
                                                            value
                                                        )
                                                    }
                                                    value={data.work_in_progress ? data.work_in_progress.toString() : ""}
                                                    required
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select the status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="1">
                                                            Work in progress
                                                        </SelectItem>
                                                        <SelectItem value="0">
                                                            Project done
                                                        </SelectItem>
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
                                                value={data.description}
                                                onChange={(e) =>
                                                    setData(
                                                        "description",
                                                        e.target.value
                                                    )
                                                }
                                                className={
                                                    errors.description
                                                        ? "border-red-500"
                                                        : ""
                                                }
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="feedback">
                                                Feedback
                                                <span className="ml-1 text-gray-500">
                                                    (optional)
                                                </span>
                                            </Label>
                                            <Textarea
                                                id="feedback"
                                                type="text"
                                                placeholder="e.g. I learned a lot from this project"
                                                
                                                value={data.feedback}
                                                onChange={(e) =>
                                                    setData(
                                                        "feedback",
                                                        e.target.value
                                                    )
                                                }
                                                className={
                                                    errors.feedback
                                                        ? "border-red-500"
                                                        : ""
                                                }
                                            />
                                        </div>
                                    </div>

                                    <h4 className="text-lg font-semibold">
                                        Links
                                    </h4>
                                    <Separator className="mt-1" />
                                    <div className="grid gap-4 my-4">
                                        <div className="grid grid-cols-12 gap-2">
                                            <div className="grid gap-2 col-span-4">
                                                <Label htmlFor="source_code_url">
                                                    Source code URL
                                                    <span className="ml-1 text-gray-500">
                                                        (optional)
                                                    </span>
                                                </Label>
                                                <Input
                                                    id="source_code_url"
                                                    type="text"
                                                    placeholder="e.g. https://github.com/HakimFIDJEL/my-project.git"
                                                    onChange={(e) =>
                                                        setData(
                                                            "source_code_url",
                                                            e.target.value
                                                        )
                                                    }
                                                    value={data.source_code_url}
                                                    className={
                                                        errors.source_code_url
                                                            ? "border-red-500"
                                                            : ""
                                                    }
                                                />
                                            </div>
                                            <div className="grid gap-2 col-span-4">
                                                <Label htmlFor="live_demo_url">
                                                    Live demo URL
                                                    <span className="ml-1 text-gray-500">
                                                        (optional)
                                                    </span>
                                                </Label>
                                                <Input
                                                    id="live_demo_url"
                                                    type="text"
                                                    value={data.live_demo_url}
                                                    placeholder="e.g. https://my-project.fr"
                                                    onChange={(e) =>
                                                        setData(
                                                            "live_demo_url",
                                                            e.target.value
                                                        )
                                                    }
                                                    className={
                                                        errors.live_demo_url
                                                            ? "border-red-500"
                                                            : ""
                                                    }
                                                />
                                            </div>
                                            <div className="grid gap-2 col-span-4">
                                                <Label htmlFor="timeline_url">
                                                    Timeline URL
                                                    <span className="ml-1 text-gray-500">
                                                        (optional)
                                                    </span>
                                                </Label>
                                                <Input
                                                    id="timeline_url"
                                                    type="text"
                                                    value={data.timeline_url}
                                                    placeholder="e.g. https://github.com/commits/HakimFIDJEL/my-project.git"
                                                    onChange={(e) =>
                                                        setData(
                                                            "timeline_url",
                                                            e.target.value
                                                        )
                                                    }
                                                    className={
                                                        errors.timeline_url
                                                            ? "border-red-500"
                                                            : ""
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="stacks" className="my-4">
                                    <div className="grid gap-4 my-4">
                                        {stackCategories &&
                                        stackCategories.length > 0 ? (
                                            stackCategories.map((category) => (
                                                <div key={category.id}>
                                                    <h4 className="text-lg font-semibold">
                                                        {category.label}
                                                    </h4>
                                                    <Separator className="mt-1" />

                                                    <div className="grid gap-4 my-2">
                                                        {category.stacks &&
                                                        category.stacks.length >
                                                            0 ? (
                                                            <ToggleGroup
                                                                variant="outline"
                                                                type="multiple"
                                                                className="flex gap-2 items-start justify-start"
                                                                onValueChange={
                                                                    handleToggleChange
                                                                }
                                                                value={
                                                                    selectedStacks
                                                                }
                                                            >
                                                                {category.stacks.map(
                                                                    (stack) => (
                                                                        <ToggleGroupItem
                                                                            value={stack.id.toString()}
                                                                            aria-label={
                                                                                stack.label
                                                                            }
                                                                            className="px-6 py-2"
                                                                            key={
                                                                                stack.id
                                                                            }
                                                                        >
                                                                            {
                                                                                stack.label
                                                                            }
                                                                        </ToggleGroupItem>
                                                                    )
                                                                )}
                                                            </ToggleGroup>
                                                        ) : (
                                                            <div>
                                                                No stacks
                                                                available
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
                                                            {images.map((image, index) => (
                                                                    <TableRow key={index}>
                                                                        <TableCell>
                                                                            <Dialog>
                                                                                <DialogTrigger asChild>
                                                                                    <img
                                                                                        src={URL.createObjectURL(image.file)}
                                                                                        alt={image.label}
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
                                                                                                className="w-full h-full pt-4"
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
                                    <div className="grid gap-4 my-4">
                                        <div className="flex justify-end">
                                            <AlertDialog
                                                onOpenChange={
                                                    setTimelineDialogOpen
                                                }
                                                open={timelineDialogOpen}
                                            >
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        type="button"
                                                        variant="secondary"
                                                    >
                                                        Add a new timeline event
                                                        <Plus />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent className="sm:max-w-[425px]">
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>
                                                            Add a new timeline
                                                            event
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Fill the form to add
                                                            a new timeline event
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <div className="grid gap-4 py-4">
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label
                                                                htmlFor="title"
                                                                className="text-right"
                                                            >
                                                                Title
                                                            </Label>
                                                            <Input
                                                                id="title"
                                                                type="text"
                                                                required
                                                                className="col-span-3"
                                                                onChange={(e) =>
                                                                    setTimelineTitle(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                placeholder="e.g. Started the project"
                                                                ref={
                                                                    timelineTitleRef
                                                                }
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label
                                                                htmlFor="username"
                                                                className="text-right"
                                                            >
                                                                Start Date
                                                            </Label>
                                                            <Datepicker
                                                                className="col-span-3"
                                                                onDateChange={(
                                                                    date
                                                                ) =>
                                                                    setTimelineDate(
                                                                        date
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label
                                                                htmlFor="username"
                                                                className="text-right"
                                                            >
                                                                Duration
                                                            </Label>
                                                            <Input
                                                                id="duration"
                                                                type="text"
                                                                required
                                                                className="col-span-3"
                                                                onChange={(e) =>
                                                                    setTimelineDuration(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                placeholder="e.g. 1 month"
                                                                ref={
                                                                    timelineDurationRef
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel
                                                            asChild
                                                        >
                                                            <Button
                                                                type="button"
                                                                size="sm"
                                                                variant="secondary"
                                                                onClick={() =>
                                                                    setTimelineDialogOpen(
                                                                        false
                                                                    )
                                                                }
                                                            >
                                                                Cancel
                                                            </Button>
                                                        </AlertDialogCancel>

                                                        <AlertDialogAction
                                                            asChild
                                                        >
                                                            <Button
                                                                size="sm"
                                                                className="px-6"
                                                                onClick={
                                                                    onSubmitTimeline
                                                                }
                                                            >
                                                                Add
                                                                <Plus />
                                                            </Button>
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Title</TableHead>
                                                    <TableHead>Date</TableHead>
                                                    <TableHead>
                                                        Duration
                                                    </TableHead>
                                                    <TableHead className="text-right">
                                                        Remove
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>

                                            {timeline.length > 0 ? (
                                                <TableBody>
                                                    {/* Timeline Events */}

                                                    {timeline.map(
                                                        (event, index) => (
                                                            <TableRow key={index}>
                                                                
                                                                <TableCell>
                                                                    {event.title}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {formatDate(event.date)}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {event.duration}
                                                                </TableCell>
                                                                <TableCell className="text-right">
                                                                    <Button
                                                                        variant="destructive"
                                                                        size="icon"
                                                                        onClick={() => handleRemoveTimeline(index)}
                                                                    >
                                                                        <Trash />
                                                                    </Button>
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    )}
                                                </TableBody>
                                            ) : (
                                                <TableFooter>
                                                    <TableRow>
                                                        <TableCell colSpan={4}>
                                                            Error
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            There is no timeline
                                                            to display
                                                        </TableCell>
                                                    </TableRow>
                                                </TableFooter>
                                            )}
                                        </Table>
                                    </div>
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
