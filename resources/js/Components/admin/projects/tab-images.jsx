// Needed imports
import { useEffect } from "react";

// Icons
import { Trash } from "lucide-react";

// Components
import { Button } from "@/Components/ui/button";
import { Separator } from "@/Components/ui/separator";
import { FileUploader } from "@/Components/admin/file-uploader";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export function TabImages({ images, existingImages, setImages, setData }) {

    useEffect(() => {
        const fetchAndFormatImages = async () => {
            const formatedImages = await Promise.all(
                existingImages.map(async (image) => {
                    const blob = await generateImageBlob(image.full_url);
                    const extension = image.extension || "png";
                    const file = new File(
                        [blob],
                        `${image.caption || "default"}.${extension}`,
                        {
                            type: image.mime_type || "image/png",
                        }
                    );

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
    }, [existingImages]);

    async function generateImageBlob(url) {
        const response = await fetch(url); // Récupère l'image
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.blob(); 
    }

    function setImagesData(images) {
        setData("images", images);
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

    return (
        <>
            <div className="grid grid-cols-12 gap-8 items-start">
                <div className="grid col-span-6">
                    <p className="text-lg font-semibold">File drop</p>
                    <Separator className="mt-1" />

                    <FileUploader
                        onSubmitFile={onSubmitImage}
                        className="my-4"
                        accept="image/*"
                    />
                </div>

                <div className="grid col-span-6">
                    <p className="text-lg font-semibold">
                        Uploaded images{" "}
                        {images.length > 0 ? `( ${images.length} )` : ""}
                    </p>

                    <Separator className="mt-1" />

                    <div className="grid gap-4 my-4">
                        {images.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Preview</TableHead>
                                        <TableHead>Label</TableHead>
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
                                                            src={URL.createObjectURL(
                                                                image.file
                                                            )}
                                                            alt={image.label}
                                                            className="w-16 h-16 cursor-pointer object-cover rounded-lg"
                                                        />
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[425px]">
                                                        <DialogHeader>
                                                            <DialogTitle>
                                                                {image.label}
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
                                            <TableCell>{image.label}</TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() =>
                                                        handleRemoveImage(index)
                                                    }
                                                >
                                                    <Trash />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <div>No images uploaded</div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
