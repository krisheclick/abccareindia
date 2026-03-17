"use client";
import { Col, Container, Row } from 'react-bootstrap'
import Styles from './style.module.css'
import Image from 'next/image';
interface DataProps {
    data?: {
        poster?: string;
        poster2?: string;
        title?: string;
        description?: string;
    }
    reverse?: boolean;
    background?: string;
}
const ZigzagContent = ({ data, reverse = false, background }: DataProps) => {
    const poster = `${process.env.NEXT_PUBLIC_MEDIA_URL}/uploads/page_image/${data?.poster}`
    const poster2 = `${process.env.NEXT_PUBLIC_MEDIA_URL}/uploads/page_image/${data?.poster2}`
    return (
        <div className={Styles.section} style={{ background: background }}>
            <Container>
                <Row className={`align-items-center gx-xl-5 rowGap ${reverse ? `flex-row-reverse ${Styles.reverseRow}` : ''}`}>
                    <Col lg={7}>
                        <div className={Styles.box_content}>
                            <div className="paragraph"
                                dangerouslySetInnerHTML={{ __html: data?.description ?? '' }}
                            />
                        </div>
                    </Col>
                    <Col lg={5}>
                        <figure className={Styles.whatwedoimg}>
                            <Image
                                src={poster}
                                alt={data?.title || ''}
                                width={768} height={480}
                            />
                            {data?.poster2 && (
                                <Image
                                    src={poster2}
                                    alt={data?.title || ''}
                                    width={768} height={480}
                                />
                            )}
                        </figure>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ZigzagContent
