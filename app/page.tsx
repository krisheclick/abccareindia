"use client";
import HomeBanner from "@/components/home/HomeBanner/HomeBanner";
import HomeDescription from "@/components/home/HomeDescription/HomeDescription";
import USP from "@/components/home/Usp/Usp";
import { useGlobalContext } from "@/context/global_context";
import { safeParse } from "@/utlis/safe_parse";
import { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";

interface BannerItem {
    banner_name?: string;
    banner_title?: string;
    banner_description?: string;
    banner_link?: string;
    banner_file_link?: string;
    banner_video_upload_type?: string;
}
interface AboutInfo {
    about_left_button_text?: string;
    about_left_button_url?: string;
    about_left_image?: string;
    about_left_image_text?: string;
    about_right_button_text?: string;
    about_right_button_url?: string;
    about_right_description?: string;
    about_right_image?: string;
    about_subtitle?: string;
    about_title?: string;
}
interface PageCustomField {
    group_name: {
        "about-section"?: AboutInfo;
    }
}
interface USPItem {
    usp_title?: string;
    usp_description?: string;
    usp_feature_image?: string;
}
interface PageData {
    banner: BannerItem | null;
    pages_custom_field?: PageCustomField;
    usp?: USPItem[];
}

const HomePage = () => {
    const [data, setData] = useState<PageData | null>(null);
    const { setHasLoading } = useGlobalContext();
    const fetchData = async () => {
        try {
            setHasLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/page/home`, { cache: "no-cache" });
            const { response_data } = await response.json();
            setData(response_data);

        } catch (err: unknown) {
            console.log('Home Page API fetch is something wrong: ', (err as Error).message)
        } finally {
            setHasLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const customFields = safeParse<PageCustomField>(data?.pages_custom_field);
    const aboutSection = customFields?.group_name?.["about-section"] ?? null;
    // const customFields = typeof data?.pages_custom_field === "string"
    //                     ? JSON.parse(data.pages_custom_field)
    //                     : data?.pages_custom_field;
    
    return (
        <Stack className="home_page">
            <HomeBanner banner={data?.banner} />
            <HomeDescription aboutSection={aboutSection ?? undefined} />
            <USP usp={data?.usp ?? []} />
        </Stack>
    )
}

export default HomePage
