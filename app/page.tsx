"use client";
import Counter from "@/components/common/Counter";
import TestimonialSection from "@/components/common/Testimonial";
import Donation from "@/components/donation/Donation";
import Brand from "@/components/home/Brand/Brand";
import ChildEmpower from "@/components/home/CharitableMessage/ChildEmpower";
import HomeBanner from "@/components/home/HomeBanner/HomeBanner";
import HomeDescription from "@/components/home/HomeDescription/HomeDescription";
import HomeProject from "@/components/home/HomeProject/HomeProject";
import SuccessStory from "@/components/home/SuccessStory/SuccessStroy";
import UrgentNeeds from "@/components/home/UrgentNeeds/UrgentNeeds";
import USP from "@/components/home/Usp/Usp";
import Volunteer from "@/components/home/Volunteer/Volunteer";
import Ourreach from "@/components/our-reach/Ourreach";
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
interface USPItem {
    usp_title?: string;
    usp_description?: string;
    usp_feature_image?: string;
}
interface MediaData {
    file_name?: string;
    media_link?: string;
    thumb_name?: string;
    upload_type?: string;
    video_duration?: string;
}
interface Success_story {
    success_story_title?: string;
    success_story_subtitle?: string;
    success_story_description?: string;
    success_story_media_file?: MediaData[];
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
interface ProjectSection {
    project_title?: string;
    project_subtitle?: string;
    project_button_text?: string;
    project_button_url?: string;
}
interface VolunteerSectionData {
    volunteer_image?: string;
    volunteer_title?: string;
    volunteer_button_text?: string;
    volunteer_button_url?: string;
}
interface EmpowerSectionData {
  empower_title?: string;
  empower_description?: string;
  empower_button_text?: string;
  empower_button_url?: string;
}

interface CharitableMessageItem {
  charitable_msg_title: string;
  charity_msg_slug: string;
  charity_msg_description: string;
  charitable_msg_file_link?: string;
  charitable_msg_button_data: string;
}
interface UrgentNeedsSectionData {
    urgent_needs_image?: string;
    urgent_title?: string;
    urgent_needs_description?: string;
    urgent_button?: string;
    urgent_button_link?: string;
}
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
interface PageCustomField {
    group_name: {
        "about-section"?: AboutInfo;
        "success-stroy-section"?: AboutInfo;
        "project-section"?: ProjectSection;
        "volunteer-section"?: VolunteerSectionData;
        "empower-section"?: EmpowerSectionData;
        "urgent-needs-section"?: UrgentNeedsSectionData;
        "our-reach-section"?: OurReachSectionData;
        "testimonial-section"?: {
            testimonial_title?: string;
        };
    }
}
interface Testimonial {
    testimonial_name: string;
    testimonial_designation: string;
    testimonial_rating: number;
    testimonial_description: string;
    testimonial_feature_image: string;
}
interface DonorBrand {
    donor_brand_name: string;
    donor_brand_link?: string;
    donor_brand_logo: string;
}
interface PageData {
    banner: BannerItem | null;
    pages_custom_field?: PageCustomField;
    usp?: USPItem[];
    success_story?: Success_story[] | null;
    projects?: ProjectItem[] | null;
    charitable_message?: CharitableMessageItem[];
    our_reach?: OurReachItem[];
    testimonial?: Testimonial[];
    donor_brand?: DonorBrand[];
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

    // const customFields = typeof data?.pages_custom_field === "string"
    //                     ? JSON.parse(data.pages_custom_field)
    //                     : data?.pages_custom_field;

    const customFields = safeParse<PageCustomField>(data?.pages_custom_field);
    const aboutSection = customFields?.group_name?.["about-section"] ?? null;
    const projectSection = customFields?.group_name?.["project-section"] ?? null;

    return (
        <Stack className="home_page">
            <HomeBanner banner={data?.banner} />
            <HomeDescription aboutSection={aboutSection ?? undefined} />
            <USP usp={data?.usp ?? []} />
            <SuccessStory data={data?.success_story ?? []} />
            <HomeProject
                sectionData={projectSection}
                projects={data?.projects ?? []}
            />
            <Volunteer
                sectionData={customFields?.group_name?.['volunteer-section']}
            />
            <ChildEmpower
                sectionData={customFields?.group_name?.['empower-section']}
                messages={data?.charitable_message}
            />

            <UrgentNeeds
                sectionData={customFields?.group_name['urgent-needs-section']}
            />
            <Ourreach
                sectionData={customFields?.group_name['our-reach-section']}
                ourReachData={data?.our_reach}
            />

            <Counter 
                className='home_counter'
                poster={true}
            />
            <Donation />

            <TestimonialSection
                data={customFields?.group_name['testimonial-section']}
                testimonials={data?.testimonial}
                className="event-testimonials"
            />

            <Brand brands={data?.donor_brand} />
        </Stack>
    )
}

export default HomePage
