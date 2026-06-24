"use client";
import { useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Autoplay, FreeMode, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import CustomImage from '@/utlis/imagefunction';
import { Container, Stack } from 'react-bootstrap';
import Link from 'next/link';
import { useGlobalContext } from '@/context/global_context';
import Styles from "./style.module.css";
import Image from 'next/image';

interface ProjectDataType {
    project_title?: string;
    project_subtitle?: string;
    project_slug?: string;
    project_short_description?: string;
    project_feature_image?: string;
    project_description?: string;
    project_video_link?: string;
}
interface ProjectProps {
    relatedProjects?: ProjectDataType[] | null;
}

const Projects = ({ relatedProjects }: ProjectProps) => {

    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const swiperRef = useRef<SwiperType | null>(null);

    const { commonData, projectData } = useGlobalContext();

    if (!relatedProjects && (!projectData || projectData.length === 0)) return null;

    const allProjects = relatedProjects ?? projectData ?? [];

    return (
        <Stack className={Styles.section}>
            <Container>
                <div className={`inner_mdlprheading ${Styles.section_content ?? ''}`}>
                    <div className="cmn_black_heading"
                        dangerouslySetInnerHTML={{ __html: commonData?.site_project_title ?? '' }}
                    />
                    <div className={Styles.paragraph}
                        dangerouslySetInnerHTML={{ __html: commonData?.site_project_short_description ?? '' }}
                    />
                </div>
                {allProjects.length > 0 ? (
                    <div className={Styles.slider}>
                        <Swiper
                            className={`projectlider ${Styles.projectslider ?? ''}`}
                            loop={(allProjects.length || 0) > 3}
                            spaceBetween={12}
                            slidesPerView={2}
                            // slidesPerView={Math.min(testimonials.length || 1, 3)}
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
                                    slidesPerView: 1
                                },
                                768: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                },
                                992: {
                                    slidesPerView: 3,
                                    spaceBetween: 24,
                                }
                            }}
                        >
                            {allProjects.map((value, index) => (
                                <SwiperSlide key={index}>
                                    <div className={Styles.card}>
                                        <figure className={`custom_image fixedImage ${Styles.card_img}`}>
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${value.project_feature_image}`}
                                                alt={value?.project_title || ''}
                                                fill
                                                fetchPriority='high'
                                            />
                                        </figure>
                                        {value?.project_subtitle && (
                                            <div
                                                className={Styles.card_subtitle}
                                                dangerouslySetInnerHTML={{ __html: value?.project_subtitle ?? '' }}
                                            />
                                        )}
                                        <Stack className={Styles.card_content}>
                                            <div
                                                className={Styles.title}
                                                dangerouslySetInnerHTML={{ __html: value?.project_title ?? '' }}
                                            />
                                            <div
                                                className={Styles.card_text}
                                                dangerouslySetInnerHTML={{ __html: value?.project_short_description ?? '' }}
                                            />
                                            <Link href={`/our-projects/${value.project_slug}`} className={`btn btn-primary my-0 ${Styles.card_btn}`}>
                                                Learn More
                                            </Link>
                                        </Stack>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <div className={Styles.controls}>
                            <button
                                className={`swiper-nav-button-prev ${Styles.prev ?? ''} ${isEnd ? Styles.disabled ?? '' : ""}`}
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
                ) : (
                    <p className="text-center fw-medium">Project not Found!</p>
                )}
            </Container>
        </Stack>
    )
}

export default Projects
