import { Metadata } from "next";
import NotFound from "@/app/not-found";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Page Not Found",
        description: "This page does not exist",
    };
}

export default function AboutPage() {
    return <NotFound />;
}