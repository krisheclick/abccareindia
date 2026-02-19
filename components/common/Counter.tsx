"use client";
import { useGlobalContext } from '@/context/global_context'
import { Col, Container, Row } from 'react-bootstrap';
import { parseToArray } from '@/utlis/array_prase';
import counterPoster from "@/public/assets/images/couter_poster.webp";
import Styles from './style.module.css';

interface CounterItem {
    site_counter_number?: number;
    site_counter_title?: string;
}
const Counter = ({ className = '', poster = false}: { className?: string; poster?: boolean}) => {
    const { commonData } = useGlobalContext();
    const counters = parseToArray<CounterItem>(commonData?.counter_media);
    return (
        counters && counters.length > 0 && (
            <div 
                className={`${Styles.counter_section} ${Styles[className]}`}
                {...(poster && {
                    style: {
                        background: `url(${counterPoster.src}) no-repeat center / cover`
                    }
                })}
            >
                <Container>
                    <div className={Styles.counterList}>
                        <Row>
                            {counters.map((counter, index) => (
                                <Col lg={3} sm={6} key={index}>
                                    <div className={Styles.counterBox}>
                                        <h3 className={Styles.counter_number}>{counter.site_counter_number}</h3>
                                        <p className={Styles.counter_title}>{counter.site_counter_title}</p>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </Container>
            </div>
        )
    )
}

export default Counter
