// Needed imports

import { useState, useRef } from "react";

// Icons
import {
    Plus,
    Trash,
} from "lucide-react";

// Components
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/components/ui/label";
import { Datepicker } from "@/components/ui/datepicker";
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

export function TabTimeline({ timeline }) {

    // Timeline

    const [timelineDialogOpen, setTimelineDialogOpen] = useState(false);
    const [timelineDuration, setTimelineDuration] = useState("");
    const [timelineTitle, setTimelineTitle] = useState("");
    const [timelineDate, setTimelineDate] = useState("");
    const timelineTitleRef = useRef(null);
    const timelineDurationRef = useRef(null);

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
                            <TableHead>Title</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead className="text-right">Remove</TableHead>
                        </TableRow>
                    </TableHeader>

                    {timeline.length > 0 ? (
                        <TableBody>
                            {/* Timeline Events */}

                            {timeline.map((event, index) => (
                                <TableRow key={index}>
                                    <TableCell>{event.title}</TableCell>
                                    <TableCell>
                                        {formatDate(event.date)}
                                    </TableCell>
                                    <TableCell>{event.duration}</TableCell>
                                    <TableCell className="text-right">
                                        <Button
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
