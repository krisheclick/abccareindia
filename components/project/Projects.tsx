"use client";
import CustomImage from '@/utlis/imagefunction';
import Styles from "./style.module.css";
import { Col, Container, Row, Stack } from 'react-bootstrap';
import Link from 'next/link';
import { useGlobalContext } from '@/context/global_context';

interface ProjectDataType {
    project_title?: string;
    project_subtitle?: string;
    project_slug?: string;
    project_short_description?: string;
    project_feature_image?: string;
    project_description?: string;
    project_video_link?: string;
}
interface ProjectProps {
    relatedProjects?: ProjectDataType[] | null;
}

const Projects = ({ relatedProjects }: ProjectProps) => {
    const { commonData, projectData } = useGlobalContext();

    if (!relatedProjects && (!projectData || projectData.length === 0)) return null;

    const allProjects = relatedProjects ?? projectData ?? [];

    return (
        <Stack className={Styles.section}>
            <Container>
                <div className={`inner_mdlprheading ${Styles.section_content ?? ''}`}>
                    <div className="cmn_black_heading"
                        dangerouslySetInnerHTML={{ __html: commonData?.site_project_title ?? '' }}
                    />
                    <div className={Styles.paragraph}
                        dangerouslySetInnerHTML={{ __html: commonData?.site_project_short_description ?? '' }}
                    />
                </div>
                {allProjects.length > 0 ? (
                    <Row className="rowGap">
                        {allProjects.slice(0, 3).map((value, index) => (
                            <Col lg={4} md={6} key={index}>
                                <div className={Styles.card}>
                                    <CustomImage
                                        src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${value.project_feature_image}`}
                                        alt={value?.project_title}
                                        className={Styles.card_img}
                                    />
                                    {value?.project_subtitle && (
                                        <div
                                            className={Styles.card_subtitle}
                                            dangerouslySetInnerHTML={{ __html: value?.project_subtitle ?? '' }}
                                        />
                                    )}
                                    <Stack className={Styles.card_content}>
                                        <div
                                            className={Styles.title}
                                            dangerouslySetInnerHTML={{ __html: value?.project_title ?? '' }}
                                        />
                                        <div
                                            className={Styles.card_text}
                                            dangerouslySetInnerHTML={{ __html: value?.project_short_description ?? '' }}
                                        />
                                        <Link href={`/our-projects/${value.project_slug}`} className={`btn btn-primary my-0 ${Styles.card_btn}`}>
                                            Learn More
                                        </Link>
                                    </Stack>
                                </div>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <p className="text-center fw-medium">Project not Found!</p>
                )}
            </Container>
        </Stack>
    )
}

export default Projects
