import { Col, Container, Row } from 'react-bootstrap'
import Styles from './style.module.css'
import CustomImage from '@/utlis/imagefunction'
interface DataProps {
    data?: {
        poster?: string;
        title?: string;
        description?: string;
    }
}
const ZigzagContent = ({data}: DataProps) => {
    return (
        <div className={Styles.inrmdl_upcomsec}>
            <Container>
                <Row className='align-items-center'>
                    <Col lg={7}>
                        <div className={Styles.inner_mdlprheadindg}>
                            <h2 className="cmn_black_heading"
                                dangerouslySetInnerHTML={{__html: data?.title ?? ''}}
                            />
                            <div className="paragraph"
                                dangerouslySetInnerHTML={{__html: data?.description ?? ''}}
                            />
                        </div>
                    </Col>
                    <Col lg={5}>
                        <CustomImage
                            src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${data?.poster}`}
                            alt={data?.title}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ZigzagContent
