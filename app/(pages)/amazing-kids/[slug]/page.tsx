import { Metadata } from "next";
import KidsSingleClient from "./client";

export async function generateMetadata({params}: {params: Promise<{slug: string;}>}): Promise<Metadata> {
    const {slug} = await params;
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/amazing-kids/${slug}`,
        { cache: "no-store" }
    );

    const {response_code, response_data } = await res.json();

    if (!response_code) {
        return {
            title: "Page Not Found",
            description: "This page does not exist",
        };
    }

    const pageInfo = response_data.amazing_kids;
    const seoInfo = pageInfo.AmazingKidsSeo;
    return {
        title: seoInfo.seo_meta_title || pageInfo.ak_title,
        description: seoInfo.seo_meta_description || "Asha Bhavan Centre",
        keywords: seoInfo.seo_meta_description || [],
        openGraph: {
            title: seoInfo.seo_meta_title || pageInfo.ak_title,
            description: seoInfo.seo_meta_description,
            images: [
                {
                    url: `${process.env.NEXT_PUBLIC_MEDIA_URL}${seoInfo.seo_og_image}`,
                    width: 1200,
                    height: 630,
                },
            ],
        },
    };
}
const KidsSinglePage = async({params}: {params: Promise<{slug: string;}>}) => {
    const {slug} = await params;
    return <KidsSingleClient permalink={slug} />
}

export default KidsSinglePage;