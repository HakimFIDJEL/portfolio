import Layout from "@/Layouts/admin";

import { Loader2 } from "lucide-react"

import { Link } from "@inertiajs/react"
import { Button } from "@/Components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Label } from "@/components/ui/label"

import { useForm } from "@inertiajs/react"
import { useRoute } from "ziggy"
 

function Home({ }) {

    const route = useRoute()

    return (
        <>
            Vous êtes connecté
        </>
    )
}

Home.layout = page => {
    const breadcrumbs = [
        {
            title: "Home",
            href: route("admin.home"),
        },
    ];
    return <Layout children={page} breadcrumbs={breadcrumbs} />;
}

export default Home