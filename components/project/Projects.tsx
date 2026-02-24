import CustomImage from '@/utlis/imagefunction';
import Styles from "./style.module.css";
import { Col, Container, Row } from 'react-bootstrap';
import Link from 'next/link';
interface AboutProject {
    about_us_project_section_title?: string;
    about_us_project_section_description?: string;
}
interface ProjectItem {
    project_title?: string;
    project_subtitle?: string;
    project_slug?: string;
    project_short_description?: string;
    project_feature_image?: string;
    project_location?: string;
    project_button?: string;
    project_video_link?: string;
}
interface DataProps {
    sectionData: AboutProject | undefined;
    projects?: ProjectItem[] | null;
}
const Projects = ({ sectionData, projects }: DataProps) => {
    if (!sectionData || projects?.length === 0) return null;

    return (
        <div className={Styles.inrmdl_upcomsec}>
            <Container>
                <div className={Styles.inner_mdlprheading}>
                    <div className="cmn_black_heading"
                        dangerouslySetInnerHTML={{ __html: sectionData?.about_us_project_section_title ?? '' }}
                    />
                    <div className={Styles.paragraph}
                        dangerouslySetInnerHTML={{ __html: sectionData?.about_us_project_section_description ?? '' }}
                    />
                </div>
                <Row>
                    {projects?.map((value, index) => (
                        <Col lg={4} key={index}>
                            <div className={Styles.upcomsbx}>
                                <CustomImage
                                    src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${value.project_feature_image}`}
                                    className={Styles.upcmsimg}
                                />
                                <div className={`${Styles.upgoal} d-flex align-items-center`}>
                                    <div className={Styles.upgoaltext}
                                        dangerouslySetInnerHTML={{ __html: value?.project_subtitle ?? '' }}                                        
                                    />
                                </div>
                                <div className={Styles.upcpheadbx}>
                                    <div className={Styles.upcphead}
                                        dangerouslySetInnerHTML={{ __html: value?.project_title ?? '' }}                                        
                                    />
                                    <div className={Styles.paragraph}
                                        dangerouslySetInnerHTML={{ __html: value?.project_short_description ?? '' }}   
                                    />
                                    <Link href={`/projects/${value.project_slug}`} className={Styles.donatenowup}>Donate Now</Link>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )
}

export default Projects
