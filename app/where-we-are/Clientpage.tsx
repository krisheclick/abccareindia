"use client";

import About from "@/components/about/About";
import ZigzagContent from "@/components/about/Zigzag";
import Ourreach from "@/components/our-reach/Ourreach";
import Projects from "@/components/project/Projects";
import { useGlobalContext } from "@/context/global_context";
import { safeParse } from "@/utlis/safe_parse";
import { useEffect, useState } from "react";

interface CounterData {
    our_reach_counter_number?: number;
    our_reach_counter_icon?: string;
    our_reach_counter_title?: string;
}
interface OurReachItem {
    our_reach_description?: string;
    our_reach_feature_image?: string;
    our_reach_button_data?: string;
    our_reach_counter_data?: CounterData[] | null;
}
interface OurReachSectionData {
    our_reach_title?: string;
    our_reach_description?: string;
}
interface ProjectItem {
    project_title?: string;
    project_subtitle?: string;
    project_slug?: string;
    project_short_description?: string;
    project_feature_image?: string;
    project_location?: string;
    project_button?: string;
    project_video_link?: string;
}
interface UnderBanner {
    video_thumb_nail_image?: string;
    upload_video_file?: string;
    upload_feature_image?: string;
}
interface SecretaryMessage {
    "secretary's_message_description"?: string;
    "secretary's_feature_image_1"?: string;
    "secretary's_feature_image_2"?: string;
}
interface WhatWeDo {
    what_we_do_description?: string;
    what_we_do_feature_image?: string;
}
interface Successstory {
    success_story_description?: string;
    success_story_feature_image?: string;
}
interface AboutProject {
    about_us_project_section_title?: string;
    about_us_project_section_description?: string;
}
interface PageCustomField {
    group_name: {
        "under-banner-section"?: UnderBanner;
        "secretarys-message"?: SecretaryMessage;
        "what-we-do"?: WhatWeDo;
        "success-story-of-about-us-section"?: Successstory;
        "about-us-project-section"?: AboutProject;
        "our-reach-section"?: OurReachSectionData;
        "testimonial-section"?: {
            testimonial_title?: string;
        };
    }
}
interface PageData {
    page?: {
        page_name?: string;
        page_slug?: string;
        page_feature_image?: string;
        page_short_description?: string;
        page_content?: string;
        pages_custom_field?: PageCustomField;
    }
    projects?: ProjectItem[] | null;
    our_reach?: OurReachItem[];
}
const Clientpage = () => {
    const { setHasLoading } = useGlobalContext();
    const [data, setData] = useState<PageData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setHasLoading(true);

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/page/about-us`,
                    { cache: "no-cache" }
                );

                const { response_data } = await response.json();
                setData(response_data ?? null);

            } catch (err: unknown) {
                console.log(
                    "API is Something wrong: ",
                    (err as Error).message
                );
            } finally {
                setHasLoading(false);
            }
        };

        fetchData();
    }, [setHasLoading]);
    
    const pageData = data?.page;
    const customFields = safeParse<PageCustomField>(pageData?.pages_custom_field);

    return (
        <div className="where-page">
            <Ourreach
                sectionData={{
                    our_reach_title: "Our Reach",
                    our_reach_description: "Asha Bhavan Center Project Area"
                }} 
                ourReachData={data?.our_reach}
            />
            <Projects
                sectionData={customFields?.group_name['about-us-project-section']}
                projects={data?.projects}
            />
        </div>
    )
}

export default Clientpage
