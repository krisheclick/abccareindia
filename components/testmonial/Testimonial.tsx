'use client';


import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import CustomImage from '@/utlis/imagefunction';
import { Card, Container, Stack } from 'react-bootstrap';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Autoplay, FreeMode, Navigation } from 'swiper/modules';
import { useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import Styles from "./style.module.css";


interface Testimonial {
    testimonial_name: string;
    testimonial_designation: string;
    testimonial_rating: number;
    testimonial_description: string;
    testimonial_feature_image: string;
}

interface TestimonialSectionProps {
    testimonials: Testimonial[] | undefined;
    data?: {
        testimonial_title?: string;
    }
}

const mediaBaseURL = process.env.NEXT_PUBLIC_MEDIA_URL;

export default function TestimonialSection({ data, testimonials }: TestimonialSectionProps) {

    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const swiperRef = useRef<SwiperType | null>(null);

    if (!testimonials || testimonials.length === 0) return null;

    return (
        <Stack as="section" className={Styles.testimonials}>
            <Container>
                <Stack className={`text-center ${Styles.section_content ?? ''}`}>
                    <h2
                        className='cmn_black_heading'
                        dangerouslySetInnerHTML={{ __html: data?.testimonial_title ?? '' }}
                    />
                </Stack>
                <div className={Styles.slider}>
                    <Swiper
                        className={`testimonialslider ${Styles.testimonialslider ?? ''}`}
                        loop={(testimonials.length || 0) > 3}
                        spaceBetween={12}
                        slidesPerView={Math.min(testimonials.length || 1, 3)}
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
                        breakpoints={{
                            0: {
                                slidesPerView: Math.min(testimonials?.length || 0, 1)
                            },
                            768: {
                                slidesPerView: Math.min(testimonials?.length || 0, 2)
                            },
                            1200: {
                                slidesPerView: Math.min(testimonials?.length || 0, 3),
                                spaceBetween: 20,
                            }
                        }}
                    >
                        {testimonials.map((testimonial, index) => (
                            <SwiperSlide key={index}>
                                <Card className={Styles.card}>
                                    <Stack direction="horizontal" className={Styles.card_top}>
                                        {testimonial.testimonial_feature_image && (
                                            <CustomImage
                                                src={`${mediaBaseURL}${testimonial.testimonial_feature_image}`}
                                                alt={testimonial.testimonial_name}
                                                width={50} height={50}
                                                className={Styles.card_img}
                                            />
                                        )}
                                        <Stack className={Styles.card_content_top}>
                                            <div className={Styles.title}>
                                                {testimonial.testimonial_name}
                                            </div>

                                            {testimonial.testimonial_designation && (
                                                <span className={Styles.designation}>
                                                    {testimonial.testimonial_designation}
                                                </span>
                                            )}
                                        </Stack>
                                    </Stack>
                                    {testimonial.testimonial_rating && (
                                        <Stack direction="horizontal" className={Styles.rating}>
                                            {Array.from({
                                                length: testimonial.testimonial_rating,
                                            }).map((_, i) => (
                                                <span key={i}>&#9733;</span>
                                            ))}
                                        </Stack>
                                    )}
                                    <div
                                        className={Styles.card_content}
                                        dangerouslySetInnerHTML={{
                                            __html: testimonial.testimonial_description,
                                        }}
                                    />
                                </Card>
                            </SwiperSlide>
                        ))}
                    </Swiper>


                    <div className={Styles.controls}>
                        <button
                            className={`swiper-nav-button-prev ${Styles.next ?? ''} ${isEnd ? Styles.disabled ?? '' : ""}`}
                            onClick={() => swiperRef.current?.slidePrev()}
                            disabled={isBeginning}
                            aria-label="Previous Button"
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>

                        <button
                            className={`swiper-nav-button-next ${Styles.next ?? ''} ${isEnd ? Styles.disabled ?? '' : ""}`}
                            onClick={() => swiperRef.current?.slideNext()}
                            disabled={isEnd}
                            aria-label="Next Button"
                        >
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                </div>
            </Container>
        </Stack>
    );
}
