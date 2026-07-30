'use client';
import Styles from "./style.module.css"
import { Col, Container, Row } from 'react-bootstrap';
import { useGlobalContext } from "@/context/global_context";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import CustomImage from "@/utlis/imagefunction";
// import CustomImage from "@/utlis/imagefunction";

interface USPItem {
    project_category_feature_image?: string;
    project_category_title?: string;
    project_category_slug?: string;
    project_category_description?: string;
}
interface OurReachSectionData {
    our_reach_title?: string;
    our_reach_description?: string;
    beneficiaries_report_title?: string;
}
interface ProjectCategoryUSPProps {
    sectionData?: OurReachSectionData;
}

const ProjectCategoryUSP = ({ sectionData }: ProjectCategoryUSPProps) => {
    const { setHasLoading, hasLoading } = useGlobalContext();
    const [categoryData, setCategoryData] = useState<USPItem[] | null>(null);
    void sectionData;

    const fetchData = useCallback(async () => {
        try {
            setHasLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-projects-category/`);
            const { response_data } = await response.json();
            setCategoryData(response_data?.get_all_category ?? []);
        } catch (err: unknown) {
            console.log('Get Project Category Error: ', (err as Error).message);
        } finally {
            setHasLoading(false);
        }
    }, [setHasLoading]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className={Styles.usp_section}>
            <Container>
                <Row className={`g-3 gx-xl-4 ${Styles.row ?? ''}`}>
                    {!hasLoading ? (
                        categoryData?.map((item, index) => (
                            <Col lg={4} sm={6} key={`${item.project_category_slug || 'category'}-${index}`} className={Styles.cardItem}>
                                <Link
                                    href={`/our-projects?page=1&category=${item.project_category_slug || 'all'}#project-categories`}
                                    className={Styles.card}
                                >
                                    {item.project_category_feature_image && (
                                        <CustomImage
                                            src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${item.project_category_feature_image}`}
                                            alt={item.project_category_title}
                                            className={Styles.cardImage}
                                        />
                                    )}
                                    <h3>{item.project_category_title}</h3>
                                    <div
                                        className={Styles.card_content}
                                        dangerouslySetInnerHTML={{
                                            __html: item.project_category_description ?? ''
                                        }}
                                    />
                                </Link>
                            </Col>
                        ))) : (
                        [...Array(6)].map((_, index) => (
                            <Col xl={4} sm={6} key={index} className={Styles.cardItem}>
                                <div className={Styles.card}>
                                    <div className={`skeleton ${Styles.cardImage}`}></div>
                                    <h3 className="skeleton w-75">&nbsp;</h3>
                                    <div className={`w-100 ${Styles.card_content}`}>
                                        <p className="skeleton w-100 skeletonHeightText mb-2">&nbsp;</p>
                                        <p className="skeleton w-75 mx-auto skeletonHeightText mb-2">&nbsp;</p>
                                        <p className="skeleton w-50 mx-auto skeletonHeightText mb-2">&nbsp;</p>
                                    </div>
                                </div>
                            </Col>
                        ))
                    )}
                </Row>
            </Container>
        </div>
    );
}

export default ProjectCategoryUSP;
