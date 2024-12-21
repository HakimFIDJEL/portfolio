// Needed imports
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Separator } from "@/Components/ui/separator";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@/Components/ui/table";
import { FileUploader } from "@/Components/admin/file-uploader";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { AppAlert } from "@/Components/admin/app-alert";

// Custom components
import { TabResume } from "@/Components/admin/account/tab-resume";
import { TabPassword } from "@/Components/admin/account/tab-password";
import { TabPfp } from "@/Components/admin/account/tab-pfp";

function Account({ user }) {
    

    

    return (
        <>
            {/* Hero */}
            <div className="mb-6 p-4">
                <h1 className="text-2xl font-semibold">Account</h1>
                <p className="text-gray-400">
                    Here you can view and update your account details.
                </p>
            </div>
            <Separator />

            {/* Horizontal tab */}
            <Tabs defaultValue="pfp" className="my-6">
                <TabsList className="w-full flex justify-between mb-4">
                    <TabsTrigger value="pfp" className="w-full">
                        Profile picture
                    </TabsTrigger>
                    <TabsTrigger value="resume" className="w-full">
                        Resume
                    </TabsTrigger>
                    <TabsTrigger value="password" className="w-full">
                        Password
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="pfp">
                    <TabPfp
                        user={user}
                    />
                </TabsContent>

                <TabsContent value="resume">

                    <TabResume
                        user={user}
                    />

                </TabsContent>
                <TabsContent value="password">
                    
                    <TabPassword
                        user={user}
                    />

                </TabsContent>
            </Tabs>
        </>
    );
}

Account.layout = (page) => {
    const route = useRoute();
    const breadcrumbs = [
        {
            title: "Account",
            href: route("admin.account.index"),
        },
    ];
    return <Layout children={page} breadcrumbs={breadcrumbs} />;
};

export default Account;
