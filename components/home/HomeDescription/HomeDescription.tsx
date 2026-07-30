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
        international_qr_code?: string;
        about_left_image_text?: string;
        about_right_button_text?: string;
        about_right_button_url?: string;
        about_right_description?: string;
        about_right_image?: string;
        about_subtitle?: string;
        about_title?: string;
    }
    country_code?: string;
    projectNumber?: string;
}

const mediaBaseURL = process.env.NEXT_PUBLIC_MEDIA_URL;

export default function HomeDescription({ aboutSection, country_code, projectNumber}: AboutInfo) {
    const { hasLoading } = useGlobalContext();
    useWOW({ animateClass: "animate__animated" });
    const formattedProjectNumber = projectNumber ? Number(projectNumber).toLocaleString("en-IN") : "";
    const aboutTitle = `${formattedProjectNumber ? `<span>${formattedProjectNumber}</span> ` : ''}${aboutSection?.about_title ?? ''}`;

    // console.log('country_code', country_code)
    // const qrCode = (country_code == "IN") ? aboutSection?.about_left_image : aboutSection?.international_qr_code;

    return (
        <section className={Styles.posterAd}>
            <Container fluid className='px-0'>
                <Row className="g-0 align-items-stretch">
                    <Col lg={6} className={Styles.left}>
                        {!hasLoading && aboutSection ? (
                            <>
                                <div className={Styles.leftContent}>
                                    <div className={`wow animate__lightSpeedInRight ${Styles.smallTitle}`}>{aboutSection?.about_subtitle}</div>

                                    <h1 className={`wow animate__fadeInUp ${Styles.mainTitle}`}
                                        dangerouslySetInnerHTML={{
                                            __html: aboutTitle,
                                        }}
                                    />
                                    {aboutSection?.about_left_button_text && (
                                        <Link
                                            href={aboutSection?.about_left_button_url ?? ''}
                                            className={`wow animate__backInUp ${Styles.donateBtn}`}
                                            data-wow-delay="1s"
                                        >
                                            {aboutSection?.about_left_button_text}
                                        </Link>
                                    )}
                                </div>
                                {(country_code == "IN") ? (
                                    <CustomImage
                                        // src={`${mediaBaseURL}/uploads/page_image/${qrCode}`}
                                        src={`${mediaBaseURL}/uploads/page_image/${aboutSection?.about_left_image}`}
                                        alt="QR Code"
                                        className={`wow animate__pulse ${Styles.qrBox}`}
                                        data-wow-delay="1.5s"
                                    />
                                ) : (
                                    <table className={`table table-bordered ${Styles.qrTable}`}>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <strong>Organization Name</strong>
                                                    <p>Asha Bhavan Centre</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong>Organization A/C No</strong>
                                                    <p>40099009078 (FCRA Savings Account)</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong>Bank Name</strong>
                                                    <p>State Bank of India</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong>IFSC Code</strong>
                                                    <p>SBIN000691</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                )}
                            </>
                        ) : (
                            <>
                                <div className={`py-4 w-75 ${Styles.leftContent}`}>
                                    <div className={`skeleton skeletonHeightText w-25 ${Styles.smallTitle}`}>&nbsp;</div>
                                    <br />
                                    <p className="skeleton mb-2">&nbsp;</p>
                                    <p className="skeleton mb-2">&nbsp;</p>
                                    <p className="skeleton mb-2">&nbsp;</p>
                                    <p className="skeleton mb-2 w-75">&nbsp;</p>
                                    <p className="skeleton mb-2 w-50">&nbsp;</p>
                                    <span
                                        className={`skeleton skeletonBtn ${Styles.donateBtn}`}
                                        data-wow-delay="1s"
                                    >&nbsp;</span>
                                </div>
                                <div className={`custom_image fixedImage ${Styles.qrBox}`}>
                                    <div className={`skeleton ${Styles.qrBoxSkeleton}`}></div>
                                </div>
                            </>
                        )}

                    </Col>

                    <Col lg={6} className={Styles.right}>
                        {!hasLoading && aboutSection ? (
                            <>
                                <div className={Styles.rightContent}>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: aboutSection?.about_right_description ?? '',
                                        }}
                                        className='wow animate__slideInDown'
                                    />
                                    {aboutSection?.about_right_button_text && (
                                        <Link
                                            href={aboutSection?.about_right_button_url ?? ''}
                                            className={`wow animate__slideInUp ${Styles.secondaryBtn}`}
                                        >
                                            {aboutSection?.about_right_button_text}
                                        </Link>
                                    )}
                                </div>
                                {aboutSection?.about_right_image && (
                                    <CustomImage
                                        src={`${mediaBaseURL}/uploads/page_image/${aboutSection?.about_right_image}`}
                                        alt="About Image"
                                        className={`wow animate__slideInRight ${Styles.imageWrap}`}
                                    />
                                )}
                            </>
                        ) : (
                            <>
                               <div className={`w-75 ${Styles.rightContent}`}>
                                    <div className={`skeleton skeletonHeightText w-25 ${Styles.smallTitle}`}>&nbsp;</div>
                                    <br />
                                    <div className="skeleton mb-2">&nbsp;</div>
                                    <div className="skeleton mb-2">&nbsp;</div>
                                    <div className="skeleton mb-2">&nbsp;</div>
                                    <div className="skeleton mb-2 w-75">&nbsp;</div>
                                    <div className="skeleton mb-2 w-50">&nbsp;</div>
                                    <span
                                        className={`skeleton skeletonBtn ${Styles.secondaryBtn}`}
                                        data-wow-delay="1s"
                                    >&nbsp;</span>
                                </div>
                                <div className={`custom_image fixedImage ${Styles.imageWrap}`}>
                                    <div className="skeleton" style={{aspectRatio: 1/1}}></div>
                                </div>
                            </>
                        )}
                    </Col>

                </Row>
            </Container>
        </section>
    );
}
