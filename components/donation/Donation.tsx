"use client";
import { useGlobalContext } from '@/context/global_context';
import Styles from './style.module.css';
import { Col, Container, Row } from 'react-bootstrap';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import { useWOW } from '@moondev/next-wow';

const Donation = () => {
    const { commonData } = useGlobalContext();
    useWOW({ animateClass: "animate__animated" });
    return (
        <section className={`pt_100 pb_100 ${Styles.donation_section}`}>
            <Container>
                <Row className='align-items-stretch g-4'>
                    <Col lg={4}>
                        <p className={`mb-2 wow animate__lightSpeedInLeft ${Styles.smallsubhead}`}>{commonData?.site_donation_heading_title}</p>
                        <h3 className="cmn_black_heading big wow animate__slideInUp" dangerouslySetInnerHTML={{ __html: commonData?.site_donation_heading_subtitle || '' }} />
                        <p className='mt-3 wow animate__slideInUp' data-wow-delay=".8s">{commonData?.site_donation_heading_short_desc}</p>
                    </Col>
                    <Col lg={4}>
                        <div className={`wow animate__fadeInUp h-100 ${Styles.info_box} ${Styles.volunteerBox}`} data-wow-delay=".25s">
                            <h4 className='fw-bold'>{commonData?.site_volunteer_title}</h4>
                            <p>
                                {commonData?.site_volunteer_short_desc}
                            </p>
                            <Link
                                href={`${process.env.NEXT_PUBLIC_ENV_URL}/${commonData?.site_volunteer_button_url}` || ''}
                                className={Styles.btnLink}
                            >
                                {commonData?.site_volunteer_button_text} <FontAwesomeIcon icon={faArrowRightLong} />
                            </Link>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className={`wow animate__fadeInUp h-100 ${Styles.info_box} ${Styles.donateBox}`} data-wow-delay=".5s">
                            <h4 className='fw-bold'>{commonData?.site_donate_title}</h4>
                            <p>
                                {commonData?.site_donate_short_desc}
                            </p>
                            <Link
                                href={`${process.env.NEXT_PUBLIC_ENV_URL}/${commonData?.site_donate_button_url}` || ''}
                                className={`${Styles.btnLink} ${Styles.dark}`}
                            >
                                {commonData?.site_donate_button_text} <FontAwesomeIcon icon={faArrowRightLong} />
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Donation
