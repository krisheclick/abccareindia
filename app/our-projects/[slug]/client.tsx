"use client";
import NotFound from "@/app/not-found";
import InnerBanner from "@/components/layout/banner/InnerBanner";
import Projects from "@/components/project/Projects";
import { useGlobalContext } from "@/context/global_context";
import { useEffect, useState } from "react";
import { Container, Modal, Stack } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { safeParse } from "@/utlis/safe_parse";
import Image from "next/image";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import Styles from "@/components/project/style.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { normalizeYouTubeUrl } from "@/utlis/videoUrl";
interface Gallery {
    upload_type?: string;
    file_name?: string;
    media_link?: string;
    thumb_name?: string;
    video_duration?: string;
}
interface ProjectDataType {
    project_title?: string;
    project_subtitle?: string;
    project_slug?: string;
    project_short_description?: string;
    project_feature_image?: string;
    project_description?: string;
    project_video_link?: string;
    project_gallery?: Gallery[] | null;
}
interface ProjectData {
    project?: ProjectDataType;
}
const SingleProject = ({ permalink }: { permalink: string }) => {
    const { hasLoading, setHasLoading, setInnerBanner, mediaUrl } = useGlobalContext();
    const [notFound, setNotFound] = useState<boolean>(false)
    const [data, setData] = useState<ProjectData | null>(null);

    // Video Parse
    const [showVideo, setShowVideo] = useState<boolean>(false);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [videoType, setVideoType] = useState<"file" | "youtube" | null>(null);

    const handleClick = (url: string) => {
        setVideoUrl(url);
        setShowVideo(true);
    }

    const handleClose = () => {
        setShowVideo(false);
        setVideoType(null);
        setTimeout(() => {
            setVideoUrl("");
        }, 300);
    }

    const fetchData = async () => {
        try {
            setHasLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-projects/${permalink}`);
            const { response_code, response_data } = await response.json();

            if (!response_code) {
                setNotFound(true);
            }

            setData(response_data ?? undefined);
            setInnerBanner({
                page_name: response_data?.project?.project_title,
                page_feature_image: response_data?.project?.project_feature_image
            });
        } catch (err: unknown) {
            console.log('Projects Details API data is something wrong: ', (err as Error).message);
        } finally {
            setHasLoading(false);
        }
    }

    useEffect(() => {
        if (permalink) {
            fetchData();
        }
    }, [permalink]);

    if (notFound) {
        return <NotFound />
    }
    const pageData = data?.project;
    const gallery = safeParse<Gallery[]>(pageData?.project_gallery);
    return (
        <>
            <div className="single-project-page">
                <InnerBanner
                    breadcrumb={[{
                        "breadcrumb_item": "Projects",
                        "breadcrumb_slug": `${process.env.NEXT_PUBLIC_ENV_URL}/our-projects`,
                    }]}
                />
                <Stack className={Styles.inrmdl_pdetails}>
                    <Container>
                        <Stack className={Styles.inner_mdlprheading}>
                            <h1 className={`cmn_black_heading ${Styles.details_title ?? ''}`}>{pageData?.project_title}</h1>
                            <div
                                className={`paragraph ${Styles.paragraph ?? ''}`}
                                dangerouslySetInnerHTML={{ __html: pageData?.project_short_description || '' }}

                            />
                        </Stack>
                        {gallery && gallery?.length > 0 && (
                            <Stack className={Styles.pdetailsslideforvid}>
                                <Swiper
                                    navigation
                                    autoplay={{
                                        delay: 5000,
                                        disableOnInteraction: false,
                                        pauseOnMouseEnter: true
                                    }}
                                    modules={[Autoplay, Navigation, FreeMode]}
                                    className={`gallery_slider ${Styles.gallery_slider ?? ''}`}
                                    breakpoints={{
                                        0: {
                                            slidesPerView: 1
                                        },
                                        1200: {
                                            slidesPerView: 1
                                        }
                                    }}
                                >
                                    {!hasLoading ? (
                                        gallery.map((value, index) => {
                                            if (!value.thumb_name) return null;
                                            return (
                                                <SwiperSlide key={index} className={Styles.swiperItem}>
                                                    <Stack as="figure" className={Styles.pdbslideimg}>
                                                        <Image
                                                            src={`${mediaUrl}${value?.thumb_name}`}
                                                            alt={`${pageData?.project_title ?? "Project"} ${index}`}
                                                            width={1440}
                                                            height={650}
                                                        />
                                                        {(value.file_name || value.media_link) && (
                                                            <div className={Styles.pdwvbx}
                                                                onClick={() => {
                                                                    if (value.upload_type === "file" && value.file_name) {
                                                                        setVideoType("file");
                                                                        handleClick(value.file_name);
                                                                    } else if (value.media_link) {
                                                                        setVideoType("youtube");
                                                                        handleClick(normalizeYouTubeUrl(value.media_link));
                                                                    }
                                                                }}
                                                            >
                                                                Watch our Video <span className={Styles.icon}><FontAwesomeIcon icon={faPlay} /></span>
                                                            </div>
                                                        )}
                                                    </Stack>
                                                </SwiperSlide>
                                            )
                                        })
                                    ) : (
                                        <p>Loading</p>
                                    )}
                                </Swiper>
                            </Stack>
                        )}
                    </Container>
                </Stack>
                <Projects />
            </div>

            <Modal className="customBackdrop" show={showVideo} onHide={handleClose} size="xl" centered backdrop={false}>
                <Modal.Header closeButton>
                    <Modal.Title className="fw-semibold"></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ padding: 0 }}>
                    {videoType == "file" ? (
                        <video width="100%" height="480" controls muted autoPlay>
                            <source
                                src={`${mediaUrl}${videoUrl}`}
                                type="video/mp4"
                            />
                        </video>
                    ) : (
                        <div style={{ position: "relative", paddingTop: "56.25%" }}>
                            <iframe width="100%" height="100%" src={videoUrl || ''} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                style={{ position: "absolute", top: 0, left: 0 }}></iframe>
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </>
    )
}
export default SingleProject;