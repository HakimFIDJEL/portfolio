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

  

    return (
        <>
            Vous êtes connecté
        </>
    )
}

Home.layout = page => {
    return <Layout children={page} />
}

export default Home