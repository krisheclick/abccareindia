"use client";
import { Col, Container, Row } from 'react-bootstrap'
import Styles from './style.module.css'
import CustomImage from '@/utlis/imagefunction'
import { useGlobalContext } from '@/context/global_context';
interface DataProps {
    data?: {
        poster?: string;
        title?: string;
        description?: string;
    }
    reverse?: boolean;
    background?: string;
}
const ZigzagContent = ({data, reverse = false, background}: DataProps) => {
    const poster = `${process.env.NEXT_PUBLIC_MEDIA_URL}/uploads/page_image/${data?.poster}`
    return (
        <div className={Styles.inrmdl_upcomsec} style={{background: background}}>
            <Container>
                <Row className={`align-items-center ${reverse ? 'flex-row-reverse' : ''}`}>
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
                            src={poster}
                            alt={data?.title}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ZigzagContent
