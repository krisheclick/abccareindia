import { Col, Row, Stack } from 'react-bootstrap'
import Styles from './style.module.css';
import CustomImage from '@/utlis/imagefunction';

interface Props {
    poster?: string;
    content?: string;
}
const AwardCard = ({poster, content}: Props) => {
    return (
        <Row className={`g-0 align-items-center ${Styles.row}`}>
            <Col lg={6}>
                <Stack className={Styles.recogparan}
                    dangerouslySetInnerHTML={{__html: content ?? ''}}
                />
            </Col>
            <Col lg={6}>
                <Stack as="figure" className={Styles.recogimgn}>
                    <CustomImage
                        src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${poster}`}
                    />
                </Stack>
            </Col>
        </Row>
    )
}

export default AwardCard
