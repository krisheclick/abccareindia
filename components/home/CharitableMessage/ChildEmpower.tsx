"use client";
import { Card, CardBody, Container, Stack } from 'react-bootstrap';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import Styles from './style.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Autoplay, FreeMode, Navigation } from 'swiper/modules';
import { useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import CustomImage from '@/utlis/imagefunction';

interface EmpowerSectionData {
  empower_title?: string;
  empower_description?: string;
  empower_button_text?: string;
  empower_button_url?: string;
}

interface CharitableMessageItem {
  charitable_msg_title: string;
  charity_msg_slug: string;
  charity_msg_description: string;
  charitable_msg_file_link?: string;
  charitable_msg_button_data: string;
}

interface CharitableMessageProps {
  sectionData: EmpowerSectionData | undefined;
  messages: CharitableMessageItem[] | undefined;
}

const mediaBaseURL = process.env.NEXT_PUBLIC_MEDIA_URL;

const ChildEmpower = ({sectionData, messages}: CharitableMessageProps) => {
    
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    
    const swiperRef = useRef<SwiperType | null>(null);
    

    if (!sectionData || !messages || messages.length === 0) return null;
    
    return (
        <Stack as="section" className={Styles.section_stack}>
            <Container>
                <Stack direction='horizontal' className={Styles.stack_wrapper}>
                    <article className={Styles.content}>
                        <h2 className={Styles.heading} 
                            dangerouslySetInnerHTML={{__html: sectionData.empower_title || ''}}                            
                        />
                        <div className={Styles.description}
                            dangerouslySetInnerHTML={{__html: sectionData.empower_description || ''}}
                        />
                    </article>
                    <Stack as="aside" className={Styles.button_wrap}>
                        {sectionData.empower_button_text && (
                            <Link href={sectionData.empower_button_url || '#'} className={Styles.btn}>
                                {sectionData.empower_button_text} <FontAwesomeIcon icon={faArrowRightLong} />
                            </Link>
                        )}

                        <div className={Styles.controls}>
                            <button
                                className={`${Styles.prev} ${isBeginning ? Styles.disabled : ""}`}
                                onClick={() => swiperRef.current?.slidePrev()}
                                disabled={isBeginning}
                            >
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </button>

                            <button
                                className={`${Styles.next} ${isEnd ? Styles.disabled : ""}`}
                                onClick={() => swiperRef.current?.slideNext()}
                                disabled={isEnd}
                            >
                                <FontAwesomeIcon icon={faChevronRight} />
                            </button>
                        </div>
                    </Stack>
                </Stack>
                <Swiper
                    className={`childEmpower_slider ${Styles.childEmpower_slider}`}
                    loop={(messages.length || 0) > 3}
                    spaceBetween={20}
                    slidesPerView={Math.min(messages.length || 1,3 )}
                    navigation={false}
                    modules={[Autoplay, Navigation, FreeMode]}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;

                        setIsBeginning(swiper.isBeginning);
                        setIsEnd(swiper.isEnd);
                        
                        swiper.on("slideChange", () => {
                            setIsBeginning(swiper.isBeginning);
                            setIsEnd(swiper.isEnd);
                        });
                    }}
                >
                    {messages.map((value, index) => (
                        <SwiperSlide key={index}>
                            <Card className={Styles.card}>
                                <CustomImage
                                    src={`${mediaBaseURL}${value.charitable_msg_file_link}`}
                                    alt={value.charitable_msg_title}
                                    className={Styles.card_poster}
                                />
                                <CardBody className={Styles.cardBody}>
                                    <Card.Title as="div" className={Styles.card_title}>{value.charitable_msg_title}</Card.Title>
                                    <Link
                                        href={JSON.parse(value.charitable_msg_button_data).url}
                                        className={Styles.cardButton}
                                        >
                                        {JSON.parse(value.charitable_msg_button_data).text}
                                    </Link>
                                </CardBody>
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Container>
        </Stack>
    )
}

export default ChildEmpower
