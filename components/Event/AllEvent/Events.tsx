"use client";
import { Col, Container, Row, Stack } from 'react-bootstrap';
import Styles from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faPlay } from '@fortawesome/free-solid-svg-icons';
import { safeParse } from '@/utlis/safe_parse';
import Image from 'next/image';
import Link from 'next/link';
import { useGlobalContext } from '@/context/global_context';
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import FancyboxWrapper from '@/utlis/FancyboxWrapper';

interface EventsData {
    event_title?: string;
    event_slug?: string;
    event_short_description?: string;
    event_description?: string;
    event_feature_image?: string;
    event_date?: string;
    event_gallery?: string[] | string;
    event_video_link_gallery?: string[] | string;
}
const Events = ({ data }: { data?: EventsData | null }) => {
    const { mediaUrl } = useGlobalContext();
    const gallery = safeParse(data?.event_gallery);
    const videos = safeParse(data?.event_video_link_gallery);

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const tabParam = searchParams.get("tab");

    const activeTab: "images" | "videos" = tabParam === "videos" ? "videos" : "images";

    return (
        <Stack className={Styles.tabSection}>
            <Container>
                <ul className={Styles.tabList}>
                    <li className={activeTab === "images" ? Styles.active : ""}>
                        <span
                            className={Styles.tabLink}
                            onClick={() =>
                                router.push(`${pathname}?tab=images`, { scroll: false })
                            }
                        >
                            <FontAwesomeIcon icon={faImage} /> Images
                        </span>
                    </li>

                    <li className={activeTab === "videos" ? Styles.active : ""}>
                        <span
                            className={Styles.tabLink}
                            onClick={() =>
                                router.push(`${pathname}?tab=videos`, { scroll: false })
                            }
                        >
                            <FontAwesomeIcon icon={faPlay} /> Videos
                        </span>
                    </li>
                </ul>
                <div className={Styles.tabContent}>
                    {activeTab === "images" && (
                        <Stack className={Styles.galleryRow ?? ''}>
                            {Array.isArray(gallery) && gallery.length > 0 ? (
                                <FancyboxWrapper>
                                    <Row className="gx-xl-4 gx-sm-3 gx-2 rowGap">
                                        {gallery.map((value, index) => (
                                            <Col lg={4} sm={6} key={index} className={Styles.item}>
                                                <Link
                                                    className={Styles.poster}
                                                    href={`${mediaUrl}${value}`}
                                                    data-fancybox="gallery"
                                                >
                                                    <Image
                                                        src={`${mediaUrl}${value}`}
                                                        alt={`${data?.event_title}-${index}`}
                                                        fill
                                                    />
                                                </Link>
                                            </Col>
                                        ))}
                                    </Row>
                                </FancyboxWrapper>
                            ) : (
                                <p className="text-center">Gallery not Found!</p>
                            )}
                        </Stack>
                    )}
                    {activeTab === "videos" && (
                        <Stack className={Styles.videosRow ?? ''}>
                            {Array.isArray(videos) && videos.length > 0 ? (
                                <FancyboxWrapper>
                                    <Row className="g-4">
                                        {videos.map((value, index) => {
                                            let videoPath = "";

                                            if (value?.upload_type === "file") {
                                                videoPath = `${mediaUrl}${value?.file}`;
                                            } else if (value?.upload_type === "link") {
                                                videoPath = value?.link;
                                            }

                                            return (
                                                <Col lg={4} key={index}>
                                                    <Link
                                                        href={videoPath}
                                                        className={Styles.poster}
                                                        data-fancybox="video_gallery"
                                                    >
                                                        <Image
                                                            src={`${mediaUrl}${value?.thumb_name}`}
                                                            alt={`${data?.event_title}-${index}`}
                                                            fill
                                                        />
                                                        <Stack as="span" className={Styles.videoIcon}>
                                                            <FontAwesomeIcon icon={faPlay} />
                                                        </Stack>
                                                    </Link>
                                                </Col>
                                            );
                                        })}
                                    </Row>
                                </FancyboxWrapper>
                            ) : (
                                <p className="text-center">Videos not Found!</p>
                            )}
                        </Stack>
                    )}
                </div>
            </Container>
        </Stack>
    )
}

export default Events
