import { Metadata } from "next";
import AmazingKidsClient from "./client"

export async function generateMetadata(): Promise<Metadata> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/page/amazing-kids`,
        { cache: "no-store" }
    );

    const { response_data } = await res.json();

    if (!response_data) {
        return {
            title: "Page Not Found",
            description: "This page does not exist",
        };
    }

    return {
        title: response_data.page.seo.seo_meta_title || response_data.page.page_name,
        description: response_data.page.seo.seo_meta_description || "Asha Bhavan Centre",
        keywords: response_data.page.seo.seo_meta_description || [],
        openGraph: {
            title: response_data.page.seo.seo_meta_title || response_data.page.page_name,
            description: response_data.page.seo.seo_meta_description,
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
const AmazingKidsPage = () => {
    return <AmazingKidsClient />
}

export default AmazingKidsPage;