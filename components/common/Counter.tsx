"use client";
import { useGlobalContext } from '@/context/global_context'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { parseToArray } from '@/utlis/array_prase';
import counterPoster from "@/public/assets/images/couter_poster.webp";
import Styles from './style.module.css';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { useState } from 'react';

interface CounterItem {
    site_counter_number?: number;
    site_counter_title?: string;
    site_counter_description?: string;
}
const Counter = ({ className = '', poster = false }: { className?: string; poster?: boolean }) => {
    const { commonData } = useGlobalContext();
    const counters = parseToArray<CounterItem>(commonData?.counter_media);
    const [showModal, setShowModal] = useState(false);
    const [activeCounter, setActiveCounter] = useState<CounterItem | null>(null);

    // Counter
    const { ref, inView } = useInView({
        triggerOnce: true, // run only once
        threshold: 0.3,
    });
    const duration = 3;

    return (
        counters && counters.length > 0 && (
            poster ? (
                <>
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
                                            <div
                                                className={Styles.counterBox}
                                                onClick={() => {
                                                    setActiveCounter(counter);
                                                    setShowModal(true);
                                                }}
                                            >
                                                <div className={Styles.counter_number}>
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
                                                </div>
                                                <div className={Styles.counter_title}>{counter.site_counter_title}</div>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        </Container>
                    </div>
                    <Modal show={showModal} onHide={() => setShowModal(false)} centered size="xl" scrollable>
                        <Modal.Header closeButton>
                            <Modal.Title>{activeCounter?.site_counter_title || 'Counter Details'}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="donation_data"
                                dangerouslySetInnerHTML={{__html: activeCounter?.site_counter_description || ''}}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={() => setShowModal(false)}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            ) : (
                <div className={Styles.innerCounterList} ref={ref}>
                    <Row className='rowGap gx-2 gx-xxl-4'>
                        {counters.map((counter, index) => (
                            <Col xl={3} lg={6} md={3} sm={6} key={index} className={Styles.cardItem}>
                                <div className={Styles.counterBox}>
                                    <div className={Styles.counter_number}>
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
                                    </div>
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
