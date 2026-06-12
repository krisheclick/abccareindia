import { Col, Row, Stack } from 'react-bootstrap'
import Styles from './style.module.css';
import CustomImage from '@/utlis/imagefunction';

interface Props {
    poster?: string;
    title?: string;
    content?: string;
}
const AwardCard = ({poster, title, content}: Props) => {
    return (
        <Row className={`g-0 align-items-center ${Styles.row}`}>
            <Col xl={6}>
                <Stack className={Styles.description}>
                    {title && (
                        <div className="cmn_black_heading">{title}</div>
                    )}
                    <div className="rj_editor_text"
                        dangerouslySetInnerHTML={{__html: content ?? ''}}
                    />
                </Stack>
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
