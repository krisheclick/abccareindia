"use client";
import InnerBanner from "@/components/layout/banner/InnerBanner";
import { useGlobalContext } from "@/context/global_context";
import { Suspense, useEffect, useState } from "react";
import { Container, Stack } from "react-bootstrap";
import Styles from "@/components/project/style.module.css";
import ProjectList from "@/components/project/ProjectListing/List";
import Counter from "@/components/common/Counter";

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
interface PageCustomField {
    group_name: {
        "testimonial-section"?: {
            testimonial_section_title?: string;
        }
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
}
interface PageProps {
    page?: number;
}
const Clientpage = ({ page }: PageProps) => {
    const { setHasLoading, setInnerBanner } = useGlobalContext();
    const [data, setData] = useState<PageData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setHasLoading(true);

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/page/our-projects`,
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
    // const customFields = safeParse<PageCustomField>(pageData?.pages_custom_field);

    return (
        <div className="project-page">
            <InnerBanner />
            <Stack className={Styles.section}>
                <Container>
                    <div className={`inner_mdlprheading ${Styles.section_content ?? ''}`}>
                        <h1
                            className={`cmn_black_heading ${Styles.cmn_black_heading ?? ""}`}
                            dangerouslySetInnerHTML={{
                                __html: pageData?.page_name ?? "",
                            }}
                        />
                        <p
                            className={`paragraph ${Styles.page_short_description}`}
                            dangerouslySetInnerHTML={{
                                __html: pageData?.page_short_description ?? "",
                            }}
                        />
                    </div>
                    <Suspense fallback={<p>Loading projects...</p>}>
                        <ProjectList />
                    </Suspense>
                    {/* <ProjectList /> */}
                </Container>
            </Stack>
            <Counter className="home_counter" poster={true} />
        </div>
    )
}

export default Clientpage
