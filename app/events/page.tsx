import { Metadata } from "next";
import { stripTags } from "@/utlis/strip_tags";
import Clientpage from "./Clientpage";

interface EventsPageProps {
  searchParams: { page?: string };
}

export async function generateMetadata(): Promise<Metadata> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/page/events`,
        { cache: "no-store" }
    );

    const { response_data } = await res.json();

    if (!response_data) {
        return {
            title: "Page Not Found",
            description: "This page does not exist",
        };
    }
    
    const title = stripTags(response_data.page.seo.seo_meta_title);
    const pageTitle = stripTags(response_data.page.page_name);
    const description = stripTags(response_data.page.seo?.seo_meta_description);
    const keyword = stripTags(response_data.page.seo?.seo_meta_keyword);

    return {
        title: title || pageTitle,
        description: description || "Asha Bhavan Centre",
        keywords: keyword || [],
        openGraph: {
            title: title || pageTitle,
            description: description,
            images: [
                {
                    url: `${process.env.NEXT_PUBLIC_MEDIA_URL}${response_data.page.seo.seo_og_image}`,
                    width: 1200,
                    height: 630,
                },
            ],
        },
    };
}

export default function EventsMainPage({ searchParams }: EventsPageProps) {
    const page = Number(searchParams?.page) || 1;
    return <Clientpage page={page}/>;
}