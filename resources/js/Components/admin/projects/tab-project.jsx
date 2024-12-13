// Components
import { Separator } from "@/Components/ui/separator";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Datepicker } from "@/components/ui/datepicker";
import { RichTextEditor } from "@/components/text-editor";

export function TabProject({ data, setData, errors }) {
    return (
        <>
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
                            value={data.title}
                            onChange={(e) => {
                                const title = e.target.value;
                                setData("title", title);
                            }}
                            className={errors.title ? "border-red-500" : ""}
                        />
                    </div>

                    <div className="grid gap-2 col-span-6">
                        <Label htmlFor="subtitle">Subtitle</Label>
                        <Input
                            id="subtitle"
                            type="text"
                            placeholder="e.g. A project that does something"
                            required
                            value={data.subtitle}
                            onChange={(e) =>
                                setData("subtitle", e.target.value)
                            }
                            className={errors.subtitle ? "border-red-500" : ""}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-12 gap-2">
                    <div className="grid gap-2 col-span-4">
                        <Label htmlFor="type">Type</Label>
                        <Select
                            onValueChange={(value) => setData("type", value)}
                            required
                            value={data.type ? data.type.toString() : ""}
                            className={errors.type ? "border-red-500" : ""}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="project">Project</SelectItem>
                                <SelectItem value="lab" className="flex">
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
                            onDateChange={(date) => setData("end_date", date)}
                            newDate={data.end_date}
                        />
                    </div>
                    <div className="grid gap-2 col-span-4">
                        <Label htmlFor="work_in_progress">Status</Label>
                        <Select
                            onValueChange={(value) =>
                                setData("work_in_progress", value)
                            }
                            value={
                                data.work_in_progress
                                    ? data.work_in_progress.toString()
                                    : ""
                            }
                            required
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select the status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">
                                    Work in progress
                                </SelectItem>
                                <SelectItem value="0">Project done</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    {/* <Textarea
                        id="description"
                        type="text"
                        placeholder="e.g. This project does something"
                        required
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className={errors.description ? "border-red-500" : ""}
                    /> */}
                    <RichTextEditor
                        id="description"
                        value={data.description}
                        onChange={(value) => setData("description", value)}
                        placeholder="e.g. This project does something"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="feedback">
                        Feedback
                        <span className="ml-1 text-gray-500">(optional)</span>
                    </Label>
                    {/* <Textarea
                        id="feedback"
                        type="text"
                        placeholder="e.g. I am very satisfied with the result"
                        value={data.feedback}
                        onChange={(e) => setData("feedback", e.target.value)}
                        className={errors.feedback ? "border-red-500" : ""}
                    /> */}
                    <RichTextEditor
                        id="feedback"
                        value={data.feedback}
                        onChange={(value) => setData("feedback", value)}
                        placeholder="e.g. I am very satisfied with the result"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="what_i_learned">
                        What I learned
                        <span className="ml-1 text-gray-500">(optional)</span>
                    </Label>
                    {/* <Textarea
                        id="what_i_learned"
                        type="text"
                        placeholder="e.g. I learned a lot from this project"
                        value={data.what_i_learned}
                        onChange={(e) => setData("what_i_learned", e.target.value)}
                        className={errors.what_i_learned ? "border-red-500" : ""}
                    /> */}
                    <RichTextEditor
                        id="what_i_learned"
                        value={data.what_i_learned}
                        onChange={(value) => setData("what_i_learned", value)}
                        placeholder="e.g. I learned a lot from this project"
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
                            <span className="ml-1 text-gray-500">
                                (optional)
                            </span>
                        </Label>
                        <Input
                            id="source_code_url"
                            type="text"
                            placeholder="e.g. https://github.com/HakimFIDJEL/my-project.git"
                            onChange={(e) =>
                                setData("source_code_url", e.target.value)
                            }
                            value={data.source_code_url}
                            className={
                                errors.source_code_url ? "border-red-500" : ""
                            }
                        />
                    </div>
                    <div className="grid gap-2 col-span-6">
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
                                setData("live_demo_url", e.target.value)
                            }
                            className={
                                errors.live_demo_url ? "border-red-500" : ""
                            }
                        />
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-2">
                    <div className="grid gap-2 col-span-6">
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
                                setData("timeline_url", e.target.value)
                            }
                            className={
                                errors.timeline_url ? "border-red-500" : ""
                            }
                        />
                    </div>
                    <div className="grid gap-2 col-span-6">
                        <Label htmlFor="readme_url">
                            Readme URL
                            <span className="ml-1 text-gray-500">
                                (optional)
                            </span>
                        </Label>
                        <Input
                            id="readme_url"
                            type="text"
                            value={data.readme_url}
                            placeholder="e.g. https://github.com/commits/HakimFIDJEL/my-project/blob/main/README.md"
                            onChange={(e) =>
                                setData("readme_url", e.target.value)
                            }
                            className={
                                errors.readme_url ? "border-red-500" : ""
                            }
                        />
                    </div>
                </div>


            </div>
        </>
    );
}
