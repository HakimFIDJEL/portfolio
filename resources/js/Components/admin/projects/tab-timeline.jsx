// Needed imports
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

// Icons
import { Plus, Trash, ArrowUp, ArrowDown, Settings2 } from "lucide-react";

// Components
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Datepicker } from "@/Components/ui/datepicker";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter,
} from "@/Components/ui/table";
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
} from "@/Components/ui/alert-dialog";

export function TabTimeline({ timeline, setTimeline, setData }) {
    // Timeline

    const { toast } = useToast();

    const [timelineDialogOpen, setTimelineDialogOpen] = useState(false);

    const [timelineDuration, setTimelineDuration] = useState("");
    const [timelineTitle, setTimelineTitle] = useState("");
    const [timelineDate, setTimelineDate] = useState("");

    const timelineTitleRef = useRef(null);
    const timelineDurationRef = useRef(null);

    const [editedEvent, setEditedEvent] = useState(null);


    const handleInputChange = (field, value) => {
        setEditedEvent((prev) => ({ ...prev, [field]: value }));
    };

    const handleSaveChanges = () => {
        onEditTimeline(editedEvent);
        setEditedEvent(null);
    };

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
                index: timeline.length,
            },
        ];

        setTimeline(updatedTimeline);
        setData("timeline", updatedTimeline);

        setTimelineDialogOpen(false);
        clearTimelineInfo();
    }

    function onEditTimeline(editedEvent) {
        const updatedTimeline = timeline.map((event) => {
            if (event.index === editedEvent.index) {
                return editedEvent;
            }

            return event;
        });

        setTimeline(updatedTimeline);
        setData("timeline", updatedTimeline);

        setEditedEvent(null);
    }

    function handleRemoveTimeline(index) {

        // update the timeline events by removing the event and updating the index of the remaining events
        const updatedTimeline = timeline
            .filter((event) => event.index !== index)
            .map((event, i) => ({ ...event, index: i }));
            



        setTimeline(updatedTimeline);
        setData("timeline", updatedTimeline);

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

    function incrementIndex(event) {

        if(event.index === 0) {
            return;
        }

        const updatedTimeline = timeline.map((item) => {
            if (item.index === event.index - 1) {
                return {
                    ...item,
                    index: item.index + 1,
                };
            }

            if (item.index === event.index) {
                return {
                    ...item,
                    index: item.index - 1,
                };
            }

            return item;
        });

        setTimeline(updatedTimeline);
        setData("timeline", updatedTimeline);
    }

    function decrementIndex(event) {

        if(event.index === timeline.length - 1) {
            return;
        }

        const updatedTimeline = timeline.map((item) => {
            if (item.index === event.index + 1) {
                return {
                    ...item,
                    index: item.index - 1,
                };
            }

            if (item.index === event.index) {
                return {
                    ...item,
                    index: item.index + 1,
                };
            }

            return item;
        });

        setTimeline(updatedTimeline);
        setData("timeline", updatedTimeline);
    }

    return (
        <>
            <div className="grid gap-4 my-4">
                <div className="flex justify-end">
                    <AlertDialog
                        onOpenChange={setTimelineDialogOpen}
                        open={timelineDialogOpen}
                    >
                        <AlertDialogTrigger asChild>
                            <Button type="button" variant="secondary">
                                Add a new timeline event
                                <Plus />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="sm:max-w-[425px]">
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Add a new timeline event
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    Fill the form to add a new timeline event
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
                                            setTimelineTitle(e.target.value)
                                        }
                                        placeholder="e.g. Started the project"
                                        ref={timelineTitleRef}
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
                                        onDateChange={(date) =>
                                            setTimelineDate(date)
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
                                            setTimelineDuration(e.target.value)
                                        }
                                        placeholder="e.g. 1 month"
                                        ref={timelineDurationRef}
                                    />
                                </div>
                            </div>
                            <AlertDialogFooter>
                                <AlertDialogCancel asChild>
                                    <Button
                                        type="button"
                                        size="sm"
                                        variant="secondary"
                                        onClick={() =>
                                            setTimelineDialogOpen(false)
                                        }
                                    >
                                        Cancel
                                    </Button>
                                </AlertDialogCancel>

                                <AlertDialogAction asChild>
                                    <Button
                                        size="sm"
                                        className="px-6"
                                        onClick={onSubmitTimeline}
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
                            <TableHead>Index</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead className="text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    {timeline.length > 0 ? (
                        <TableBody>
                            {/* Timeline Events */}

                            {timeline
                                .sort((a, b) => a.index - b.index)
                                .map((event, index) => (
                                    <TableRow key={index}>
                                        {/* Index */}
                                        <TableCell className="flex items-center gap-1 justify-start">
                                            {/* Increment index */}
                                            <Button
                                                type="button"
                                                variant="secondary"
                                                size="icon"
                                                onClick={() =>
                                                    incrementIndex(event)
                                                }
                                                disabled={event.index === 0}
                                            >
                                                <ArrowUp />
                                            </Button>

                                            {/* Decrement index */}
                                            <Button
                                                type="button"
                                                variant="secondary"
                                                size="icon"
                                                onClick={() =>
                                                    decrementIndex(event)
                                                }
                                                disabled={
                                                    event.index ===
                                                    timeline.length - 1
                                                }
                                            >
                                                <ArrowDown />
                                            </Button>
                                        </TableCell>
                                        {/* Title */}
                                        <TableCell>{event.title}</TableCell>
                                        {/* Date */}
                                        <TableCell>
                                            {formatDate(event.date)}
                                        </TableCell>
                                        {/* Duration */}
                                        <TableCell>{event.duration}</TableCell>
                                        {/* Actions */}
                                        <TableCell className="flex gap-1 items-center justify-end">
                                            {/* edit */}

                                            <AlertDialog
                                                open={editedEvent?.index === event.index}
                                                onOpenChange={() => {
                                                    if (editedEvent) {
                                                        setEditedEvent(null);
                                                    } else {
                                                        setEditedEvent(event);
                                                    }
                                                }}
                                            >
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        type="button"
                                                        variant="secondary"
                                                        size="icon"
                                                        // onClick={() => handleOpenEditDialog(event)}
                                                    >
                                                        <Settings2 />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent className="sm:max-w-[425px]">
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>
                                                            Edit a timeline
                                                            event
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Fill the form to
                                                            edit a timeline
                                                            event
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
                                                                value={
                                                                    editedEvent?.title ||
                                                                    ""
                                                                }
                                                                onChange={(e) =>
                                                                    handleInputChange(
                                                                        "title",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                placeholder="e.g. Started the project"
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
                                                                newDate={
                                                                    editedEvent?.date
                                                                }
                                                                onDateChange={(
                                                                    date
                                                                ) =>
                                                                    handleInputChange(
                                                                        "date",
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
                                                                value={
                                                                    editedEvent?.duration ||
                                                                    ""
                                                                }
                                                                onChange={(e) =>
                                                                    handleInputChange(
                                                                        "duration",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                placeholder="e.g. 1 month"
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
                                                                    setEditedEvent(
                                                                        null
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
                                                                    handleSaveChanges
                                                                }
                                                            >
                                                                Edit
                                                                <Settings2 />
                                                            </Button>
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>

                                            {/* remove */}
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                onClick={() =>
                                                    handleRemoveTimeline(index)
                                                }
                                            >
                                                <Trash />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    ) : (
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={4}>Error</TableCell>
                                <TableCell className="text-right">
                                    There is no timeline to display
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    )}
                </Table>
            </div>
        </>
    );
}
