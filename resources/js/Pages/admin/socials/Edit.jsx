// Needed imports
import Layout from "@/Layouts/admin";
import { Link } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import { useRoute } from "ziggy";

// Icons
import { Loader2, ArrowLeft, Activity, Settings2 } from "lucide-react";

// Components
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Separator } from "@/Components/ui/separator";
import { Input } from "@/Components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/Components/ui/textarea";

function Socials({ social }) {

    const route = useRoute();
    const { data, setData, post, processing, errors } = useForm({
        label: social.label,
        url: social.url,
        svg: social.svg,
    });

    function onSubmit(e) {
        e.preventDefault();
        post(route("admin.socials.update", social));
    }

    return (
        <>
            <Card>
                {/* Title of the page */}
                <CardHeader className="flex items-center justify-between flex-row gap-2">
                    <span>
                        <CardTitle className="flex items-center gap-2">
                            <Activity />
                            Edit a social link
                        </CardTitle>
                        <CardDescription>
                            Here you can edit an existing social link
                        </CardDescription>
                    </span>
                    <Link href={route("admin.socials.index")}>
                        <Button type="primary">
                            <ArrowLeft />
                            Go back
                        </Button>
                    </Link>
                </CardHeader>

                <Separator />

                <CardContent>
                    <form onSubmit={onSubmit} className="mt-4">
                        <div className="grid gap-4">
                            <div className="flex flex-row gap-4">
                                <div className="grid gap-2 w-full">
                                    <Label htmlFor="label">Label</Label>
                                    <Input
                                        id="label"
                                        type="text"
                                        placeholder="e.g. Facebook"
                                        required
                                        value={data.label}
                                        onChange={(e) =>
                                            setData("label", e.target.value)
                                        }
                                        className={
                                            errors.label ? "border-red-500" : ""
                                        }
                                    />
                                </div>
                                <div className="grid gap-2 w-full">
                                    <Label htmlFor="url">Url</Label>
                                    <Input
                                        id="url"
                                        type="text"
                                        placeholder="e.g. https://facebook.com"
                                        required
                                        value={data.url}
                                        onChange={(e) =>
                                            setData("url", e.target.value)
                                        }
                                        className={
                                            errors.url ? "border-red-500" : ""
                                        }
                                    />
                                </div>
                            </div>

                            <div className="flex flex-row gap-4">
                                <div className="grid gap-2 w-full">
                                    <Label htmlFor="label">Svg</Label>
                                    <Textarea 
                                        placeholder="e.g. <svg>...</svg>" 
                                        required 
                                        value={data.svg}
                                        onChange={(e) => setData("svg", e.target.value)} 
                                        className={errors.svg ? "border-red-500" : ""} 
                                    />
                                </div>

                                {data.svg && (
                                    <div className="grid gap-2">
                                        <label className="text-sm font-medium">Visualisation</label>
                                        <div
                                            className="w-8 h-8 bg-gray-900 rounded-md flex items-center justify-center"
                                            dangerouslySetInnerHTML={{
                                                __html: data.svg,
                                            }}
                                        />
                                    </div>
                                )}

                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={processing}
                            >
                                <Loader2
                                    className="animate-spin"
                                    hidden={!processing}
                                />
                                Update social link
                                <Settings2 size={18} hidden={processing} />
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </>
    );
}

Socials.layout = (page) => {
    const route = useRoute();
    const breadcrumbs = [
        {
            title: "Socials",
            href: route("admin.socials.index"),
        },
        {
            title: "Edit",
            href: "",
        },
    ];
    return <Layout children={page} breadcrumbs={breadcrumbs} />;
};

export default Socials;
