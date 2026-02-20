'use client';

import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import Styles from "./style.module.css";
import { Card, CardBody, CardTitle, Col, Container, Modal, Row, Stack } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import CustomImage from '@/utlis/imagefunction';
import { FreeMode, Navigation } from 'swiper/modules';
import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import type { Swiper as SwiperType } from 'swiper';
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay';
import { normalizeYouTubeUrl } from '@/utlis/videoUrl';


interface ProjectSection {
    project_title?: string;
    project_subtitle?: string;
    project_button_text?: string;
    project_button_url?: string;
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

interface HomeProjectProps {
    sectionData: ProjectSection | null;
    projects: ProjectItem[];
}

const mediaBaseURL = process.env.NEXT_PUBLIC_MEDIA_URL;

const HomeProject = ({ sectionData, projects}: HomeProjectProps) =>  {
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const swiperRef = useRef<SwiperType | null>(null);
    const [showVideo, setShowVideo] = useState<boolean>(false);
    const [videoUrl, setVideoUrl] = useState<string>("");

    const handleOpenVideo = (url: string) => {
        setVideoUrl(normalizeYouTubeUrl(url));
        setShowVideo(true);
    };

    const handleCloseVideo = (): void => {
        setShowVideo(false);
        setTimeout(() => {
            setVideoUrl("");
        }, 300);
    };

    if (!sectionData || !projects || projects.length === 0) return null;
    return (
        <Stack className={`d-block ${Styles.projects}`}>
            <Container fluid className='p-0'>
                <Stack className={`d-block text-center ${Styles.projects_header}`}>
                    <h2 className={Styles.heading}>{sectionData.project_title}</h2>
                    <div
                        className={Styles.headDescription}
                        dangerouslySetInnerHTML={{ __html: sectionData.project_subtitle || '' }}
                    />
                </Stack>
                <Swiper
                    className={`project_slider ${Styles.project_slider}`}
                    navigation={false}
                    modules={[FreeMode, Navigation]}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;

                        setIsBeginning(swiper.isBeginning);
                        setIsEnd(swiper.isEnd);

                        swiper.on("slideChange", () => {
                            setIsBeginning(swiper.isBeginning);
                            setIsEnd(swiper.isEnd);
                        });
                    }}
                >
                    {projects.map((item, index) => (
                        <SwiperSlide key={index} className={Styles.item}>
                            <Row className='gx-0 align-items-center'>
                                <Col lg={6}>
                                    <Card className={Styles.card}>
                                        <CardBody className={Styles.cardBody}>
                                            <div className={Styles.subtitle}>{item.project_subtitle}</div>
                                            <CardTitle className={Styles.cardTitle}>{item.project_title}</CardTitle>
                                            <Stack
                                                gap={2}
                                                dangerouslySetInnerHTML={{ __html: item.project_short_description || '' }}
                                                className={Styles.cardDescription}
                                            />
                                            <Link
                                                href={`/our-project/${item.project_slug}`}
                                                className={Styles.card_button}
                                            >
                                                Learn More
                                            </Link>
                                        </CardBody>
                                        <div className={Styles.controls}>
                                            <button
                                                className={`${Styles.prev} ${isBeginning ? Styles.disabled : ""}`}
                                                onClick={() => swiperRef.current?.slidePrev()}
                                                disabled={isBeginning}
                                            >
                                                <FontAwesomeIcon icon={faChevronLeft} />
                                            </button>

                                            <button
                                                className={`${Styles.next} ${isEnd ? Styles.disabled : ""}`}
                                                onClick={() => swiperRef.current?.slideNext()}
                                                disabled={isEnd}
                                            >
                                                <FontAwesomeIcon icon={faChevronRight} />
                                            </button>
                                        </div>
                                    </Card>
                                </Col>
                                <Col lg={6}>
                                    <Stack className='position-relative'>
                                        <CustomImage
                                            className={Styles.videoPoster}
                                            src={`${mediaBaseURL}${item.project_feature_image}`}
                                            alt={item.project_title || 'Poster Image'}
                                            style={{ objectFit: "cover" }}
                                        />
                                        <span 
                                            className={Styles.videoIcon}
                                            onClick={() => handleOpenVideo(item.project_video_link ?? '')}
                                        >
                                            <FontAwesomeIcon icon={faPlay} />
                                        </span>
                                    </Stack>
                                </Col>
                            </Row>
                        </SwiperSlide>
                    ))}
                </Swiper>
                {sectionData.project_button_text && (
                    <Stack direction="horizontal" className={Styles.buttonWrap}>
                        <Link
                            href={sectionData.project_button_url || '#'}
                            className={Styles.project_button}
                        >
                            {sectionData.project_button_text}
                        </Link>
                    </Stack>
                )}
            </Container>
            <Modal className="customBackdrop" show={showVideo} onHide={handleCloseVideo} size="xl" centered backdrop={false}>
                <Modal.Header closeButton>
                    <Modal.Title className="fw-semibold"></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ padding: 0 }}>
                    <div style={{ position: "relative", paddingTop: "56.25%"}}>
                        <iframe width="100%" height="100%" src={videoUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                            style={{ position: "absolute", top: 0, left: 0 }}></iframe>
                    </div>
                </Modal.Body>
            </Modal>
        </Stack>
    );
}

export default HomeProject;