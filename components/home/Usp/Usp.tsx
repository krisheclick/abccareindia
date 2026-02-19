import Styles from "./style.module.css"
import { Col, Container, Row } from 'react-bootstrap';
import CustomImage from '@/utlis/imagefunction';

interface USPItem {
    id: number;
    usp_title: string;
    usp_description: string;
    usp_feature_image: string;
}

interface USPProps {
    usp: USPItem[];
}

const mediaBaseURL = process.env.NEXT_PUBLIC_MEDIA_URL;

const USP = ({ usp }: USPProps) => {
    if (!usp || usp.length === 0) return null;

    return (
        <div className={Styles.usp_section}>
            <Container>
                <Row className='g-4'>
                    {usp.map((item, index) => (
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
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default USP;
