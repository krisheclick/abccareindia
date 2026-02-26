"use client";

import Styles from "./style.module.css";
import { Col, Row, Stack } from "react-bootstrap";
import EventCard from "./Card";
import { useEffect, useState, useRef } from "react";
import { useGlobalContext } from "@/context/global_context";
import PaginationBar from "../pagination/Pagination";
import Cardskeleton from "./Cardskeleton";
import { useRouter, useSearchParams } from "next/navigation";

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
  // const searchParams = useSearchParams();
  
  // ✅ Get page from URL
  const pageFromUrl = page;

  const [events, setEvents] = useState<EventItem[]>([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);

  const itemsPerPage = 10;
  const eventListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setHasLoading(true);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/event?page=${pageFromUrl}&size=${itemsPerPage}`,
          { cache: "no-cache" }
        );

        const result = await response.json();
        const responseData: ApiResponseData = result?.response_data;

        setEvents(responseData?.events ?? []);
        setPagination(responseData?.pagination ?? null);

        eventListRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

      } catch (err: unknown) {
        console.log("API error:", (err as Error).message);
      } finally {
        setHasLoading(false);
      }
    };

    fetchData();
  }, [pageFromUrl, setHasLoading]);

  // ✅ Update URL when page changes
  const handlePageChange = (page: number) => {
    router.push(`/events?page=${page}`);
  };

  return (
    <Stack ref={eventListRef} className={Styles.eventList}>
      <Row className={Styles.rowevesblist}>
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
                poster={`${process.env.NEXT_PUBLIC_MEDIA_URL}${value.event_feature_image}`}
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
        currentPage={pageFromUrl}
        onPageChange={handlePageChange}
        className={Styles.paginationClass}
      />
    </Stack>
  );
};

export default EventList;