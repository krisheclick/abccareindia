"use client";

import InnerBanner from "@/components/layout/banner/InnerBanner";
import Projects from "@/components/project/Projects";
import { useGlobalContext } from "@/context/global_context";
import { useEffect, useState } from "react";
import { Col, Container, Row, Stack } from "react-bootstrap";
import Styles from "./style.module.css";
import Counter from "@/components/common/Counter";

interface Report {
    report_title?: string;
    report_slug?: string;
}
interface PageData {
    page?: {
        page_name?: string;
        page_slug?: string;
        page_feature_image?: string;
        page_short_description?: string;
        page_content?: string;
    }
    all_reports?: Report[] | null;
}
const Clientpage = () => {
    const { setHasLoading, setInnerBanner, mediaUrl } = useGlobalContext();
    const [data, setData] = useState<PageData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setHasLoading(true);

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/page/report`,
                    { cache: "no-cache" }
                );

                const { response_data } = await response.json();
                setData(response_data ?? null);
                setInnerBanner(response_data.page ?? null);

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

    return (
        <Stack className="report-page">
            <InnerBanner />
            <Stack className={Styles.reports_section}>
                <Container>
                    {data?.all_reports && data?.all_reports.length > 0 ? (
                        <Stack className={Styles.reportList}>
                            <Row className="gy-4 justify-content-center">
                                {data?.all_reports.map((item, index) => (
                                    <Col lg={4} sm={6} key={index}>
                                        <Stack as="a" href={`${process.env.NEXT_PUBLIC_ENV_URL}/report/${item.report_slug}`} className={Styles.reportCard}>
                                            <div className={Styles.report_title}>{item.report_title}</div>
                                        </Stack>
                                    </Col>
                                ))}
                            </Row>
                        </Stack>
                    ) : (
                        <p className="text-center fw-medium">{data?.page?.page_name} Report Not Found</p>
                    )}
                </Container>
            </Stack>
            <Counter className="home_counter" poster={true} />
            <Projects />
        </Stack>
    )
}

export default Clientpage
