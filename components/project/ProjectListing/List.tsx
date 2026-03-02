"use client";

import { Col, Modal, Row, Stack } from 'react-bootstrap';
import Styles from './style.module.css';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useGlobalContext } from '@/context/global_context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPlay } from '@fortawesome/free-solid-svg-icons';
import { safeParse } from '@/utlis/safe_parse';
import Link from 'next/link';
import { normalizeYouTubeUrl } from '@/utlis/videoUrl';

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

const ProjectList = () => {

    const [categories, setCategories] = useState<ProjectCategory[] | null>([]);
    const [projectsData, setProjects] = useState<ProjectItem[] | null>([]);
    const [activeTab, setActiveTab] = useState<string>("all");

    const { setHasLoading, mediaUrl } = useGlobalContext();
    const [showVideo, setShowVideo] = useState<boolean>(false);
    const [videoUrl, setVideoUrl] = useState<string>("");

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

    const fetchProjects = async (slug?: string) => {
        try {
            setHasLoading(true);

            let url = `${apiBase}/get-projects`;

            if (slug && slug !== "all") {
                const res = await fetch(`${apiBase}/get-projects-category/${slug}`);
                const { response_data } = await res.json();
                setProjects(response_data?.project_category.projects.map((item: ProjectItem) => ({
                    ...item,
                    project_location: safeParse<LinkObject>(item.project_location)
                })) ?? []);
            } else {
                url = `${apiBase}/get-projects`;
                const res = await fetch(url);
                const { response_data } = await res.json();
                setProjects(response_data.projects.map((item: ProjectItem) => ({
                    ...item,
                    project_location: safeParse<LinkObject>(item.project_location)
                })) ?? []);
            }

        } catch (error) {
            console.log("Project error:", error);
        } finally {
            setHasLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchProjects();
    }, []);

    useEffect(() => {
        if (activeTab === "all") {
            fetchProjects();
        } else {
            fetchProjects(activeTab);
        }
    }, [activeTab]);

    return (
        <>
            <Stack className={Styles.projectData}>

                {/* Tabs */}
                <ul className={Styles.gllist}>

                    <li
                        className={`${Styles.tabButton} ${activeTab === "all" ? Styles.active : ""}`}
                        onClick={() => setActiveTab("all")}
                    >
                        All
                    </li>

                    {categories?.map((cat, index) => (
                        <li
                            key={index}
                            className={`${Styles.tabButton} ${activeTab === cat.project_category_slug ? Styles.active : ""}`}
                            onClick={() => setActiveTab(cat.project_category_slug || "")}
                        >
                            {cat.project_category_title}
                        </li>
                    ))}
                </ul>

                {/* Project List */}
                {projectsData && projectsData.length > 0 ? (
                    projectsData.map((project, index) => {
                        const location = safeParse(project.project_location) as LinkObject | null;
                        return (
                            <Stack key={index} className={Styles.inner_mdlbxsin}>
                                <Row className="g-0">
                                    <Col lg={6}>
                                        <div className={Styles.contentWrap}>
                                            {project.Category?.project_category_title && (
                                                <div className={Styles.inrplsblcm}><span>{project.Category?.project_category_title}</span></div>
                                            )}
                                            <div className={Styles.inrplsblaltxt}>
                                                <div
                                                    className={Styles.inrplsblaltxth}
                                                    dangerouslySetInnerHTML={{ __html: project.project_title ?? '' }}
                                                />
                                                <div
                                                    className={Styles.inrplsblaltxtp}
                                                    dangerouslySetInnerHTML={{ __html: project.project_short_description ?? '' }}
                                                />
                                                <div className={Styles.inrplsbldbx}>
                                                    <div className={`${Styles.inrplsbldbxs} d-flex align-items-center`}>
                                                        <div className={Styles.inrplsbldbxstick}>
                                                            <FontAwesomeIcon icon={faLocationDot} />
                                                        </div>
                                                        <div className={Styles.inrplsbldbxsad}>{location?.text}</div>
                                                    </div>
                                                </div>
                                                <div className={`${Styles.lmwv} d-flex align-items-center`}>
                                                    <Link href={`${process.env.NEXT_PUBLIC_ENV_URL}/our-projects/${project?.project_slug}`} className={Styles.lmwvlm}>Learn More</Link>
                                                    {project?.project_video_link && (
                                                        <Link href="#" className={Styles.lmwvwov}
                                                        onClick={() => handleOpenVideo(project.project_video_link ?? '')}
                                                    >watch our video <FontAwesomeIcon icon={faPlay} /></Link>
                                                    )}
                                                </div>
                                            </div>

                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        {project.project_feature_image && (
                                            <Image
                                                src={`${mediaUrl}${project.project_feature_image}`}
                                                alt={project.project_title || ""}
                                                width={720}
                                                height={480}
                                            />
                                        )}
                                    </Col>
                                </Row>
                            </Stack>
                        )
                    })
                ) : (
                    <p className={Styles.notfound}>Projects not found!</p>
                )}

            </Stack>
            <Modal className="customBackdrop" show={showVideo} onHide={handleCloseVideo} size="xl" centered backdrop={false}>
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