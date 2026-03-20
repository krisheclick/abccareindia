"use client";

import { Col, Modal, Row, Stack } from 'react-bootstrap';
import Styles from './style.module.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useGlobalContext } from '@/context/global_context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPlay } from '@fortawesome/free-solid-svg-icons';
import { safeParse } from '@/utlis/safe_parse';
import Link from 'next/link';
import { normalizeYouTubeUrl } from '@/utlis/videoUrl';
import PaginationBar from '@/components/pagination/Pagination';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

interface ProjectCategory {
    project_category_title?: string;
    project_category_slug?: string;
}
interface LinkObject {
    text?: string;
    url?: string;
}
interface ProjectItem {
    project_title?: string;
    project_slug?: string;
    project_short_description?: string;
    project_feature_image?: string;
    project_button?: string;
    project_video_link?: string;
    project_location?: LinkObject | null;
    Category?: ProjectCategory;
}
interface PaginationData {
    totalPages: number;
    currentPage: number;
}

const ProjectList = () => {

    const router = useRouter();
    const [categories, setCategories] = useState<ProjectCategory[] | null>([]);
    const [projectsData, setProjects] = useState<ProjectItem[] | null>([]);

    const { setHasLoading, mediaUrl } = useGlobalContext();
    const [showVideo, setShowVideo] = useState<boolean>(false);
    const [videoUrl, setVideoUrl] = useState<string>("");
    const [pagination, setPagination] = useState<PaginationData | null>(null);

    const ListRef = useRef<HTMLDivElement | null>(null);

    const itemsPerPage = 4;
    const searchParams = useSearchParams();

    const activeTab = searchParams.get("category") || "all";
    const currentPage = Number(searchParams.get("page") || 1);

    /* -------- SCROLL FUNCTION -------- */

    const scrollToSection = () => {
        ListRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };


    const handleOpenVideo = (url: string) => {
        setVideoUrl(normalizeYouTubeUrl(url));
        setShowVideo(true);
    };

    const handleCloseVideo = (): void => {
        setShowVideo(false);
        setTimeout(() => {
            setVideoUrl("");
        }, 300);
    };

    const apiBase = process.env.NEXT_PUBLIC_API_URL;

    const fetchCategories = async () => {
        try {
            const res = await fetch(`${apiBase}/get-projects-category`);
            const { response_data } = await res.json();
            setCategories(response_data?.get_all_category ?? []);
        } catch (error) {
            console.log("Category error:", error);
        }
    };

    const fetchProjects = useCallback(async (slug?: string) => {
        try {
            setHasLoading(true);

            const isFiltered = slug && slug !== "all";

            const url = isFiltered
                ? `${apiBase}/get-projects-category/${slug}?page=${currentPage}&size=${itemsPerPage}`
                : `${apiBase}/page/our-projects?page=${currentPage}&size=${itemsPerPage}`;

            const res = await fetch(url);
            const { response_data } = await res.json();

            setProjects(response_data?.projects ?? []);
            setPagination(response_data?.pagination ?? null);

        } catch (error) {
            console.log("Project error:", error);
        } finally {
            setHasLoading(false);
        }
    }, [apiBase, currentPage, itemsPerPage, setHasLoading]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const handlePageChange = (newPage: number) => {
        scrollToSection();
        router.push(`/our-projects?page=${newPage}`, { scroll: false });
    };

    /* -------- CATEGORY TAB CLICK -------- */

    const handleTabChange = (slug: string) => {
        scrollToSection();
        router.push(`/our-projects?page=1&category=${slug}`, { scroll: false });
    };

    useEffect(() => {
        if (!activeTab) return;

        fetchProjects(activeTab);
    }, [activeTab, currentPage, fetchProjects]);

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        // Render a loading placeholder or nothing on the server
        return null;
    }

    return (
        <>
            <Stack className={Styles.projectData} ref={ListRef}>
                <ul className={Styles.tabs}>
                    <li
                        className={`${Styles.tabButton} ${activeTab === "all" ? Styles.active : ""}`}
                        onClick={() => handleTabChange("all")}
                    >
                        All
                    </li>
                    {categories?.map((cat, index) => (
                        <li
                            key={index}
                            className={`${Styles.tabButton} ${activeTab === cat.project_category_slug ? Styles.active : ""}`}
                            onClick={() => handleTabChange(cat.project_category_slug || "all")}
                        >
                            {cat.project_category_title}
                        </li>
                    ))}
                </ul>

                {/* Project List */}
                {projectsData && projectsData.length > 0 ? (
                    <Stack className={Styles.projectList}>
                        {projectsData.map((project, index) => {
                            const location = safeParse<LinkObject>(project.project_location);
                            return (
                                <Stack key={index} className={Styles.project_wrapper}>
                                    <Row className={`gx-lg-0 rowGap ${Styles.row}`}>
                                        <Col lg={6}>
                                            <div className={Styles.contentWrap}>
                                                {project.Category?.project_category_title && (
                                                    <div className={Styles.tags}>{project.Category?.project_category_title}</div>
                                                )}
                                                <div className={Styles.project_content}>
                                                    <div
                                                        className={Styles.title}
                                                        dangerouslySetInnerHTML={{ __html: project.project_title ?? '' }}
                                                    />
                                                    <div
                                                        className={Styles.description}
                                                        dangerouslySetInnerHTML={{ __html: project.project_short_description ?? '' }}
                                                    />

                                                    <div className={Styles.locationBox}>
                                                        <span><FontAwesomeIcon icon={faLocationDot} /></span>
                                                        <div>{location?.text || "No location available"}</div>
                                                    </div>
                                                    <div className={Styles.buttonWrap}>
                                                        <Link href={`${process.env.NEXT_PUBLIC_ENV_URL}/our-projects/${project?.project_slug}`} className={`btn btn-primary mt-0 ${Styles.button}`}>Learn More</Link>
                                                        {project?.project_video_link && (
                                                            <span className={`btn btn-blue mt-0 ${Styles.watchBtn}`}
                                                                onClick={() => handleOpenVideo(project.project_video_link ?? '')}
                                                            >watch our video <FontAwesomeIcon icon={faPlay} /></span>
                                                        )}
                                                    </div>
                                                </div>

                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            {project.project_feature_image && (
                                                <figure className={`custom_image fixedImage ${Styles.poster}`}>
                                                    <Image
                                                        src={`${mediaUrl}${project.project_feature_image}`}
                                                        alt={project.project_title || ""}
                                                        className="custom-image loaded"
                                                        fill
                                                    />
                                                </figure>
                                            )}
                                        </Col>
                                    </Row>
                                </Stack>
                            )
                        })}
                    </Stack>
                ) : (
                    <p className={Styles.notfound}>
                        No projects found for this category.
                    </p>
                )}
                {pagination && pagination.totalPages > 1 && (
                    <PaginationBar
                        pagination={pagination}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                        className={Styles.paginationClass}
                    />
                )}

            </Stack>
            <Modal className="customBackdrop" show={showVideo} onHide={handleCloseVideo} size="xl" centered backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title className="fw-semibold"></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ padding: 0 }}>
                    <div style={{ position: "relative", paddingTop: "56.25%" }}>
                        <iframe width="100%" height="100%" src={videoUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                            style={{ position: "absolute", top: 0, left: 0 }}></iframe>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ProjectList;