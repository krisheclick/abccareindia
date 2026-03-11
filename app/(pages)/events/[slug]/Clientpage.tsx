"use client";

import Counter from "@/components/common/Counter";
import Projects from "@/components/project/Projects";
import { useGlobalContext } from "@/context/global_context";
import { useEffect, useState } from "react";
import { Container, Stack } from "react-bootstrap";
import Styles from "@/components/Event/style.module.css";
import InnerBanner from "@/components/layout/banner/InnerBanner";
import NotFound from "@/app/not-found";
import EventPoster from "@/components/Event/EventPoster";
import Events from "@/components/Event/AllEvent/Events";

interface EventsData {
    event_title?: string;
    event_page_title?: string;
    event_slug?: string;
    event_feature_image?: string;
    event_short_description?: string;
    event_description?: string;
    event_date?: string;
    event_gallery?: string;
};
interface PageData {
    event?: EventsData | null;
}

const SingleClientpage = ({ permalink }: { permalink: string }) => {
    const { setHasLoading, setInnerBanner } = useGlobalContext();
    const [data, setData] = useState<PageData | null>(null);
    const [notFound, setNotFound] = useState(false);

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                setHasLoading(true);
    
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/event/${permalink}`,
                    { cache: "no-cache" }
                );
    
                const {response_code, response_data } = await response.json();
                if (!response_code) {
                    setNotFound(true);
                    return
                }
    
                setData(response_data ?? null);
                setInnerBanner({
                    page_name: response_data?.event?.event_title,
                    page_feature_image: response_data?.event?.event_feature_image,
                });
    
                window.scrollTo({ top: 0, behavior: "smooth" });
    
            } catch (err: unknown) {
                console.log("API error:", (err as Error).message);
            } finally {
                setHasLoading(false);
            }
        };
        fetchData();
    }, [permalink, setHasLoading, setInnerBanner]);

    if (notFound) {
        return <NotFound />;
    }

    const pageData = data?.event;
    // const customFields = safeParse<PageCustomField>(pageData?.pages_custom_field);
    // const projectsData = customFields?.group_name?.["event-project-section"];

    return (
        <div className="event-single-page">
            <InnerBanner
                breadcrumb={[{
                    "breadcrumb_item": "Events",
                    "breadcrumb_slug": `${process.env.NEXT_PUBLIC_ENV_URL}/events`,
                }]}
            />
            <Stack className={`pt_80 ${Styles.inrmdl_upcomsecds ?? ""}`}>
                <Container>
                    <div className={Styles.inner_mdlprheading}>
                        <h1
                            className={`cmn_black_heading ${Styles.cmn_black_heading ?? ""}`}
                            dangerouslySetInnerHTML={{
                                __html: pageData?.event_page_title ?? "",
                            }}
                        />
                        <div
                            className={`paragraph ${Styles.paragraph ?? ""}`}
                            dangerouslySetInnerHTML={{
                                __html: pageData?.event_description ?? "",
                            }}
                        />
                    </div>
                </Container>
            </Stack>
            <EventPoster
                poster={pageData?.event_feature_image}
                title={pageData?.event_title}
                date={pageData?.event_date}
                description={pageData?.event_short_description}

            />
            <Events data={data?.event} />
            <Counter className="home_counter" poster={true} />

            <Projects />
        </div>
    );
};

export default SingleClientpage;