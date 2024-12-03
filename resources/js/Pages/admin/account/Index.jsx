// Needed imports
import Layout from "@/Layouts/admin";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import { useRoute } from "ziggy";

// Icons
import { Plus, Folder, Settings2, Trash } from "lucide-react";

// Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

function Account({ user }) {
    const route = useRoute();

    return <>
    
        {/* Hero */}
        <div className="mb-6 p-4">
            <h1 className="text-2xl font-semibold">
                Account
            </h1>
            <p className="text-gray-400">
                Here you can view and update your account details.
            </p>
        </div>
        <Separator />

        {/* Horizontal tab */}
        <Tabs defaultValue="resume" className="my-6 gap-4 flex ">
            <TabsList className="col-span-1 flex flex-col gap-4 h-full">
                <TabsTrigger value="informations" className="w-full justify-start">
                    Informations {/* TODO */}
                </TabsTrigger>
                <TabsTrigger value="resume" className="w-full justify-start">
                    Resume
                </TabsTrigger>
                <TabsTrigger value="password" className="w-full justify-start">
                    Password
                </TabsTrigger>
            </TabsList>
            <TabsContent value="informations">
                {/* TODO */}
                My informations
            </TabsContent>
            <TabsContent value="resume">
                {/* TODO */}
                My resume

                

            </TabsContent>
            <TabsContent value="password">
                {/* TODO */}
                My password
            </TabsContent>
        </Tabs>
    
    </>;
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
