import { Metadata } from "next";
import SingleUrgentNeed from "./client";
import { stripTags } from "@/utlis/strip_tags";

interface UrgentNeedSeo {
    seo_meta_title?: string;
    seo_meta_description?: string;
    seo_meta_keyword?: string;
}
interface UrgentNeedData {
    urgent_need_title?: string;
    UrgentNeedSeo?: UrgentNeedSeo;
}

const getUrgentNeedFromResponse = (responseData: unknown): UrgentNeedData | undefined => {
    if (!responseData || typeof responseData !== "object") return undefined;
    if (Array.isArray(responseData)) return responseData[0] as UrgentNeedData | undefined;

    const data = responseData as {
        urgent_need?: UrgentNeedData;
        urgentNeed?: UrgentNeedData;
        urgent_needs?: UrgentNeedData[] | UrgentNeedData;
        urgentNeeds?: UrgentNeedData[] | UrgentNeedData;
    };
    const urgentNeeds = data.urgent_needs ?? data.urgentNeeds;

    if (Array.isArray(urgentNeeds)) return urgentNeeds[0];
    return data.urgent_need ?? data.urgentNeed ?? urgentNeeds;
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const { slug } = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-urgent-needs/${slug}`, { cache: "no-store" });
    const { response_code, response_data } = await res.json();

    if (!response_code) {
        return {
            title: "Page Not Found",
            description: "This page does not exist",
        };
    }

    const pageData = getUrgentNeedFromResponse(response_data);
    const title = stripTags(pageData?.UrgentNeedSeo?.seo_meta_title);
    const pageTitle = stripTags(pageData?.urgent_need_title);
    const description = stripTags(pageData?.UrgentNeedSeo?.seo_meta_description);
    const keyword = stripTags(pageData?.UrgentNeedSeo?.seo_meta_keyword);

    return {
        title: title || pageTitle,
        description: description || "Asha Bhavan Centre",
        keywords: keyword || [],
    };
}

const UrgentNeedDetails = async ({ params }: { params: { slug: string } }) => {
    const { slug } = await params;
    return <SingleUrgentNeed permalink={slug} />;
};

export default UrgentNeedDetails;
