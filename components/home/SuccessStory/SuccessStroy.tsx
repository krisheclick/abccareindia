'use client';

import { Col, Container, Modal, Row, Stack } from 'react-bootstrap';
import Styles from "./style.module.css"
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import CustomImage from '@/utlis/imagefunction';
import { useRef, useState } from 'react';
import { normalizeYouTubeUrl } from '@/utlis/videoUrl';
import { FreeMode, Navigation } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faPlay } from '@fortawesome/free-solid-svg-icons';
import { useGlobalContext } from '@/context/global_context';
import Image from 'next/image';

interface MediaData {
    file_name?: string;
    media_link?: string;
    thumb_name?: string;
    upload_type?: string;
    video_duration?: string;
    title?: string;
    description?: string;
}

interface SuccessStoryItem {
    success_story_title?: string;
    success_story_subtitle?: string;
    success_story_description?: string;
    success_story_media_file?: string;
}
interface PageData {
    success_story_subtitle?: string;
    success_story_title?: string;
    success_story_description?: string;
}
interface Success_story_Data {
    pageData?: PageData | null;
    data?: SuccessStoryItem[] | null;
}

const truncateText = (html?: string, wordLimit = 10) => {
    if (!html) return "";

    const text = html.replace(/<[^>]*>/g, "");
    const words = text.trim().split(/\s+/);

    return words.length > wordLimit
        ? `${words.slice(0, wordLimit).join(" ")}...`
        : text;
};

const SuccessStory = ({ pageData, data }: Success_story_Data) => {
    const { mediaUrl, hasLoading } = useGlobalContext();
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const swiperRef = useRef<SwiperType | null>(null);
    const [showVideo, setShowVideo] = useState<boolean>(false);
    const [videoUrl, setVideoUrl] = useState<string>("");
    const [storyModal,setStoryModal] = useState<boolean>(false);
    const [viewStory, setViewStory] = useState<MediaData|null>(null);


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
    const sectionData = data;
    // const mediaItems = null;
    // const mediaItems = safeParse<MediaData[]>(data);
    // const mediaItems = safeParse<MediaData[]>(sectionData?.success_story_media_file);
    // console.log(data);
    const mediaItems =
        data?.flatMap((item) => {
            try {
            const media = JSON.parse(item.success_story_media_file || "[]");

            return media.map((mediaItem: MediaData) => ({
                ...mediaItem,
                title: item.success_story_title,
                description: item.success_story_description,
            }));
            } catch (error) {
            console.error("Invalid JSON:", error);
            return [];
            }
        }) ?? [];
    
    // console.log('mediaItems', mediaItems)

    if (!sectionData) return null;
    
    return (
        <>
            <Stack as="section" className={Styles.giftImpact}>
                <Container>
                    <Row className={`gy-4 ${Styles.row ?? ''}`}>
                        <Col xl={4}>

                            {!hasLoading && pageData ? (
                                <Stack className={Styles.content}>
                                    <div
                                        className={`smallsubhead ${Styles.small_title}`}
                                        dangerouslySetInnerHTML={{
                                            __html: pageData?.success_story_subtitle ?? ''
                                        }}
                                    />
                                    <div
                                        className={`cmn_black_heading big ${Styles.title}`}
                                        dangerouslySetInnerHTML={{
                                            __html: pageData?.success_story_title ?? ''
                                        }}
                                    />
                                    <p
                                        className={Styles.description}
                                        dangerouslySetInnerHTML={{
                                            __html: pageData?.success_story_description ?? ''
                                        }}
                                    />
                                </Stack>
                            ) : (
                                <Stack className={Styles.content}>
                                    <div className={`skeleton w-50 ${Styles.small_title} ${Styles.skeleton_small_title}`}></div>
                                    <div className={`skeleton w-75 mb-2 ${Styles.small_title} ${Styles.skeleton_title}`}></div>
                                    <div className={`skeleton w-50 mb-4 ${Styles.small_title} ${Styles.skeleton_title}`}></div>
                                    <div className="skeleton skeletonText w-100"></div>
                                    <div className="skeleton skeletonText w-100"></div>
                                    <div className="skeleton skeletonText w-75"></div>
                                    <div className="skeleton skeletonText w-50"></div>
                                </Stack>
                            )}
                        </Col>
                        <Col xl={8}>
                            <div className={Styles.slider_wrapper}>
                                <Swiper
                                    className={`gift_slider ${Styles.gift_slider}`}
                                    navigation
                                    // slidesPerView={Math.min(mediaItems?.length || 0, 3)}
                                    slidesPerView={3}
                                    loop={true}
                                    // loop={(mediaItems?.length || 0) > 3}
                                    spaceBetween={12}
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
                                    breakpoints={{
                                        0: {
                                            // slidesPerView: Math.min(mediaItems?.length || 0, 1)
                                            slidesPerView: 1
                                        },
                                        480: {
                                            slidesPerView: 2
                                        },
                                        992: {
                                            slidesPerView: 3
                                        },
                                        1200: {
                                            slidesPerView: 3,
                                            spaceBetween: 20,
                                            navigation: false
                                        }
                                    }}
                                >
                                    {mediaItems?.map((item, index) => (
                                        <SwiperSlide key={index} className={Styles.slide_item}>
                                            {item.thumb_name && (
                                                
                                                <Stack className='position-relative'>
                                                    <figure className={`custom_image fixedImage ${Styles.video_poster ?? ''}`} >
                                                        <Image
                                                            src={`${mediaUrl}${item?.thumb_name}`}
                                                            alt={`Success Story ${index + 1}`}
                                                            fill
                                                            onError={(e) => {
                                                                e.currentTarget.onerror = null;
                                                                e.currentTarget.src = "/assets/images/noimage.webp";
                                                            }}
                                                        />
                                                    </figure>
                                                    {item?.media_link ?(
                                                        <>
                                                            <span
                                                                className={Styles.videoIcon}
                                                                onClick={() => handleOpenVideo(item?.media_link || '')}
                                                            >
                                                                <FontAwesomeIcon icon={faPlay} />
                                                            </span>
                                                            <em className={Styles.video_duration}>{item.video_duration}</em>
                                                            <div className={Styles.card_text}>
                                                                <div className={Styles.card_text_in}>
                                                                    <div className={Styles.card_title} title={item.title}>{item.title}</div>
                                                                    <p>{truncateText(item.description, 8)}</p>
                                                                </div>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div className={Styles.card_text}  onClick={(e) => {
                                                            e.preventDefault();
                                                            setViewStory(item);
                                                            setStoryModal(true)
                                                            }}
                                                        >
                                                            <div className={Styles.card_text_in}>
                                                                <div className={Styles.card_title} title={item.title}>{item.title}</div>
                                                                <p>{truncateText(item.description, 8)}</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Stack>
                                            )}

                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                <div className={Styles.controls}>
                                    <button
                                        className={`swiper-nav-button-prev ${Styles.prev ?? ''} ${isBeginning ? Styles.disabled ?? '' : ""}`}
                                        onClick={() => swiperRef.current?.slidePrev()}
                                        disabled={isBeginning}
                                        aria-label="Previous Button"
                                    >
                                        <FontAwesomeIcon icon={faChevronLeft} />
                                    </button>

                                    <button
                                        className={`swiper-nav-button-next ${Styles.next ?? ''} ${isEnd ? Styles.disabled ?? '' : ""}`}
                                        onClick={() => swiperRef.current?.slideNext()}
                                        disabled={isEnd}
                                        aria-label="Next Button"
                                    >
                                        <FontAwesomeIcon icon={faChevronRight} />
                                    </button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Stack>
            <Modal key="0" className="customBackdrop" show={showVideo} onHide={handleCloseVideo} size="xl" centered backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title className="fw-semibold"></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ padding: 0 }}>
                    <div style={{ position: "relative", paddingTop: "56.25%" }}>
                        <iframe width="100%" height="100%" src={videoUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                            style={{ position: "absolute", top: 0, left: 0 }}></iframe>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal key="1" className="customBackdrop" show={storyModal} onHide={() => setStoryModal(false)} size="xl" centered backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title className="fw-semibold">Success Story</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {viewStory && (
                    <Row className="rowGap align-items-center">
                        <Col md={5}>
                        {viewStory.thumb_name && (
                            <CustomImage
                            src={`${mediaUrl}${viewStory.thumb_name}`}
                            alt={viewStory.title || "Success Story"}
                            className={Styles.video_poster}
                            />
                        )}
                        </Col>
                        <Col md={7}>
                            <h3 className="cmn_black_heading">{viewStory.title}</h3>
                            <p dangerouslySetInnerHTML={{ __html: viewStory.description || "" }} />
                        </Col>
                    </Row>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
}
export default SuccessStory;
