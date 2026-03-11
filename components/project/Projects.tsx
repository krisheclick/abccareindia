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

    console.log('allProjects', allProjects)

    return (
        <Stack className={Styles.inrmdl_upcomsec}>
            <Container>
                <div className={Styles.inner_mdlprheading}>
                    <div className="cmn_black_heading"
                        dangerouslySetInnerHTML={{ __html: commonData?.site_project_title ?? '' }}
                    />
                    <div className={Styles.paragraph}
                        dangerouslySetInnerHTML={{ __html: commonData?.site_project_short_description ?? '' }}
                    />
                </div>
                {allProjects.length > 0 ? (
                    <Row>
                        {allProjects.slice(0, 3).map((value, index) => (
                            <Col lg={4} key={index}>
                                <div className={Styles.upcomsbx}>
                                    <CustomImage
                                        src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${value.project_feature_image}`}
                                        className={Styles.upcmsimg}
                                    />
                                    <div className={`${Styles.upgoal} d-flex align-items-center`}>
                                        <div
                                            className={Styles.upgoaltext}
                                            dangerouslySetInnerHTML={{ __html: value?.project_subtitle ?? '' }}
                                        />
                                    </div>
                                    <div className={Styles.upcpheadbx}>
                                        <div
                                            className={Styles.upcphead}
                                            dangerouslySetInnerHTML={{ __html: value?.project_title ?? '' }}
                                        />
                                        <div
                                            className={Styles.paragraph}
                                            dangerouslySetInnerHTML={{ __html: value?.project_short_description ?? '' }}
                                        />
                                        <Link href={`/our-projects/${value.project_slug}`} className={Styles.donatenowup}>
                                            Learn More
                                        </Link>
                                    </div>
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
