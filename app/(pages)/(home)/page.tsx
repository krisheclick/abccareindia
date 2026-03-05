import { Metadata } from "next";
import Homeclintpage from "./clintpage";
import { stripTags } from "@/utlis/strip_tags";

export async function generateMetadata(): Promise<Metadata> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/page/home`,
        { cache: "no-store" }
    );

    const { response_data } = await res.json();

    if (!response_data) {
        return {
            title: "Page Not Found",
            description: "This page does not exist",
        };
    }
    
    const title = stripTags(response_data.seo.seo_meta_title);
    const pageTitle = stripTags(response_data.page_name);
    const description = stripTags(response_data.seo?.seo_meta_description);
    const keyword = stripTags(response_data.seo?.seo_meta_keyword);

    return {
        title: title || pageTitle,
        description: description || "Asha Bhavan Centre",
        keywords: keyword || [],
        openGraph: {
            title: title || pageTitle,
            description: description,
            images: [
                {
                    url: `${process.env.NEXT_PUBLIC_MEDIA_URL}${response_data.seo.seo_og_image}`,
                    width: 1200,
                    height: 630,
                },
            ],
        },
    };
}

const HomePage = () => {
    return <Homeclintpage />
}

export default HomePage
