'use client';

import { Container, Modal } from 'react-bootstrap';
import Styles from "./style.module.css";
import CustomImage from '@/utlis/imagefunction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { normalizeYouTubeUrl } from '@/utlis/videoUrl';

interface HomeBannerProps {
    banner: {
        banner_title: string;
        banner_name: string;
        banner_description: string;
        banner_link: string;
        banner_file_link: string;
        banner_video_upload_type: 'file' | 'link';
    };
}

const mediaBaseURL = process.env.NEXT_PUBLIC_MEDIA_URL;

const HomeBanner = ({ banner }: HomeBannerProps) => {
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

    if (!banner) return null;

    return (
        <>
            <div className={`${Styles.innerbanner_sec} ${Styles.home_banner_sec}`}>
                <CustomImage
                    src={`${mediaBaseURL}${banner.banner_link}`}
                    alt={banner.banner_title || "Inner-Banner"}
                    className={`pt-0 ${Styles.inerbnrimg}`}
                    fallBack='/assets/images/home_banner.jpg'
                />
                <div className={Styles.innerbannertxtbx}>
                    <Container>
                        <div className={`${Styles.inrbnrhead} ${Styles.homebnrhead}`}>
                            <em
                                dangerouslySetInnerHTML={{ __html: banner?.banner_name ?? "" }}
                                style={{fontStyle: "normal"}}
                            />  {banner?.banner_file_link && (
                                <button
                                    type="button"
                                    onClick={() => handleOpenVideo(banner.banner_file_link)}
                                    className={Styles.playBtn}
                                >
                                    <FontAwesomeIcon icon={faPlay} />
                                </button>
                            )}
                        </div>
                    </Container>
                </div>
            </div>
            <Modal className="customBackdrop" show={showVideo} onHide={handleCloseVideo} size="xl" centered backdrop={false}>
                <Modal.Header closeButton>
                    <Modal.Title className="fw-semibold"></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ padding: 0 }}>
                    {banner?.banner_video_upload_type == "file" ? (
                        <video width="100%" height="480" controls>
                            <source
                                src={`${mediaBaseURL}${banner.banner_file_link}`}
                                type="video/mp4"
                            />
                        </video>
                    ) : (
                        <div style={{ position: "relative", paddingTop: "56.25%" /* 16:9 aspect ratio */ }}>
                            <iframe width="100%" height="100%" src={videoUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                style={{ position: "absolute", top: 0, left: 0 }}></iframe>
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </>

    );
}

export default HomeBanner;
