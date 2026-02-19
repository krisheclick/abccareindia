'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import CustomImage from '@/utlis/imagefunction';

interface Testimonial {
    testimonial_name: string;
    testimonial_designation: string;
    testimonial_rating: number;
    testimonial_description: string;
    testimonial_feature_image: string;
}

interface TestimonialSectionProps {
    testimonials: Testimonial[];
    customFields?: any;
    sectionKey?: string;
    className?: string;
}

const mediaBaseURL = process.env.NEXT_PUBLIC_MEDIA_URL;

export default function TestimonialSection({
    testimonials,
    customFields,
    sectionKey,
    className = 'testimonial-section',
}: TestimonialSectionProps) {

    if (!testimonials || testimonials.length === 0) return null;

    const group = customFields?.group_name;
    const section = sectionKey ? group?.[sectionKey] : null;
    const sectionTitle = section?.testimonial_title || 'Testimonials';

    return (
        <section className={`testimonial_sectionsm pt_90 pb_90 ${className}`}>
            <div className='container'>
                <div className='testimonial-section-heading'>
                    <h2 className='cmn_black_heading'>{sectionTitle}</h2>
                </div>

                <div className="testimonialslidebx">
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={0}
                        slidesPerView={3}
                        loop={true}
                        autoplay={{ delay: 3000 }}
                        navigation={true}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1200: { slidesPerView: 3 },
                        }}
                    >
                        {testimonials.map((testimonial, index) => (
                            <SwiperSlide key={index}>
                                <div className="testimonial-card">

                                    <div className='tccinmbx'>
                                        {testimonial.testimonial_feature_image && (
                                            <CustomImage
                                                src={`${mediaBaseURL}${testimonial.testimonial_feature_image}`}
                                                alt={testimonial.testimonial_name}
                                                width={50} height={50}
                                                className="testimonial-image pt-0"
                                            />
                                        )}

                                        <div className='tstimgrnmbx'>
                                            <div className='ticname'>
                                                {testimonial.testimonial_name}
                                            </div>

                                            {testimonial.testimonial_designation && (
                                                <span className="testimonial-designation">
                                                    {testimonial.testimonial_designation}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="testimonial-content">
                                        {testimonial.testimonial_rating && (
                                            <div className="testimonial-rating">
                                                {Array.from({
                                                    length: testimonial.testimonial_rating,
                                                }).map((_, i) => (
                                                    <span key={i}>&#9733;</span>
                                                ))}
                                            </div>
                                        )}

                                        <div
                                            className="testimonial-description"
                                            dangerouslySetInnerHTML={{
                                                __html: testimonial.testimonial_description,
                                            }}
                                        />
                                    </div>

                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

            </div>
        </section>
    );
}
