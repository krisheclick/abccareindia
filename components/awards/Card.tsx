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
            <Col xl={6}>
                <Stack className={Styles.description}
                    dangerouslySetInnerHTML={{__html: content ?? ''}}
                />
            </Col>
            <Col xl={6}>
                <CustomImage
                    src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${poster}`}
                    className={Styles.poster}
                />
            </Col>
        </Row>
    )
}

export default AwardCard
