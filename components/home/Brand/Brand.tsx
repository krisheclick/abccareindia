'use client';

import Image from 'next/image';
import { Container } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import { Autoplay, FreeMode, Navigation } from 'swiper/modules';
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
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
    if (!brands || brands.length === 0) return null;

    return (
        <>
            <div className={Styles.brand_section}>
                <Container>
                    <Swiper
                        spaceBetween={16}
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true
                        }}
                        navigation
                        modules={[Autoplay, Navigation, FreeMode]}
                        className={`brandslider ${Styles.brandslider ?? ''}`}
                        breakpoints={{
                            0: {
                                slidesPerView: 3
                            },
                            600: {
                                slidesPerView: 3
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
                </Container>
            </div>
        </>
    );
}
