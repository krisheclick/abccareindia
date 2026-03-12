"use client";
import Styles from './style.module.css';
import { Col, Container, Modal, Row } from 'react-bootstrap';
import Counter from '@/components/common/Counter';
import Image from 'next/image';
import { useState } from 'react';
import { normalizeYouTubeUrl } from '@/utlis/videoUrl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
interface UnderBanner {
    video_thumb_nail_image?: string;
    upload_video_file?: string;
    upload_feature_image?: string;
    video_file_link?: string;
}
interface PageProps {
    posterPart?: UnderBanner;
    content?: string
}
const About = ({ posterPart, content }: PageProps) => {
    const fixedContent = content?.replace(/classname=/g, "class=");
    const [showVideo, setShowVideo] = useState<boolean>(false);
    const [videoUrl, setVideoUrl] = useState<string>('');

    const handleVideoOpen = (url: string) => {
        setVideoUrl(normalizeYouTubeUrl(url));
        setShowVideo(true)
    }

    const handleCloseVideo = () => {
        setShowVideo(false);
    }
    return (
        <div className={`pt_80 pb_100 ${Styles.abtinr}`}>
            <Container>
                <Row className="align-items-center gx-xl-5">
                    <Col lg={5}>
                        <figure
                            className={Styles.multiPoster}
                            style={{"--poster-bg": "url('/assets/images/dot.webp') no-repeat top left / contain" } as React.CSSProperties}
                        >
                            <div className={Styles.bigThumb}>
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/uploads/page_image/${posterPart?.video_thumb_nail_image}`}
                                    alt=""
                                    width={720}
                                    height={600}
                                />
                                <span
                                    className={Styles.player}
                                    onClick={() => {
                                        handleVideoOpen(posterPart?.video_file_link || '');
                                    }}
                                >
                                    <FontAwesomeIcon icon={faPlay} />
                                </span>
                            </div>
                            <Image
                                src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/uploads/page_image/${posterPart?.upload_feature_image}`}
                                alt=""
                                width={360}
                                height={240}
                                className={Styles.small_poster}
                            />
                        </figure>
                    </Col>
                    <Col lg={7}>
                        <div className={`abtintrighttbx ${Styles.abtintrighttbx ?? ''}`}>
                            <div dangerouslySetInnerHTML={{ __html: fixedContent ?? '' }} />
                            <Counter />
                        </div>
                    </Col>
                </Row>
            </Container>
            <Modal className="customBackdrop" show={showVideo} onHide={handleCloseVideo} size="xl" centered backdrop={false}>
                <Modal.Header closeButton>
                    <Modal.Title className="fw-semibold"></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ padding: 0 }}>
                    {/* <video width="100%" height="480" controls autoPlay muted style={{width: "100%", height: 580}}>
                        <source
                            src={videoUrl}
                            type="video/mp4"
                        />
                    </video> */}
                    <div style={{ position: "relative", paddingTop: "56.25%" }}>
                        <iframe width="100%" height="100%" src={videoUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                            style={{ position: "absolute", top: 0, left: 0 }}></iframe>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default About;
