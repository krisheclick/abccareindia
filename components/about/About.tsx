import CustomImage from '@/utlis/imagefunction';
import Styles from './style.module.css';
import { Col, Container, Row } from 'react-bootstrap';
import Counter from '@/components/common/Counter';
interface UnderBanner {
    video_thumb_nail_image?: string;
    upload_video_file?: string;
    upload_feature_image?: string;
}
interface PageProps {
    posterPart?: UnderBanner;
    content?: string
}
const About = ({posterPart, content}: PageProps) => {
    return (
        <div className={`pt_80 pb_100 ${Styles.abtinr}`}>
            <Container>
                <Row className="align-items-center">
                    <Col lg={5}>
                        <CustomImage
                            src="assets/images/noimage.jpg"
                            className={Styles.abtinlimg}
                        />
                    </Col>
                    <Col lg={7}>
                        <div className={`abtintrighttbx ${Styles.abtintrighttbx}`}>
                            <div dangerouslySetInnerHTML={{__html: content ?? ''}} />
                            <Counter />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default About
