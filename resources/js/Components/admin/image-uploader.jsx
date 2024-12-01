// Needed imports
import React, { useState, useRef } from "react";

// Components
import { Upload, SendHorizonal, Loader2, Trash } from "lucide-react";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
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
} from "@/components/ui/alert-dialog"

export function ImageUploader({ onSubmitImage, ...props }) {
    const labelInput = useRef(null);
    const fileInput = useRef(null);

    const [file, setFile] = useState(null);
    const [label, setLabel] = useState("");

    const [uploaded, setUploaded] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [submiting, setSubmiting] = useState(false);


    function handleUpload(e) {
        const file = e.target.files[0];
        setFile(file);
        setUploaded(true);
    }

    function handleRemoveFile() {
        setFile(null);
        setUploaded(false);
        fileInput.current.value = "";
    }

    function handleOpenCloseDialog(e) {
        setUploading(e);
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!file) {
            fileInput.current.focus();
            return;
        }

        if (!label) {
            labelInput.current.focus();
            return;
        }

        setSubmiting(true);

        // Create the image object, return the file with the label inside
        const image = {
            file,
            label,
        };

        // Call the onSubmitImage function with the image object
        onSubmitImage(image);

        // Reset the form
        setSubmiting(false);
        setUploading(false);
        setUploaded(false);
        setFile(null);
        setLabel("");
        fileInput.current.value = "";
    }

    return (
        <div {...props}>
            <div className="flex w-full  items-center gap-2">
                <Input
                    id="picture"
                    type="file"
                    ref={fileInput}
                    accept="image/*"
                    onChange={handleUpload}
                />

                <AlertDialog onOpenChange={handleOpenCloseDialog} open={uploading}>
                    <AlertDialogTrigger asChild>
                        <Button
                            type="button"
                            size="sm"
                            disabled={!uploaded || uploading}
                            className="px-6"
                        >
                            Upload
                            <Loader2
                                hidden={!uploading}
                                className="animate-spin"
                            />
                            <Upload hidden={uploading} />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Choose a label for the image
                            </AlertDialogTitle>
                            <AlertDialogDescription asChild>
                                <div className="grid gap-4 pt-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="label">Label</Label>
                                        <Input
                                            id="label"
                                            type="text"
                                            ref={labelInput}
                                            required
                                            value={label}
                                            onChange={(e) =>
                                                setLabel(e.target.value)
                                            }
                                            placeholder="e.g. My awesome image"
                                        />
                                    </div>
                                </div>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel asChild>
                                <Button
                                    type="button"
                                    size="sm"
                                    variant="secondary"
                                    onClick={() => setUploading(false)}
                                >
                                    Cancel
                                </Button>
                            </AlertDialogCancel>
                            <AlertDialogAction asChild>
                                <Button
                                    type="button"
                                    size="sm"
                                    className="px-6"
                                    onClick={handleSubmit}
                                    disabled={submiting}
                                >
                                    Submit
                                    <Loader2
                                        hidden={!submiting}
                                        className="animate-spin"
                                    />
                                    <SendHorizonal hidden={submiting} />
                                </Button>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                {uploaded && (
                    <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        onClick={handleRemoveFile}
                    >
                        <Trash />
                    </Button>
                )}
            </div>
        </div>
    );
}
