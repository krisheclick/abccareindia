'use client';

import Image from 'next/image';
import { Container } from 'react-bootstrap';
import Link from 'next/link';


import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Autoplay, FreeMode, Navigation } from 'swiper/modules';
import { useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import Styles from "./style.module.css";

interface DonorBrand {
    donor_brand_name: string;
    donor_brand_link?: string;
    donor_brand_logo: string;
}

interface BrandProps {
    brands: DonorBrand[] | undefined;
}

const mediaBaseURL = process.env.NEXT_PUBLIC_MEDIA_URL;

export default function Brand({ brands }: BrandProps) {

    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const swiperRef = useRef<SwiperType | null>(null);

    if (!brands || brands.length === 0) return null;

    return (
        <>
            <div className={Styles.brand_section}>
                <Container>
                    <div className={Styles.brandsWrapper}>
                        <Swiper
                            spaceBetween={16}
                            loop={true}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true
                            }}
                            navigation={false}
                            modules={[Autoplay, Navigation, FreeMode]}
                            className={`brandslider ${Styles.brandslider ?? ''}`}
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
                                    slidesPerView: 2
                                },
                                400: {
                                    slidesPerView: 3
                                },
                                768: {
                                    slidesPerView: 5
                                },
                                992: {
                                    slidesPerView: 6
                                },
                                1200: {
                                    slidesPerView: 9
                                }
                            }}
                        >
                            {brands.map((brand, index) => (
                                <SwiperSlide className={Styles.brandItem} key={index}>
                                    <Link
                                        href={brand.donor_brand_link || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="brand-item"
                                        aria-label={brand.donor_brand_name}
                                    >
                                        <Image
                                            src={`${mediaBaseURL}${brand.donor_brand_logo}`}
                                            alt={brand.donor_brand_name}
                                            width={180}
                                            height={100}
                                        />
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <div className={Styles.controls}>
                            <button
                                className={`swiper-nav-button-prev ${Styles.prev ?? ''}`}
                                onClick={() => swiperRef.current?.slidePrev()}
                                disabled={isBeginning}
                                aria-label="Previous Button"
                            >
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </button>

                            <button
                                className={`swiper-nav-button-next ${Styles.next ?? ''}`}
                                onClick={() => swiperRef.current?.slideNext()}
                                disabled={isEnd}
                                aria-label="Next Button"
                            >
                                <FontAwesomeIcon icon={faChevronRight} />
                            </button>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}
