"use client";

import NotFound from "@/app/not-found";
import InnerBanner from "@/components/layout/banner/InnerBanner";
import Styles from "@/components/project/style.module.css";
import { useGlobalContext } from "@/context/global_context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Container, Stack } from "react-bootstrap";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { safeParse } from "@/utlis/safe_parse";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import CustomImage from "@/utlis/imagefunction";

interface Gallery {
    upload_type?: string;
    file_name?: string;
    media_link?: string;
    thumb_name?: string;
}
interface UrgentNeedDataType {
    urgent_need_title?: string;
    urgent_need_heading?: string | null;
    urgent_need_banner_title?: string | null;
    urgent_need_slug?: string;
    urgent_need_feature_image?: string;
    urgent_need_short_description?: string;
    urgent_need_description?: string;
    urgent_need_gallery?: Gallery[] | string | null;
}
interface UrgentNeedData {
    urgent_need?: UrgentNeedDataType;
    related_urgent_need_title?: string;
    relatedUrgentNeeds?: UrgentNeedDataType[] | null;
}

const getFirstAvailableText = (...values: Array<string | null | undefined>) =>
    values.find((value) => typeof value === "string" && value.trim() !== "") ?? "";

const getUrgentNeedFromResponse = (responseData: unknown): UrgentNeedDataType | undefined => {
    if (!responseData || typeof responseData !== "object") return undefined;

    if (Array.isArray(responseData)) {
        return responseData[0] as UrgentNeedDataType | undefined;
    }

    const data = responseData as {
        urgent_need?: UrgentNeedDataType;
        urgentNeed?: UrgentNeedDataType;
        urgent_needs?: UrgentNeedDataType[] | UrgentNeedDataType;
        urgentNeeds?: UrgentNeedDataType[] | UrgentNeedDataType;
    };

    const urgentNeeds = data.urgent_needs ?? data.urgentNeeds;

    if (Array.isArray(urgentNeeds)) {
        return urgentNeeds[0];
    }

    return data.urgent_need ?? data.urgentNeed ?? urgentNeeds;
};

const RelatedUrgentNeeds = ({ items, title }: { items?: UrgentNeedDataType[] | null, title?: string }) => {
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const swiperRef = useRef<SwiperType | null>(null);

    if (!items || items.length === 0) return null;


    return (
        <Stack className={Styles.section}>
            <Container>
                <div className={`inner_mdlprheading ${Styles.section_content ?? ""}`}>
                    <h2 className="cmn_black_heading">{title ?? "Urgent Needs"}</h2>
                </div>
                <div className={Styles.slider}>
                    <Swiper
                        className={`projectlider ${Styles.projectslider ?? ""}`}
                        loop={items.length > 3}
                        spaceBetween={12}
                        slidesPerView={2}
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
                            0: { slidesPerView: 1 },
                            768: { slidesPerView: 2, spaceBetween: 20 },
                            992: { slidesPerView: 3, spaceBetween: 24 },
                        }}
                    >
                        {items.map((item, index) => (
                            <SwiperSlide key={`${item.urgent_need_slug || "urgent-need"}-${index}`}>
                                <div className={Styles.card}>
                                    <figure className={`custom_image fixedImage ${Styles.card_img}`}>
                                        <Image                                            
                                            src={item.urgent_need_feature_image ? `${process.env.NEXT_PUBLIC_MEDIA_URL}${item.urgent_need_feature_image}` : "/assets/images/noimage.webp"}
                                            alt={item.urgent_need_title || ""}
                                            fill
                                            fetchPriority="high"
                                        />
                                    </figure>
                                    <Stack className={Styles.card_content}>
                                        <div className={Styles.title}>{item.urgent_need_title}</div>
                                        <div
                                            className={Styles.card_text}
                                            dangerouslySetInnerHTML={{ __html: item.urgent_need_short_description ?? "" }}
                                        />
                                        <Link href={`/urgent-needs/${item.urgent_need_slug}`} className={`btn btn-primary my-0 ${Styles.card_btn}`}>
                                            Learn More
                                        </Link>
                                    </Stack>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className={Styles.controls}>
                        <button
                            className={`swiper-nav-button-prev ${Styles.prev ?? ""} ${isBeginning ? Styles.disabled ?? "" : ""}`}
                            onClick={() => swiperRef.current?.slidePrev()}
                            disabled={isBeginning}
                            aria-label="Previous Button"
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <button
                            className={`swiper-nav-button-next ${Styles.next ?? ""} ${isEnd ? Styles.disabled ?? "" : ""}`}
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
};

const SingleUrgentNeed = ({ permalink }: { permalink: string }) => {
    const { setHasLoading, setInnerBanner, mediaUrl } = useGlobalContext();
    const [notFound, setNotFound] = useState(false);
    const [data, setData] = useState<UrgentNeedData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setHasLoading(true);
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-urgent-needs/${permalink}`);
                const { response_code, response_data } = await response.json();

                if (!response_code) {
                    setNotFound(true);
                }

                const urgentNeed = getUrgentNeedFromResponse(response_data);
                setData({ ...response_data, urgent_need: urgentNeed });
                setInnerBanner({
                    page_name: getFirstAvailableText(
                        urgentNeed?.urgent_need_banner_title,
                        urgentNeed?.urgent_need_heading,
                        urgentNeed?.urgent_need_title
                    ),
                    page_breadcrumb_name: urgentNeed?.urgent_need_title,
                    page_feature_image: urgentNeed?.urgent_need_feature_image,
                });
            } catch (err: unknown) {
                console.log("Urgent need details API data is something wrong: ", (err as Error).message);
            } finally {
                setHasLoading(false);
            }
        };

        if (permalink) {
            fetchData();
        }
    }, [permalink, setHasLoading, setInnerBanner]);

    if (notFound) {
        return <NotFound />;
    }

    const pageData = data?.urgent_need;
    const urgentNeedHeading = getFirstAvailableText(pageData?.urgent_need_heading, pageData?.urgent_need_title);
    const gallery = safeParse<Gallery[]>(pageData?.urgent_need_gallery);
    const galleryImages = gallery?.filter((item) => item.thumb_name || item.file_name) ?? [];

    console.log('data', data)

    return (
        <div className="single-project-page">
            <InnerBanner
                breadcrumb={[{
                    breadcrumb_item: "Urgent Needs",
                    breadcrumb_slug: `${process.env.NEXT_PUBLIC_ENV_URL}/urgent-needs`,
                }]}
            />
            <Stack className={`pb-0 ${Styles.section}`}>
                <Container>
                    <Stack className={`inner_mdlprheading ${Styles.section_content ?? ""}`}>
                        <h1 className={`cmn_black_heading ${Styles.details_title ?? ""}`}>
                            {urgentNeedHeading}
                        </h1>
                        {pageData?.urgent_need_short_description && (
                            <div
                                className={`paragraph ${Styles.paragraph ?? ""}`}
                                dangerouslySetInnerHTML={{ __html: pageData.urgent_need_short_description }}
                            />
                        )}
                    </Stack>
                    {galleryImages.length > 0 ? (
                        <Stack className={Styles.pdetailsslideforvid}>
                            <Swiper
                                navigation
                                modules={[Autoplay, Navigation, FreeMode]}
                                className={`gallery_slider ${Styles.gallery_slider ?? ""}`}
                                breakpoints={{
                                    0: { slidesPerView: 1 },
                                    1200: { slidesPerView: 1 },
                                }}
                            >
                                {galleryImages.map((item, index) => (
                                    <SwiperSlide key={index} className={Styles.swiperItem}>
                                        <Stack as="figure" className={Styles.poster}>
                                            <Image
                                                src={`${mediaUrl}${item.thumb_name || item.file_name}`}
                                                alt={`${pageData?.urgent_need_title || "Urgent Need"} ${index + 1}`}
                                                fill
                                            />
                                        </Stack>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </Stack>
                    ) : (
                        <Stack as="figure" className={Styles.poster}>
                            <Image
                                src={pageData?.urgent_need_feature_image ? `${mediaUrl}${pageData.urgent_need_feature_image}` : "/assets/images/noimage.webp"}
                                alt={pageData?.urgent_need_title || "Urgent Need"}
                                fill
                            />
                        </Stack>
                    )}
                    <Stack>
                        <div
                            className={`rj_editor_text ${Styles.paragraph ?? ""}`}
                            dangerouslySetInnerHTML={{ __html: pageData?.urgent_need_description || "" }}
                        />
                        <div className={Styles.btn_wrap}>
                            <Link href={`${process.env.NEXT_PUBLIC_ENV_URL}/donation`} className="btn btn-primary">
                                Donate Now
                            </Link>
                        </div>
                    </Stack>
                </Container>
            </Stack>
            <RelatedUrgentNeeds title={data?.related_urgent_need_title} items={data?.relatedUrgentNeeds} />
        </div>
    );
};

export default SingleUrgentNeed;
