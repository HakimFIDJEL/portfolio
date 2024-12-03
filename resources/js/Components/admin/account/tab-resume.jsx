// Needed imports
import { router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { useRoute } from "ziggy";
import { useForm } from "@inertiajs/react";

// Icons
import { Trash, Download, Upload, Loader2 } from "lucide-react";

// Components
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FileUploader } from "@/Components/admin/file-uploader";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { AppAlert } from "@/Components/admin/app-alert";

export function TabResume({ user }) {
    const route = useRoute();

    const [resume, setResume] = useState(null);
    const [deletingResume, setDeletingResume] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        resume: resume,
    });

    function handleDeleteClick(e) {
        e.preventDefault();
        setIsDialogOpen(true);
    }

    function dismissDelete() {
        setIsDialogOpen(false);
    }

    function onSubmitResumeFile(file) {
        setResume(file);
        setData("resume", file);
    }

    function onSubmitResumeForm(e) {
        e.preventDefault();
        post(route("admin.account.updateResume"), {
            onSuccess: () => {
                console.log("success");
            },
        });
    }

    function onDeleteResume(e) {
        e.preventDefault();
        setIsDialogOpen(false);
        router.delete(route("admin.account.deleteResume"), {
            onStart: () => {
                setDeletingResume(true);
            },
            onFinish: () => {
                setDeletingResume(false);
                setData("resume", null);
                setResume(null);
            },
        });
    }

    useEffect(() => {
        if (user.resume_path) {
            setResume(user.resume_path);
        }
    }, [user.resume_path]);

    return (
        <>
            {user.resume_path ? (
                <>
                    <Card className="mt-4">
                        <CardHeader>
                            <CardTitle>Your resume</CardTitle>
                            <CardDescription>
                                You can either download your resume or delete
                                it. If you delete it, you will be able to upload
                                a new one.
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <span className="grid grid-cols-12 mt-4 gap-2">
                        <a
                            href={user.full_resume_path}
                            target="_blank"
                            className="col-span-6"
                        >
                            <Button
                                type="button"
                                variant="secondary"
                                className="w-full"
                            >
                                Download resume <Download />
                            </Button>
                        </a>
                        <Button
                            type="button"
                            className="col-span-6"
                            variant="destructive"
                            onClick={handleDeleteClick}
                            disabled={deletingResume}
                        >
                            Delete resume
                            <Trash hidden={deletingResume} />
                            <Loader2
                                hidden={!deletingResume}
                                className="animate-spin"
                            />
                        </Button>
                    </span>
                </>
            ) : (
                <>
                    <Card className="mt-4">
                        <CardHeader>
                            <CardTitle>You don't have a resume yet</CardTitle>
                            <CardDescription>
                                You can upload your resume here. It will be
                                available for download by other users.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <form onSubmit={onSubmitResumeForm}>
                        <div className="grid col-span-6 mt-4">
                            <p className="text-lg font-semibold">File drop</p>
                            <Separator className="mt-1" />

                            <FileUploader
                                onSubmitFile={onSubmitResumeFile}
                                className="my-4"
                                accept="application/pdf"
                            />
                        </div>

                        {resume && (
                            <Button
                                type="submit"
                                variant="secondary"
                                className="mt-4 w-full"
                                disabled={processing}
                            >
                                Upload resume
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
                confirmDelete={onDeleteResume}
            />
        </>
    );
}
