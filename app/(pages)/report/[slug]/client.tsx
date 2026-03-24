"use client";
import NotFound from "@/app/not-found";
import InnerBanner from "@/components/layout/banner/InnerBanner";
import { useGlobalContext } from "@/context/global_context";
import { useEffect, useState } from "react";
import { safeParse } from "@/utlis/safe_parse";
import Styles from "../style.module.css";
import { Card, CardBody, CardImg, CardTitle, Col, Container, Row, Stack } from "react-bootstrap";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import Counter from "@/components/common/Counter";

interface Report {
    title?: string;
    file?: string;
    image?: string;
}
interface ReportDataType {
    report_title?: string;
    report_slug?: string;
    report_file?: Report[] | null;
}
interface PageData {
    page_name?: string;
    page_slug?: string;
    page_feature_image?: string;
    page_short_description?: string;
    page_content?: string;
}
interface ReportData {
    page?: PageData;
    report_data?: ReportDataType;
}
const SingleReport = ({ permalink }: { permalink: string }) => {
    const { setHasLoading, setInnerBanner, mediaUrl } = useGlobalContext();
    const [notFound, setNotFound] = useState<boolean>(false)
    const [data, setData] = useState<ReportData | null>(null);

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                setHasLoading(true);
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/page/${permalink}`);
                const { response_code, response_data } = await response.json();
    
                if (!response_code) {
                    setNotFound(true);
                }
    
                setData(response_data ?? undefined);
                setInnerBanner(response_data.page);
            } catch (err: unknown) {
                console.log('Projects Details API data is something wrong: ', (err as Error).message);
            } finally {
                setHasLoading(false);
            }
        }
        if (permalink) {
            fetchData();
        }
    }, [permalink, setInnerBanner, setHasLoading]);

    const report = safeParse<Report[]>(data?.report_data?.report_file);
    const baseUrl = process.env.NEXT_PUBLIC_ENV_URL || "";
    if (notFound) {
        return <NotFound />
    }
    return (
        <>
            <Stack as="section" className="single-report-page">
                <InnerBanner
                    breadcrumb={[{
                        "breadcrumb_item": "Report",
                        "breadcrumb_slug": `${process.env.NEXT_PUBLIC_ENV_URL}/report`,
                    }]}
                />
                <Stack className={Styles.reports_section}>
                    <Container>
                        <Stack className={Styles.section_content}>
                            <h1
                                className="cmn_black_heading mb-0"
                                dangerouslySetInnerHTML={{ __html: data?.report_data?.report_title || '' }}
                            />
                        </Stack>
                        {report && report.length > 0 ? (
                            <Stack className={Styles.reportList}>
                                <Row className="rowGap gx-3 gx-xl-4 justify-content-center">
                                    {report.map((item, index) => (
                                        <Col xxl={3} lg={4} sm={6} key={index}>
                                            <Card className={Styles.cardItem}>
                                                <CardBody className={Styles.cardBody ?? ''}>
                                                    <figure>
                                                        <CardImg
                                                            src={`${mediaUrl}/uploads/report/${item.image}`}
                                                            alt={item.title}
                                                        />
                                                    </figure>
                                                    <Stack direction="horizontal" className={`justify-content-between ${Styles.title_wrap}`}>
                                                        <CardTitle as="div" className={Styles.cardTitle}>{item.title}</CardTitle>
                                                        {item.file && (
                                                            <Link
                                                                href={`${baseUrl}/report/${item.file}`}
                                                                target="_blank"
                                                                download=""
                                                                className={Styles.fileDownload}
                                                            >
                                                                <FontAwesomeIcon icon={faDownload} />
                                                            </Link>
                                                        )}
                                                    </Stack>
                                                </CardBody>
                                            </Card>
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
            </Stack>
        </>
    )
}
export default SingleReport;