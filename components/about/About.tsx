"use client";
import Styles from './style.module.css';
import { Col, Container, Modal, Row } from 'react-bootstrap';
import Counter from '@/components/common/Counter';
import Image from 'next/image';
import { useState } from 'react';
interface UnderBanner {
    video_thumb_nail_image?: string;
    upload_video_file?: string;
    upload_feature_image?: string;
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
        setVideoUrl(url);
        setShowVideo(true)
    }

    const handleCloseVideo = () => {
        setShowVideo(false);
    }
    return (
        <div className={`pt_80 pb_100 ${Styles.abtinr}`}>
            <Container>
                <Row className="align-items-center">
                    <Col lg={5}>
                        <figure 
                            className={Styles.abtinlimg}
                            onClick={() => { 
                                handleVideoOpen(`${process.env.NEXT_PUBLIC_MEDIA_URL}/uploads/page_image/${posterPart?.upload_video_file}`);
                            }}
                        >
                            <Image
                                src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/uploads/page_image/${posterPart?.video_thumb_nail_image}`}
                                alt=""
                                width={720}
                                height={600}
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
                    <video width="100%" height="480" controls autoPlay muted style={{width: "100%", height: 580}}>
                        <source
                            src={videoUrl}
                            type="video/mp4"
                        />
                    </video>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default About;
