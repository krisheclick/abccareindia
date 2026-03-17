"use client";
import { useGlobalContext } from '@/context/global_context'
import { Col, Container, Row } from 'react-bootstrap';
import { parseToArray } from '@/utlis/array_prase';
import counterPoster from "@/public/assets/images/couter_poster.webp";
import Styles from './style.module.css';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

interface CounterItem {
    site_counter_number?: number;
    site_counter_title?: string;
}
const Counter = ({ className = '', poster = false }: { className?: string; poster?: boolean }) => {
    const { commonData } = useGlobalContext();
    const counters = parseToArray<CounterItem>(commonData?.counter_media);

    // Counter
    const { ref, inView } = useInView({
        triggerOnce: true, // run only once
        threshold: 0.3,
    });
    const duration = 3;

    return (
        counters && counters.length > 0 && (
            poster ? (
                <div
                    className={`${Styles.counter_section} ${Styles[className]}`}
                    {...(poster && {
                        style: {
                            background: `url(${counterPoster.src}) no-repeat center / cover`
                        }
                    })}
                >
                    <Container>
                        <div className={Styles.counterList} ref={ref}>
                            <Row className='rowGap gx-2 gx-sm-3 gx-xl-4'>
                                {counters.map((counter, index) => (
                                    <Col md={3} sm={6} key={index} className={Styles.cardItem}>
                                        <div className={Styles.counterBox}>
                                            <h3 className={Styles.counter_number}>
                                                {inView ? (
                                                    <CountUp
                                                        start={0}
                                                        end={counter?.site_counter_number || 0}
                                                        duration={duration}
                                                        useEasing={false} // linear speed
                                                    />
                                                ) : (
                                                    0
                                                )}
                                            </h3>
                                            <div className={Styles.counter_title}>{counter.site_counter_title}</div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </Container>
                </div>
            ) : (
                <div className={Styles.innerCounterList} ref={ref}>
                    <Row className='rowGap gx-2 gx-xxl-4'>
                        {counters.map((counter, index) => (
                            <Col xl={3} lg={6} md={3} sm={6} key={index} className={Styles.cardItem}>
                                <div className={Styles.counterBox}>
                                    <h3 className={Styles.counter_number}>
                                        {inView ? (
                                            <CountUp
                                                start={0}
                                                end={counter?.site_counter_number || 0}
                                                duration={duration}
                                                useEasing={false} // linear speed
                                            />
                                        ) : (
                                            0
                                        )}
                                    </h3>
                                    <div>{counter.site_counter_title}</div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            )
        )
    )
}

export default Counter
