import { Metadata } from "next";
import { stripTags } from "@/utlis/strip_tags";
import Clientpage from "./Clientpage";

export async function generateMetadata(): Promise<Metadata> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/page/our-projects`,
        { cache: "no-store" }
    );

    const { response_data } = await res.json();

    if (!response_data) {
        return {
            title: "Page Not Found",
            description: "This page does not exist",
        };
    } else {
        const pageData = response_data.page;
        const seodata = pageData.seo;
        const title = stripTags(seodata.seo_meta_title);
        const pageTitle = stripTags(pageData.page_name);
        const description = stripTags(seodata?.seo_meta_description);
        const keyword = stripTags(seodata?.seo_meta_keyword);

        return {
            title: title || pageTitle,
            description: description || "Asha Bhavan Centre",
            keywords: keyword || [],
            openGraph: {
                title: title || pageTitle,
                description: description,
                images: [
                    {
                        url: `${process.env.NEXT_PUBLIC_MEDIA_URL}${seodata.seo_og_image}`,
                        width: 1200,
                        height: 630,
                    },
                ],
            },
        };
    }

}

const ProjectsPage = () => {
    return <Clientpage />;
};



export default ProjectsPage;