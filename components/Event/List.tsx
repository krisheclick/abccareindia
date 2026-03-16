"use client";

import Styles from "./style.module.css";
import { Col, Row, Stack } from "react-bootstrap";
import EventCard from "./Card";
import { useEffect, useState, useRef } from "react";
import { useGlobalContext } from "@/context/global_context";
import PaginationBar from "../pagination/Pagination";
import Cardskeleton from "./Cardskeleton";
import { useRouter } from "next/navigation";

interface EventItem {
    event_id: number;
    event_title?: string;
    event_slug?: string;
    event_short_description?: string;
    event_feature_image?: string;
    event_date?: string;
}

interface PaginationData {
    totalPages: number;
    currentPage: number;
}

interface ApiResponseData {
    events: EventItem[];
    pagination: PaginationData;
}

interface Props {
    page: number;
}

const EventList = ({ page }: Props) => {
    const { hasLoading, setHasLoading } = useGlobalContext();
    const router = useRouter();

    const [events, setEvents] = useState<EventItem[]>([]);
    const [pagination, setPagination] = useState<PaginationData | null>(null);

    const eventListRef = useRef<HTMLDivElement | null>(null);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setHasLoading(true);

                console.log("Fetching page:", page);

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/event?page=${page}&size=${itemsPerPage}`,
                    { cache: "no-store" }
                );

                const result = await response.json();
                const responseData: ApiResponseData =
                    result?.response_data ?? { events: [], pagination: null };

                setEvents(responseData.events ?? []);
                setPagination(responseData.pagination ?? null);

                // eventListRef.current?.scrollIntoView({
                //     behavior: "smooth",
                //     block: "start",
                // });
                // if (eventListRef.current) {
                //     const yOffset = -200; // 👈 your offset
                //     const y =
                //         eventListRef.current.getBoundingClientRect().top +
                //         window.pageYOffset +
                //         yOffset;

                //     window.scrollTo({
                //         top: y,
                //         behavior: "smooth",
                //     });
                // }

                if (page > 1 && eventListRef.current) {
                    const yOffset = -200;

                    const y =
                        eventListRef.current.getBoundingClientRect().top +
                        window.pageYOffset +
                        yOffset;

                    window.scrollTo({ top: y, behavior: "smooth" });
                }
            } catch (err: unknown) {
                console.log("API error:", (err as Error).message);
            } finally {
                setHasLoading(false);
            }
        };

        fetchData();
    }, [page, setHasLoading]);

    const handlePageChange = (newPage: number) => {
        router.push(`/events?page=${newPage}`, { scroll: false });
    };

    return (
        <Stack ref={eventListRef} className={Styles.eventList}>
            <Row className="rowGap">
                {hasLoading ? (
                    [...Array(8)].map((_, index) => (
                        <Col lg={6} sm={6} key={index}>
                            <Cardskeleton />
                        </Col>
                    ))
                ) : events.length > 0 ? (
                    events.map((value) => (
                        <Col lg={6} sm={6} key={value.event_id}>
                            <EventCard
                                poster={`${process.env.NEXT_PUBLIC_MEDIA_URL}${value.event_feature_image ?? ""}`}
                                date={value.event_date}
                                title={value.event_title}
                                slug={value.event_slug}
                                description={value.event_short_description}
                            />
                        </Col>
                    ))
                ) : (
                    <p>No Events Found</p>
                )}
            </Row>

            <PaginationBar
                pagination={pagination}
                currentPage={page}
                onPageChange={handlePageChange}
                className={Styles.paginationClass}
            />
        </Stack>
    );
};

export default EventList;