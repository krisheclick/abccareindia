"use client";
import Counter from "@/components/common/Counter";
import Projects from "@/components/project/Projects";
import { useGlobalContext } from "@/context/global_context";
import { safeParse } from "@/utlis/safe_parse";
import { useEffect, useState } from "react";
import { Container, Stack } from "react-bootstrap";
import Styles from "@/components/Event/style.module.css";
import EventPoster from "@/components/Event/EventPoster";

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
interface ProjectContent {
    project_section_title?: string;
    project_section_description?: string;
    events_title?: string;
    events_poster?: string;
    events_date?: string;
    events_poster_title?: string;
    evevts_short_description?: string;
}
interface AwardItem {
    "recognition_award_description"?: string;
    "recognition_award_feature_image"?: string;
}
interface PageCustomField {
    group_name: {
        "event-project-section"?: ProjectContent;
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
    recognition_award?: AwardItem[] | null;
    projects?: ProjectItem[] | null;
}
const Clientpage = () => {
    const { setHasLoading, mediaUrl } = useGlobalContext();
    const [data, setData] = useState<PageData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setHasLoading(true);

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/page/events`,
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
    const projectsData = customFields?.group_name['event-project-section'];
    console.log('projectsData', projectsData)

    return (
        <div className="event-page">
            <Stack className={`pt_80 ${Styles.inrmdl_upcomsecds ?? ''}`}>
                <Container>
                    <div className={Styles.inner_mdlprheading}>
                        <h1
                            className={`cmn_black_heading ${Styles.cmn_black_heading ?? ''}`}
                            dangerouslySetInnerHTML={{ __html: projectsData?.events_title ?? '' }}
                        />
                        <div
                            className={`paragraph ${Styles.paragraph ?? ''}`}
                            dangerouslySetInnerHTML={{ __html: pageData?.page_short_description ?? '' }}
                        />
                    </div>
                </Container>
            </Stack>
            <EventPoster 
                poster={`${mediaUrl}/uploads/page_image/${projectsData?.events_poster}`}
                date={projectsData?.events_date}
                title={projectsData?.events_poster_title}
                description={projectsData?.evevts_short_description}
            />
            <Counter
                className='home_counter'
                poster={true}
            />
            <Projects
                sectionData={{
                    about_us_project_section_title: projectsData?.project_section_title,
                    about_us_project_section_description: projectsData?.project_section_description
                }}
                projects={data?.projects}
            />
        </div>
    )
}

export default Clientpage
