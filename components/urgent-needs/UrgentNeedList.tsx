"use client";

import PaginationBar from "@/components/pagination/Pagination";
import { useGlobalContext } from "@/context/global_context";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Col, Row, Stack } from "react-bootstrap";
import Styles from "@/components/project/ProjectListing/style.module.css";

interface UrgentNeedItem {
    urgent_need_title?: string;
    urgent_need_slug?: string;
    urgent_need_short_description?: string;
    urgent_need_feature_image?: string;
}
interface PaginationData {
    totalPages: number;
    currentPage: number;
}

const UrgentNeedList = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { setHasLoading, mediaUrl } = useGlobalContext();
    const [items, setItems] = useState<UrgentNeedItem[]>([]);
    const [pagination, setPagination] = useState<PaginationData | null>(null);
    const listRef = useRef<HTMLDivElement | null>(null);

    const currentPage = Number(searchParams.get("page") || 1);
    const itemsPerPage = 10;
    const apiBase = process.env.NEXT_PUBLIC_API_URL;

    const fetchUrgentNeeds = useCallback(async () => {
        try {
            setHasLoading(true);
            const res = await fetch(`${apiBase}/get-urgent-needs/?page=${currentPage}&size=${itemsPerPage}`);
            const { response_data } = await res.json();

            setItems(response_data?.urgent_needs ?? response_data?.urgentNeeds ?? []);
            const paginationData = response_data?.pagination;
            setPagination(paginationData ? {
                totalPages: paginationData.total_pages ?? paginationData.totalPages ?? 1,
                currentPage: paginationData.currentPage ?? currentPage,
            } : null);
        } catch (error) {
            console.log("Urgent needs error:", error);
        } finally {
            setHasLoading(false);
        }
    }, [apiBase, currentPage, setHasLoading]);

    useEffect(() => {
        fetchUrgentNeeds();
    }, [fetchUrgentNeeds]);

    const handlePageChange = (newPage: number) => {
        listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        router.push(`/urgent-needs?page=${newPage}`, { scroll: false });
    };

    return (
        <Stack className={Styles.projectData} ref={listRef}>
            {items.length > 0 ? (
                <Stack className={Styles.projectList}>
                    {items.map((item, index) => (
                        <Stack key={`${item.urgent_need_slug || "urgent-need"}-${index}`} className={Styles.project_wrapper}>
                            <Row className={`gx-lg-0 rowGap ${Styles.row}`}>
                                <Col lg={6}>
                                    <div className={Styles.contentWrap}>
                                        <div className={Styles.project_content}>
                                            <h2 className={Styles.title}>{item.urgent_need_title}</h2>
                                            <div
                                                className={Styles.description}
                                                dangerouslySetInnerHTML={{ __html: item.urgent_need_short_description ?? "" }}
                                            />
                                            <div className={Styles.buttonWrap}>
                                                <Link href={`/urgent-needs/${item.urgent_need_slug}`} className={`btn btn-primary mt-0 ${Styles.button}`}>
                                                    Learn More
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <Link href={`/urgent-needs/${item.urgent_need_slug}`} className={`custom_image fixedImage ${Styles.poster}`}>
                                        <Image
                                            src={item.urgent_need_feature_image ? `${mediaUrl}${item.urgent_need_feature_image}` : "/assets/images/noimage.webp"}
                                            alt={item.urgent_need_title || ""}
                                            className="custom-image loaded"
                                            fill
                                        />
                                    </Link>
                                </Col>
                            </Row>
                        </Stack>
                    ))}
                </Stack>
            ) : (
                <p className={Styles.notfound}>No urgent needs found.</p>
            )}
            {pagination && pagination.totalPages > 1 && (
                <PaginationBar
                    pagination={pagination}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    className={Styles.paginationClass}
                />
            )}
        </Stack>
    );
};

export default UrgentNeedList;
