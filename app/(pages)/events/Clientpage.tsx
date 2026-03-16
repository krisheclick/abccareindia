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

interface ProjectContent {
  events_title?: string;
}

interface PageCustomField {
  group_name?: {
    "event-project-section"?: ProjectContent;
  };
}

interface PageData {
  page?: {
    page_name?: string;
    page_short_description?: string;
    pages_custom_field?: PageCustomField;
  };
}

interface Props {
  page: number;
}

const Clientpage = ({ page }: Props) => {
    const { setHasLoading, setInnerBanner} = useGlobalContext();
    const [data, setData] = useState<PageData | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setHasLoading(true);

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/page/events`,
                    { cache: "no-store" }
                );

                const { response_data } = await response.json();

                setData(response_data ?? null);
                setInnerBanner(response_data?.page ?? undefined);
                
            } catch (err: unknown) {
                console.log("API error:", (err as Error).message);
            } finally {
                setHasLoading(false);
            }
        };

        fetchData();
    }, [setHasLoading, setInnerBanner]);

    const pageData = data?.page;
    const customFields = safeParse<PageCustomField>(pageData?.pages_custom_field);
    const projectsData = customFields?.group_name?.["event-project-section"];

    return (
        <div className="event-page">
            <InnerBanner />
            <Stack className={Styles.section}>
                <Container>
                    <div className={`inner_mdlprheading ${Styles.section_content ?? ''}`}>
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
                    <EventList page={page} />
                </Container>
            </Stack>

            <Counter className="home_counter" poster={true} />

            <Projects />
        </div>
    );
};

export default Clientpage;