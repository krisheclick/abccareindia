"use client"
import { Col, Container, Row, Stack } from "react-bootstrap";
import Styles from "../style.module.css";
import { useGlobalContext } from "@/context/global_context";
import InnerBanner from "@/components/layout/banner/InnerBanner";
import { useEffect, useState } from "react";
import Projects from "@/components/project/Projects";
import CustomImage from "@/utlis/imagefunction";
import NotFound from "@/app/not-found";

interface PageData {
    amazing_kids?: {
        ak_title?: string;
        ak_description?: string;
        ak_feature_image?: string;
        ak_banner_image?: string;
    }
}
const KidsSingleClient = ({ permalink }: { permalink: string }) => {
    const [data, setData] = useState<PageData | null>(null);
    const [notFound, setNotFound] = useState<boolean>(false);
    const { setHasLoading, hasLoading, setInnerBanner, commonData, mediaUrl } = useGlobalContext();

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                setHasLoading(true);
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/amazing-kids/${permalink}`,
                    { cache: "no-cache" }
                );
                const {response_code, response_data } = await response.json();
                if(!response_code){
                    setNotFound(true);
                }
                setData(response_data);
                setInnerBanner({
                    page_name: response_data.amazing_kids.ak_title,
                    page_feature_image: response_data.amazing_kids.ak_banner_image,
                })
            } catch (err: unknown) {
                console.log('amazon kids page data fetch is something wrong: ', (err as Error).message)
            } finally {
                setHasLoading(false);
            }
        }
        fetchData();
    }, [setHasLoading, setInnerBanner, permalink]);

    if(notFound){
        return <NotFound />
    }
    return (
        <Stack as="section" className="kids-single-page">
            <InnerBanner
                breadcrumb={[{
                    breadcrumb_item: "Amazing Kids",
                    breadcrumb_slug: `${process.env.NEXT_PUBLIC_ENV_URL}/amazing-kids`
                }]}
            />
            <Stack className={Styles.mainSection}>
                <Container>
                    <Row className="gx-xxl-5">
                        <Col lg={6}>
                            {!hasLoading && (
                                <CustomImage
                                    className={`stickyPoster ${Styles.poster ?? ''}`}
                                    src={`${mediaUrl}${data?.amazing_kids?.ak_feature_image}`}
                                    alt={data?.amazing_kids?.ak_title}
                                    width={720}
                                    height={520}
                                />
                            )}
                        </Col>
                        <Col lg={6}>
                            <Stack className={Styles.details_content}>
                                <h1 className={`cmn_black_heading ${Styles.page_title ?? ''}`}>{commonData?.site_amazing_kids_page_title}</h1>
                                <div
                                    className={Styles.description}
                                    dangerouslySetInnerHTML={{ __html: data?.amazing_kids?.ak_description || '' }}
                                />
                            </Stack>
                        </Col>
                    </Row>
                </Container>
            </Stack>
            <Projects />
        </Stack>
    )
}
export default KidsSingleClient;