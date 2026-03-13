'use client';
import Link from 'next/link';
import Styles from "./style.module.css";
import { Col, Container, Row } from 'react-bootstrap';
import CustomImage from '@/utlis/imagefunction';
import { useGlobalContext } from '@/context/global_context';
import { useWOW } from '@moondev/next-wow';

interface AboutInfo {
    aboutSection?: {
        about_left_button_text?: string;
        about_left_button_url?: string;
        about_left_image?: string;
        about_left_image_text?: string;
        about_right_button_text?: string;
        about_right_button_url?: string;
        about_right_description?: string;
        about_right_image?: string;
        about_subtitle?: string;
        about_title?: string;
    }
}

const mediaBaseURL = process.env.NEXT_PUBLIC_MEDIA_URL;

export default function HomeDescription({ aboutSection }: AboutInfo) {
    const { hasLoading } = useGlobalContext();
    useWOW({ animateClass: "animate__animated" });

    if (!aboutSection) return null;

    return (
        <section className={Styles.posterAd}>
            <Container fluid className='px-0'>
                <Row className="g-0 align-items-stretch">
                    <Col lg={6} className={Styles.left}>
                        {!hasLoading ? (
                            <>
                                <div className={Styles.leftContent}>
                                    <div className={`wow animate__lightSpeedInRight ${Styles.smallTitle}`}>{aboutSection.about_subtitle}</div>

                                    <h1 className={`wow animate__fadeInUp ${Styles.mainTitle}`}
                                        dangerouslySetInnerHTML={{
                                            __html: aboutSection.about_title ?? '',
                                        }}
                                    />
                                    {aboutSection.about_left_button_text && (
                                        <Link
                                            href={aboutSection.about_left_button_url ?? ''}
                                            className={`wow animate__backInUp ${Styles.donateBtn}`}
                                            data-wow-delay="1s"
                                        >
                                            {aboutSection.about_left_button_text}
                                        </Link>
                                    )}
                                </div>
                                <CustomImage
                                    src={`${mediaBaseURL}/uploads/page_image/${aboutSection.about_left_image}`}
                                    alt="QR Code"
                                    className={`wow animate__pulse ${Styles.qrBox}`}
                                    data-wow-delay="1.5s"
                                />
                            </>
                        ) : (
                            <>Loader</>
                        )}

                    </Col>
                    
                    <Col lg={6} className={Styles.right}>
                        <div className={Styles.rightContent}>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: aboutSection.about_right_description ?? '',
                                }}
                                className='wow animate__slideInDown'
                            />
                            {aboutSection.about_right_button_text && (
                                <Link
                                    href={aboutSection.about_right_button_url ?? ''}
                                    className={`wow animate__slideInUp ${Styles.secondaryBtn}`}
                                >
                                    {aboutSection.about_right_button_text}
                                </Link>
                            )}
                        </div>
                        {aboutSection.about_right_image && (
                            <CustomImage
                                src={`${mediaBaseURL}/uploads/page_image/${aboutSection.about_right_image}`}
                                alt="About Image"
                                className={`wow animate__slideInRight ${Styles.imageWrap}`}
                            />
                        )}
                    </Col>

                </Row>
            </Container>
        </section>
    );
}