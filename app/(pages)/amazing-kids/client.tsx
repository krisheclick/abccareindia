"use client";
import InnerBanner from "@/components/layout/banner/InnerBanner";
import { useGlobalContext } from "@/context/global_context";
import { useEffect, useState } from "react";
import { Col, Container, Row, Stack } from "react-bootstrap";
import Styles from "./style.module.css"
import CustomImage from "@/utlis/imagefunction";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";

interface Amazing_kids {
    ak_title?: string;
    ak_slug?: string;
    ak_short_description?: string;
    ak_description?: string;
    ak_feature_image?: string;
    ak_status?: string;
}
interface PageData {
    page_name?: string;
    page_slug?: string;
    page_feature_image?: string;
    page_short_description?: string;
    page_content?: string;
    amazing_kids?: Amazing_kids[] | null;
}
const AmazingKidsClient = () => {
    const [data, setData] = useState<PageData | null>(null);
    const { setHasLoading, setInnerBanner, commonData } = useGlobalContext();

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                setHasLoading(true);
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/page/amazing-kids`,
                    { cache: "no-cache" }
                );
                const { response_data } = await response.json();
                setData(response_data);
                setInnerBanner(response_data.page)
            } catch (err: unknown) {
                console.log('amazon kids page data fetch is something wrong: ', (err as Error).message)
            } finally {
                setHasLoading(false);
            }
        }
        fetchData();
    }, [setHasLoading, setInnerBanner]);

    return (
        <Stack as="section" className="amazing-kids-page">
            <InnerBanner />
            <Stack className={Styles.mainSection}>
                <Container>
                    <Stack className={Styles.section_content}>
                        <h1 className={`cmn_black_heading ${Styles.page_title ?? ''}`}>{commonData?.site_amazing_kids_page_title}</h1>
                    </Stack>
                    {data?.amazing_kids && data?.amazing_kids.length ? (
                        <Stack className={Styles.kidsList ?? ''}>
                            {data?.amazing_kids.map((item, index) => (
                                <Stack className={Styles.rowWrap} key={index}>
                                    <Row className={`${Styles.row} align-items-center gy-3 ${(index % 2 == 1) ? 'flex-lg-row-reverse':''}`}>
                                        <Col lg={6}>
                                            <Stack className={Styles.content}>
                                                <div className={Styles.subHeading}>{item.ak_title}</div>
                                                <div
                                                    className={Styles.description}
                                                    dangerouslySetInnerHTML={{ __html: item.ak_short_description || '' }}
                                                />
                                                <Link 
                                                    href={`${process.env.NEXT_PUBLIC_ENV_URL}/amazing-kids/${item.ak_slug}`}
                                                    className={`btn btn-primary ${Styles.kidBtn}`}
                                                >
                                                    Read More <FontAwesomeIcon icon={faAngleDoubleRight} />
                                                </Link>
                                            </Stack>
                                        </Col>
                                        <Col lg={6}>
                                            <CustomImage
                                                className={Styles.poster}
                                                src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${item.ak_feature_image}`}
                                            />
                                        </Col>
                                    </Row>
                                </Stack>
                            ))}
                        </Stack>
                    ) : (
                        <p className="text-center fw-medium">Kids data not found</p>
                    )}
                </Container>
            </Stack>
        </Stack>
    )
}

export default AmazingKidsClient;