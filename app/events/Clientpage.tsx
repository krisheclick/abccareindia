"use client";

import Counter from "@/components/common/Counter";
import Projects from "@/components/project/Projects";
import { useGlobalContext } from "@/context/global_context";
import { safeParse } from "@/utlis/safe_parse";
import { useEffect, useState } from "react";
import { Container, Stack } from "react-bootstrap";
import Styles from "@/components/Event/style.module.css";
import EventList from "@/components/Event/List";
import InnerBanner from "@/components/layout/banner/InnerBanner";

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
}

interface PageCustomField {
    group_name: {
        "event-project-section"?: ProjectContent;
    };
}
interface PageData {
    page?: {
        page_name?: string;
        page_slug?: string;
        page_feature_image?: string;
        page_short_description?: string;
        page_content?: string;
        pages_custom_field?: PageCustomField;
    };
    projects?: ProjectItem[] | null;
}

const Clientpage = () => {
    const { setHasLoading, setInnerBanner} = useGlobalContext();
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
                setInnerBanner(response_data?.page ?? undefined);

                window.scrollTo({ top: 0, behavior: "smooth" });

            } catch (err: unknown) {
                console.log("API error:", (err as Error).message);
            } finally {
                setHasLoading(false);
            }
        };

        fetchData();
    }, [setHasLoading]);

    const pageData = data?.page;
    const customFields = safeParse<PageCustomField>(pageData?.pages_custom_field);
    const projectsData = customFields?.group_name?.["event-project-section"];

    return (
        <div className="event-page">
            <InnerBanner />
            <Stack className={`pt_80 pb_100 ${Styles.inrmdl_upcomsecds ?? ""}`}>
                <Container>
                    <div className={Styles.inner_mdlprheading}>
                        <h1
                            className={`cmn_black_heading ${Styles.cmn_black_heading ?? ""}`}
                            dangerouslySetInnerHTML={{
                                __html: projectsData?.events_title ?? "",
                            }}
                        />
                        <div
                            className={`paragraph ${Styles.paragraph ?? ""}`}
                            dangerouslySetInnerHTML={{
                                __html: pageData?.page_short_description ?? "",
                            }}
                        />
                    </div>
                    <EventList />
                </Container>
            </Stack>

            <Counter className="home_counter" poster={true} />

            <Projects />
        </div>
    );
};

export default Clientpage;