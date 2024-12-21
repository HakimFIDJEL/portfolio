// Needed imports
import { router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { useRoute } from "ziggy";
import { useForm } from "@inertiajs/react";

// Icons
import { Trash, Download, Upload, Loader2 } from "lucide-react";

// Components
import { Button } from "@/Components/ui/button";
import { Separator } from "@/Components/ui/separator";
import { FileUploader } from "@/Components/admin/file-uploader";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { AppAlert } from "@/Components/admin/app-alert";

export function TabPfp({ user }) {
    const route = useRoute();

    const [pfp, setPfp] = useState(null);
    const [deletingPfp, setDeletingPfp] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        pfp: pfp,
    });

    function handleDeleteClick(e) {
        e.preventDefault();
        setIsDialogOpen(true);
    }

    function dismissDelete() {
        setIsDialogOpen(false);
    }

    function onSubmitPfpFile(file) {
        setPfp(file);
        setData("pfp", file);
    }

    function onSubmitPfpForm(e) {
        e.preventDefault();
        post(route("admin.account.updatePfp"), {
            onSuccess: () => {
                console.log("success");
            },
        });
    }

    function onDeletePfp(e) {
        e.preventDefault();
        setIsDialogOpen(false);
        router.delete(route("admin.account.deletePfp"), {
            onStart: () => {
                setDeletingPfp(true);
            },
            onFinish: () => {
                setDeletingPfp(false);
                setData("pfp", null);
                setPfp(null);
            },
        });
    }

    useEffect(() => {
        if (user.pfp_url) {
            setPfp(user.pfp_url);
        }
    }, [user.pfp_url]);

    return (
        <>
            {user.pfp_url ? (
                <>
                    <Card className="mt-4">
                        <CardHeader>
                            <CardTitle>Your profile picture</CardTitle>
                            <CardDescription>
                                <span className="flex flex-between gap-2">
                                    <p className="pt-4">
                                        You can either download your profile picture or delete
                                        it. If you delete it, you will be able to upload
                                        a new one.
                                    </p>
                                    <a href={user.full_pfp_url} target="_blank" className="w-32 h-32 flex-shrink-0">
                                        <img
                                            src={user.full_pfp_url}
                                            alt="Profile picture"
                                            className="mt-4 w-32 h-32 rounded-lg"
                                        />
                                    </a>
                                </span>
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <span className="grid grid-cols-12 mt-4 gap-2">
                        <a
                            href={user.full_pfp_url}
                            target="_blank"
                            className="col-span-6"
                        >
                            <Button
                                type="button"
                                variant="secondary"
                                className="w-full"
                            >
                                Download profile picture <Download />
                            </Button>
                        </a>
                        <Button
                            type="button"
                            className="col-span-6"
                            variant="destructive"
                            onClick={handleDeleteClick}
                            disabled={deletingPfp}
                        >
                            Delete profile picture
                            <Trash hidden={deletingPfp} />
                            <Loader2
                                hidden={!deletingPfp}
                                className="animate-spin"
                            />
                        </Button>
                    </span>
                </>
            ) : (
                <>
                    <Card className="mt-4">
                        <CardHeader>
                            <CardTitle>You don't have a profile picture yet</CardTitle>
                            <CardDescription>
                                You can upload your profilte picture here. It will be
                                available for download by other users.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <form onSubmit={onSubmitPfpForm}>
                        <div className="grid col-span-6 mt-4">
                            <p className="text-lg font-semibold">File drop</p>
                            <Separator className="mt-1" />

                            <FileUploader
                                onSubmitFile={onSubmitPfpFile}
                                className="my-4"
                                accept="image/*"
                            />
                        </div>

                        {pfp && (
                            <Button
                                type="submit"
                                variant="secondary"
                                className="mt-4 w-full"
                                disabled={processing}
                            >
                                Upload profile picture
                                <Upload hidden={processing} />
                                <Loader2
                                    hidden={!processing}
                                    className="animate-spin"
                                />
                            </Button>
                        )}
                    </form>
                </>
            )}

            <AppAlert
                isDialogOpen={isDialogOpen}
                dismissDelete={dismissDelete}
                confirmDelete={onDeletePfp}
            />
        </>
    );
}
