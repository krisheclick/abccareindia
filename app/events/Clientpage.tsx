"use client";

import Counter from "@/components/common/Counter";
import Projects from "@/components/project/Projects";
import { useGlobalContext } from "@/context/global_context";
import { safeParse } from "@/utlis/safe_parse";
import { useEffect, useState } from "react";
import { Col, Container, Row, Stack } from "react-bootstrap";
import Styles from "@/components/Event/style.module.css";
import EventCard from "@/components/Event/Card";

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

interface EventsData {
    event_title?: string;
    event_slug?: string;
    event_short_description?: string;
    event_feature_image?: string;
    event_date?: string;
}

interface PageCustomField {
    group_name: {
        "event-project-section"?: ProjectContent;
    };
}

interface Pagination {
    totalItems?: number;
    totalPages?: number;
    currentPage?: number;
    pageSize?: number;
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
    events?: EventsData[] | null;
    projects?: ProjectItem[] | null;
    pagination?: Pagination;
}

const Clientpage = () => {
    const { setHasLoading } = useGlobalContext();

    const [data, setData] = useState<PageData | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setHasLoading(true);

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/page/events?page=${currentPage}&limit=${itemsPerPage}`,
                    { cache: "no-cache" }
                );

                const { response_data } = await response.json();
                setData(response_data ?? null);

                // Scroll to top when page changes
                window.scrollTo({ top: 0, behavior: "smooth" });

            } catch (err: unknown) {
                console.log(
                    "API error:",
                    (err as Error).message
                );
            } finally {
                setHasLoading(false);
            }
        };

        fetchData();
    }, [currentPage, setHasLoading]);

    const pageData = data?.page;

    const customFields = safeParse<PageCustomField>(
        pageData?.pages_custom_field
    );

    const projectsData =
        customFields?.group_name?.["event-project-section"];

    const totalItems = data?.pagination?.totalItems ?? 0;
    const totalPages = data?.pagination?.totalPages ?? 0;

    return (
        <div className="event-page">
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

                    {data?.events && data.events.length > 0 && (
                        <div className={Styles.eventList}>
                            <Row className={Styles.rowevesblist}>
                                {data.events.map((value) => (
                                    <Col
                                        lg={6}
                                        sm={6}
                                        key={value.event_slug}
                                    >
                                        <EventCard
                                            poster={`${process.env.NEXT_PUBLIC_MEDIA_URL}${value.event_feature_image}`}
                                            date={value.event_date}
                                            title={value.event_title}
                                            slug={value.event_slug}
                                            description={value.event_short_description}
                                        />
                                    </Col>
                                ))}
                            </Row>

                            {/* Pagination */}
                            {totalItems > itemsPerPage && totalPages > 1 && (
                                <div className="d-flex justify-content-center mt-4">
                                    <nav>
                                        <ul className="pagination">
                                            {Array.from(
                                                { length: totalPages },
                                                (_, i) => (
                                                    <li
                                                        key={i}
                                                        className={`page-item ${
                                                            currentPage === i + 1
                                                                ? "active"
                                                                : ""
                                                        }`}
                                                    >
                                                        <button
                                                            className="page-link"
                                                            onClick={() =>
                                                                setCurrentPage(i + 1)
                                                            }
                                                        >
                                                            {i + 1}
                                                        </button>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </nav>
                                </div>
                            )}
                        </div>
                    )}
                </Container>
            </Stack>

            <Counter
                className="home_counter"
                poster={true}
            />

            <Projects
                sectionData={{
                    about_us_project_section_title: projectsData?.project_section_title,
                    about_us_project_section_description: projectsData?.project_section_description,
                }}
                projects={data?.projects}
            />
        </div>
    );
};

export default Clientpage;