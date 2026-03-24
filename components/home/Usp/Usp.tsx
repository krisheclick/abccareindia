'use client';
import Styles from "./style.module.css"
import { Col, Container, Row } from 'react-bootstrap';
import CustomImage from '@/utlis/imagefunction';
import { useGlobalContext } from "@/context/global_context";

interface USPItem {
    usp_title?: string;
    usp_description?: string;
    usp_feature_image?: string;
}

interface USPProps {
    usp: USPItem[];
}

const mediaBaseURL = process.env.NEXT_PUBLIC_MEDIA_URL;

const USP = ({ usp }: USPProps) => {
    // if (!usp || usp.length === 0) return null;
    const { hasLoading } = useGlobalContext();

    return (
        <div className={Styles.usp_section}>
            <Container>
                <Row className={`g-4 ${Styles.row ?? ''}`}>
                    {!hasLoading ? (
                        usp.map((item, index) => (
                            <Col lg={3} sm={6} key={index} className={Styles.cardItem}>
                                <div className={Styles.card}>
                                    {item.usp_feature_image && (
                                        <CustomImage
                                            src={`${mediaBaseURL}${item.usp_feature_image}`}
                                            alt={item.usp_title}
                                            className={Styles.cardImage}
                                        />
                                    )}
                                    <h3>{item.usp_title}</h3>
                                    <div
                                        className={Styles.card_content}
                                        dangerouslySetInnerHTML={{
                                            __html: item.usp_description ?? ''
                                        }}
                                    />
                                </div>
                            </Col>
                        ))) : (
                        [...Array(4)].map((_, index) => (
                            <Col lg={3} sm={6} key={index} className={Styles.cardItem}>
                                <div className={Styles.card}>
                                    <div className={`skeleton ${Styles.cardImage}`}></div>
                                    <h3 className="skeleton w-75">&nbsp;</h3>
                                    <div className={`w-100 ${Styles.card_content}`}>
                                        <p className="skeleton w-100 skeletonHeightText mb-2">&nbsp;</p>
                                        <p className="skeleton w-75 mx-auto skeletonHeightText mb-2">&nbsp;</p>
                                        <p className="skeleton w-50 mx-auto skeletonHeightText mb-2">&nbsp;</p>
                                    </div>
                                </div>
                            </Col>
                        ))
                    )}
                </Row>
            </Container>
        </div>
    );
}

export default USP;
