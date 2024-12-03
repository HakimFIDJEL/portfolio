import Layout from "@/Layouts/admin";
import { Link, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { useRoute } from "ziggy";
import { useForm } from "@inertiajs/react";

// Icons
import {
    Plus,
    Folder,
    Settings2,
    Trash,
    Download,
    Upload,
    Loader2,
} from "lucide-react";

// Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@/components/ui/table";
import { FileUploader } from "@/Components/admin/file-uploader";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { AppAlert } from "@/Components/admin/app-alert";
import { set } from "date-fns";

export function TabPassword({ user }) {
    const route = useRoute();

    const { data, setData, post, processing, errors } = useForm({
        password: "",
        password_confirmation: "",
        current_password: "",
    });
    


    function onSubmitPasswordForm(e) {
        e.preventDefault();

        post(route("admin.account.updatePassword"), {
            onSuccess: () => {
                setData("password", "");
                setData("password_confirmation", "");
                setData("current_password", "");
            },
        });
    }

    return (
        <>
            <form onSubmit={onSubmitPasswordForm}>
                <Card>
                    <CardHeader>
                        <CardTitle>Update Password</CardTitle>
                        <CardDescription>
                            Ensure your account is using a long, random password
                            to stay secure.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="flex flex-row gap-4">
                                <div className="grid gap-2 w-full">
                                    <Label htmlFor="label">Current password</Label>
                                    <Input
                                        id="current_password"
                                        type="password"
                                        required
                                        value={data.current_password ?? ""}
                                        onChange={(e) => setData("current_password", e.target.value)}
                                        className={
                                            errors.current_password ? "border-red-500" : ""
                                        }
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row gap-4">
                                <div className="grid gap-2 w-full">
                                    <Label htmlFor="label">New password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        value={data.password ?? ""}
                                        onChange={(e) => setData("password", e.target.value)}
                                        className={
                                            errors.password ? "border-red-500" : ""
                                        }
                                    />
                                </div>
                                <div className="grid gap-2 w-full">
                                    <Label htmlFor="url">Password confirmation</Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        required
                                        value={data.password_confirmation ?? ""}
                                        onChange={(e) => setData("password_confirmation", e.target.value)}
                                        className={
                                            errors.password_confirmation ? "border-red-500" : ""
                                        }
                                    />
                                </div>
                            </div>

                            
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="w-full"
                        >
                            Update Password
                            <Settings2
                                size={16}
                                className="ml-2"
                                hidden={processing}
                            />
                            <Loader2
                                size={16}
                                className="ml-2 animate-spin"
                                hidden={!processing}
                            />
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </>
    );
}
