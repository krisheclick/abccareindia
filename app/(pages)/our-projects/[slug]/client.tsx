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
import { faLocationDot, faPlay } from "@fortawesome/free-solid-svg-icons";
import { normalizeYouTubeUrl } from "@/utlis/videoUrl";
import Link from "next/link";

interface Gallery {
    upload_type?: string;
    file_name?: string;
    media_link?: string;
    thumb_name?: string;
    video_duration?: string;
}
interface LinkObject {
    address_line_1?: string;
    address_line_2?: string;
    district?: string[];
}
interface ProjectDataType {
    project_title?: string;
    project_subtitle?: string;
    project_heading?: string | null;
    project_banner_title?: string | null;
    project_slug?: string;
    project_short_description?: string;
    project_feature_image?: string;
    project_description?: string;
    project_video_link?: string;
    project_location?: LinkObject | null;
    project_gallery?: Gallery[] | null;
}
interface ProjectData {
    project?: ProjectDataType;
    relatedProjects?: ProjectDataType[] | null;
}

const getFirstAvailableText = (...values: Array<string | null | undefined>) =>
    values.find((value) => typeof value === "string" && value.trim() !== "") ?? "";

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

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                setHasLoading(true);
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-projects/${permalink}`);
                const { response_code, response_data } = await response.json();
    
                if (!response_code) {
                    setNotFound(true);
                }
    
                setData(response_data ?? undefined);
                const project = response_data?.project;
                setInnerBanner({
                    page_name: getFirstAvailableText(
                        project?.project_banner_title,
                        project?.project_heading,
                        project?.project_title
                    ),
                    page_breadcrumb_name: project?.project_title,
                    page_feature_image: project?.project_feature_image
                });
            } catch (err: unknown) {
                console.log('Projects Details API data is something wrong: ', (err as Error).message);
            } finally {
                setHasLoading(false);
            }
        }
        if (permalink) {
            fetchData();
        }
    }, [setHasLoading, permalink, setInnerBanner]);

    if (notFound) {
        return <NotFound />
    }
    const pageData = data?.project;
    const projectHeading = getFirstAvailableText(pageData?.project_heading, pageData?.project_title);
    const gallery = safeParse<Gallery[]>(pageData?.project_gallery);
    // const location = JSON.parse(JSON.parse(pageData?.project_location??null));
    const location: LinkObject | null = pageData?.project_location || null;
    const districts = Array.isArray(location?.district) ? location.district : location?.district ? [location.district] : [];

    return (
        <>
            <div className="single-project-page">
                <InnerBanner
                    breadcrumb={[{
                        "breadcrumb_item": "Projects",
                        "breadcrumb_slug": `${process.env.NEXT_PUBLIC_ENV_URL}/our-projects`,
                    }]}
                />
                <Stack className={`pb-0 ${Styles.section}`}>
                    <Container>
                        <Stack className={`inner_mdlprheading ${Styles.section_content ?? ''}`}>
                            <h1 className={`cmn_black_heading ${Styles.details_title ?? ''}`}>{projectHeading}</h1>
                            {/* <div
                                className={`paragraph ${Styles.paragraph ?? ''}`}
                                dangerouslySetInnerHTML={{ __html: pageData?.project_short_description || '' }}

                            /> */}
                            {/* {location &&(
                                <div className={Styles.locationBox}>
                                    <span><FontAwesomeIcon icon={faLocationDot} /></span>
                                    <div>{location?.address_line_1 || "No location available"}</div>
                                </div>
                            )} */}
                            {districts.length > 0 ? (
                                <div className="locationBoxWrapper justify-content-center mt-xl-2">
                                    {districts.map((value, index) => (
                                            <div className={Styles.locationBox} key={index}>
                                                <span>
                                                    <FontAwesomeIcon icon={faLocationDot} />
                                                </span>
                                                <div>{value}</div>
                                            </div>
                                        ))}
                                </div>
                            ) : (
                                <div className={Styles.locationBox}>
                                    <span>
                                        <FontAwesomeIcon icon={faLocationDot} />
                                    </span>
                                    <div>No location available</div>
                                </div>
                            )}
                        </Stack>
                        {gallery && gallery?.length > 0 && (
                            <Stack className={Styles.pdetailsslideforvid}>
                                <Swiper
                                    navigation
                                    // autoplay={{
                                    //     delay: 5000,
                                    //     disableOnInteraction: false,
                                    //     pauseOnMouseEnter: true
                                    // }}
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
                                                    <Stack as="figure" className={Styles.poster}>
                                                        <Image
                                                            src={`${mediaUrl}${value?.thumb_name}`}
                                                            alt={`${pageData?.project_title ?? "Project"} ${index}`}
                                                            fill
                                                        />
                                                        {(value.file_name || value.media_link) && (
                                                            <div className={Styles.watchBtn}
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
                        <Stack>
                            <div
                                className={`rj_editor_text ${Styles.paragraph ?? ''}`}
                                dangerouslySetInnerHTML={{__html: pageData?.project_description || ''}}
                            />
                            <div className={Styles.btn_wrap}>
                                <Link 
                                    href={`${process.env.NEXT_PUBLIC_ENV_URL}/donation`}
                                    className="btn btn-primary"
                                >
                                    Donate Now
                                </Link>
                            </div>
                        </Stack>
                    </Container>
                </Stack>
                <Projects 
                    relatedProjects={data?.relatedProjects}
                />
            </div>

            <Modal className="customBackdrop" show={showVideo} onHide={handleClose} size="xl" centered backdrop="static">
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
