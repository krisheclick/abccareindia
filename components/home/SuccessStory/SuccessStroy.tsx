'use client';

import { Col, Container, Modal, Row, Stack } from 'react-bootstrap';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import Styles from "./style.module.css"
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import CustomImage from '@/utlis/imagefunction';
import { useRef, useState } from 'react';
import { normalizeYouTubeUrl } from '@/utlis/videoUrl';
import { FreeMode, Navigation } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faPlay } from '@fortawesome/free-solid-svg-icons';

interface SuccessStorySectionProps {
    sectionData: {
        success_story_title: string;
        success_story_subtitle: string;
        success_story_description: string;
    };
    stories: {
        success_story_media_file: string;
    }[];
}

interface MediaData {
    file_name?: string;
    media_link?: string;
    thumb_name?: string;
    upload_type?: string;
    video_duration?: string;
}

const mediaBaseURL = process.env.NEXT_PUBLIC_MEDIA_URL;

const SuccessStory = ({ sectionData, stories, }: SuccessStorySectionProps) => {
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

    if (!sectionData || !stories || stories.length === 0) return null;

    // media gallery comes as JSON string
    const mediaItems =
        stories[0]?.success_story_media_file
            ? JSON.parse(stories[0].success_story_media_file)
            : [];
    return (
        <>
            <Stack as="section" className={Styles.giftImpact}>
                <Container>
                    <Row>
                        <Col lg={4}>
                            <Stack className={Styles.content}>
                                <div
                                    className={Styles.small_title}
                                    dangerouslySetInnerHTML={{
                                        __html: sectionData.success_story_subtitle,
                                    }}
                                />
                                <div
                                    className={`cmn_black_heading big ${Styles.title}`}
                                    dangerouslySetInnerHTML={{
                                        __html: sectionData.success_story_title,
                                    }}
                                />
                                <div
                                    className={Styles.description}
                                    dangerouslySetInnerHTML={{
                                        __html: sectionData.success_story_description,
                                    }}
                                />
                            </Stack>
                        </Col>
                        <Col lg={8}>
                            <div className={Styles.slider_wrapper}>
                                <Swiper
                                    className={`gift_slider ${Styles.gift_slider}`}
                                    navigation={false}
                                    loop={(mediaItems.length || 0) > 3}
                                    spaceBetween={20}
                                    slidesPerView={Math.min(mediaItems.length || 1, 3)}
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
                                    {mediaItems.map((item: MediaData, index: number) => (
                                        <SwiperSlide key={index} className={Styles.slide_item}>
                                            {item.thumb_name && (
                                                <Stack className='position-relative'>
                                                    <CustomImage
                                                        src={`${mediaBaseURL}${item.thumb_name}`}
                                                        alt={`Success Story ${index + 1}`}
                                                        className={Styles.video_poster}
                                                    />
                                                    <span
                                                        className={Styles.videoIcon}
                                                        onClick={() => handleOpenVideo(item?.media_link || '')}
                                                    >
                                                        <FontAwesomeIcon icon={faPlay} />
                                                    </span>
                                                    <em className={Styles.video_duration}>{item.video_duration}</em>
                                                </Stack>
                                            )}

                                        </SwiperSlide>
                                    ))}
                                </Swiper>
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
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Stack>
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
        </>
    );
}
export default SuccessStory;
