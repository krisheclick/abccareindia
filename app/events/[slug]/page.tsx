import { stripTags } from "@/utlis/strip_tags";
import { Metadata } from "next";
import SingleClientpage from "./Clientpage";

export async function generateMetadata(
    { params }: { params: { slug: string } }
): Promise<Metadata> {

    const {slug} = await params;

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/event/${slug}`,
        { cache: "no-store" }
    );
    
    const {response_code, response_data} = await response.json();
    if (!response_code) {
        return {
            title: "Page Not Found",
            description: "This page does not exist",
        };
    } else {
        const event = response_data.event;
        const seo = event?.EventSeo;
        const title = stripTags(seo?.seo_meta_title || "");
        const pageTitle = stripTags(event?.event_title || "");
        const description = stripTags(seo?.seo_meta_description || "");
        const keyword = stripTags(seo?.seo_meta_keyword || "");

        return {
            title: title || pageTitle,
            description: description || "Asha Bhavan Centre",
            keywords: keyword || [],
            openGraph: {
                title: title || pageTitle,
                description: description,
                images: seo?.seo_og_image
                    ? [
                        {
                            url: `${process.env.NEXT_PUBLIC_MEDIA_URL}${seo.seo_og_image}`,
                            width: 1200,
                            height: 630,
                        },
                    ]
                    : [],
            },
        };
    }
}

const Singlepage = async ({ params }: { params: { slug: string } }) => {
    const { slug } = await params;

    return <SingleClientpage permalink={slug ?? ''} />
}

export default Singlepage