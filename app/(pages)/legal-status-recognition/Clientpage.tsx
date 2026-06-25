"use client";
import Awards from "@/components/awards/Awards";
import InnerBanner from "@/components/layout/banner/InnerBanner";
import Projects from "@/components/project/Projects";
import { useGlobalContext } from "@/context/global_context";
import { safeParse } from "@/utlis/safe_parse";
import { useEffect, useState } from "react";
import { Container, Stack } from "react-bootstrap";
import Styles from "@/components/awards/style.module.css";
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
    project_title?: string;
    project_description?: string;
    award_title?: string;
}
interface LegalStatusContent {
    title?: string;
    description?: string;
}
interface AwardItem {
    "recognition_award_description"?: string;
    "recognition_award_feature_image"?: string;
}
interface PageCustomField {
    group_name: {
        "legal-status-project-section"?: ProjectContent;
        "legal-status-section"?: LegalStatusContent;
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
    const { setHasLoading, setInnerBanner} = useGlobalContext();
    const [data, setData] = useState<PageData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setHasLoading(true);

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/page/legal-status-recognition`,
                    { cache: "no-cache" }
                );

                const { response_data } = await response.json();
                setData(response_data ?? null);
                setInnerBanner(response_data?.page ?? undefined);

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
    }, [setHasLoading, setInnerBanner]);
    
    const pageData = data?.page;
    const customFields = safeParse<PageCustomField>(pageData?.pages_custom_field);
    const projectsData = customFields?.group_name['legal-status-project-section'];
    const legalStatusData = customFields?.group_name['legal-status-section'];

    return (
        <div className="legal-page">            
            <InnerBanner />
            {legalStatusData && (
                <Stack className={Styles.section} style={{background: "#f7f7f7"}}>
                    <Container>
                        <Stack className={`legal-status ${Styles.section_content ?? ''}`}>
                            <h1
                                className={`cmn_black_heading ${Styles.cmn_black_heading ?? ''}`}
                                dangerouslySetInnerHTML={{ __html: legalStatusData?.title ?? '' }}
                            />
                            <div
                                className={`paragraph rj_editor_text ${Styles.paragraph ?? ''}`}
                                dangerouslySetInnerHTML={{ __html: legalStatusData?.description ?? '' }}
                            />
                        </Stack>
                    </Container>
                </Stack>
            )}
            <Awards 
                title={projectsData?.award_title}
                content={pageData?.page_content}
                awards={data?.recognition_award}
            />
            <Projects />
        </div>
    )
}

export default Clientpage
