'use client';

import Image from 'next/image';
import Styles from './style.module.css';
import Link from 'next/link';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface OurReachSectionData {
    our_reach_title?: string;
    our_reach_description?: string;
}

interface OurReachItem {
    our_reach_description?: string;
    our_reach_feature_image?: string;
    our_reach_button_data?: string;
    our_reach_counter_data?: string;
}
interface CounterData {
    our_reach_counter_number?: number;
    our_reach_counter_icon?: string;
    our_reach_counter_title?: string;
}
interface HomeOurReachProps {
    sectionData: OurReachSectionData;
    ourReachData: OurReachItem[];
}

const mediaBaseURL = process.env.NEXT_PUBLIC_MEDIA_URL;

const Ourreach = ({ sectionData, ourReachData, }: HomeOurReachProps) => {
    if (!sectionData && !ourReachData?.length) return null;

    const reachItem = ourReachData?.[0];

    const counters = reachItem?.our_reach_counter_data
        ? JSON.parse(reachItem.our_reach_counter_data)
        : [];

    const button = reachItem?.our_reach_button_data
        ? JSON.parse(reachItem.our_reach_button_data)
        : null;

    return (
        <section className={Styles.ourReachSection}>
            <Container className={Styles.container}>

                {/* SECTION HEADER */}
                <div className={Styles.ourReachHeader}>
                    {sectionData?.our_reach_title && (
                        <h2><span>{sectionData.our_reach_title}</span></h2>
                    )}
                    {sectionData?.our_reach_description && (
                        <p>{sectionData.our_reach_description}</p>
                    )}
                </div>
                <div className={Styles.ourReach_wrapper}>

                    {/* LEFT CARD */}
                    <div className={Styles.ourReachImage}>

                        {reachItem?.our_reach_feature_image && (
                            <div className={Styles.ourReachImage}>
                                <Image
                                    src={`${mediaBaseURL}${reachItem.our_reach_feature_image}`}
                                    alt={sectionData?.our_reach_title || 'Our Reach'}
                                    width={100}
                                    height={100}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        )}

                        <div className={Styles.ourReachDescription}>
                            {reachItem?.our_reach_description && (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: reachItem.our_reach_description,
                                    }}
                                />
                            )}

                            {button?.text && button?.url && (
                                <Link href={button.url} className={Styles.ourReachBtn}><FontAwesomeIcon icon={faChevronRight} /> {button.text}</Link>
                            )}
                        </div>

                    </div>

                    {/* RIGHT CARD - COUNTERS */}
                    {counters.length > 0 && (
                        <div className={Styles.ourReachRightCard}>
                            <div className={Styles.ourReachCounters}>
                                {counters.map((counter: CounterData, index: number) => (
                                    <div key={index} className={Styles.ourReachCounter}>
                                        <div className={Styles.counterCircle}>
                                            {counter.our_reach_counter_number}
                                            {counter.our_reach_counter_icon}
                                        </div>
                                        <p>{counter.our_reach_counter_title}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </Container>
        </section>
    );
}

export default Ourreach