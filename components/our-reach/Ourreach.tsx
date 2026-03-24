"use client";

import Image from "next/image";
import { Col, Container, Modal, ModalBody, ModalHeader, ModalTitle, Row, Stack, } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { safeParse } from "@/utlis/safe_parse";
import { useEffect, useState } from "react";
import { useGlobalContext } from "@/context/global_context";
import Link from "next/link";
import Styles from "./style.module.css";

interface CounterData {
    our_reach_counter_number?: number;
    our_reach_counter_icon?: string;
    our_reach_counter_title?: string;
}
interface OurReachSectionData {
    our_reach_title?: string;
    our_reach_description?: string;
}
interface SectionDataProps {
    sectionData: OurReachSectionData | undefined;
}

interface Result {
    our_reach_description?: string;
    our_reach_button_data?: string;
    our_reach_counter_data?: string;
    our_reach_feature_image?: string;
}
interface Projects {
    data_color?: string;
    project_title?: string;
    project_slug?: string;
}
interface ProjectProps {
    result?: Result[] | null;
    projects?: Projects[] | null;
}
const Ourreach = ({ sectionData }: SectionDataProps) => {
    const appLink = process.env.NEXT_PUBLIC_ENV_URL;
    const [showContent, setShowContent] = useState<boolean>(false);
    const [data, setData] = useState<ProjectProps | null>(null);
    const { setHasLoading, hasLoading, mediaUrl } = useGlobalContext();


    useEffect(() => {
        const fetchData = async () => {
            try {
                setHasLoading(true);
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/our-reach`, { cache: "no-store" });
                const { response_data } = await response.json();
                setData(response_data);
            } catch (err: unknown) {
                console.log('Projects Report fetch is something wrong: ', (err as Error).message)
            } finally {
                setHasLoading(false);
            }
        }
        fetchData();
    }, [setHasLoading]);

    const handleOpenPopup = () => {
        setShowContent(true);
    };

    const handleClosePopup = () => {
        setShowContent(false);
    };

    const reachItem = data?.result?.[0];
    const projects = data?.projects;
    const counters = safeParse<CounterData[]>(reachItem?.our_reach_counter_data) ?? [];
    const button = reachItem?.our_reach_button_data ? JSON.parse(reachItem.our_reach_button_data) : null;

    return (
        <>
            <Stack as="section" className={Styles.ourReachSection}>
                <Container>
                    <Stack className={Styles.ourReachHeader}>
                        {sectionData?.our_reach_title && (
                            <h2 className={`cmn_black_heading ${Styles.title}`}>
                                <span>{sectionData.our_reach_title}</span>
                            </h2>
                        )}
                        {sectionData?.our_reach_description && (
                            <p className="reach_short_desc">{sectionData.our_reach_description}</p>
                        )}
                    </Stack>
                    <Row className={`rowGap gx-xxl-5 ${Styles.ourReach_wrapper}`}>
                        <Col xl={7} xxl={6}>
                            <Stack direction="horizontal" className={Styles.ourReachImage ?? ''}>
                                {!hasLoading && reachItem?.our_reach_feature_image ? (
                                    <div className={Styles.ourReachImage}>
                                        <Image
                                            src={`${mediaUrl}${reachItem.our_reach_feature_image}`}
                                            alt={sectionData?.our_reach_title || "Our Reach"}
                                            width={580}
                                            height={720}
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>
                                ) : (
                                    <div className={Styles.ourReachImageSkeleton}>
                                        <div className="skeleton skeletonFill"></div>
                                    </div>
                                )}
                                {!hasLoading && projects && projects.length > 0 ? (
                                    <div className={Styles.ourReachDescription}>
                                        <ul>
                                            {projects.slice(0, 10).map((value, index) => (
                                                <li key={index} data-color={value.data_color}>
                                                    <Link href={`${appLink}/our-projects/${value.project_slug}`}>{value.project_title}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                        {button?.text && (
                                            <span
                                                className={`ourReachBtn ${Styles.ourReachBtn}`}
                                                onClick={() => handleOpenPopup()}
                                                role="button"
                                            >
                                                <FontAwesomeIcon icon={faChevronRight} /> {button.text}
                                            </span>
                                        )}
                                    </div>
                                ) : (
                                    <div className={`w-100 ${Styles.ourReachDescription}`}>
                                        <ul>
                                            {Array.from({ length: 16 }).map((_, index) => (
                                                <li key={index}>
                                                    <div className="w-100 skeleton skeletonText"></div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </Stack>
                        </Col>
                        {counters?.length > 0 && (
                            <Col xl={5} xxl={6}>
                                <Stack direction="horizontal" className={Styles.ourReachRightCard ?? ''}>
                                    <div className={Styles.ourReachCounters}>
                                        {counters?.map((counter, index) => (
                                            <div key={index} className={Styles.ourReachCounter}>
                                                <div className={`counterCircle ${Styles.counterCircle}`}>
                                                    {counter.our_reach_counter_number}
                                                    {counter.our_reach_counter_icon}
                                                </div>
                                                <p>{counter.our_reach_counter_title}</p>
                                            </div>
                                        ))}
                                    </div>
                                </Stack>
                            </Col>
                        )}
                    </Row>
                </Container>
            </Stack>

            <Modal
                className="customBackdrop"
                show={showContent}
                onHide={handleClosePopup}
                size="xl"
                centered
                backdrop="static"
                scrollable
            >
                <ModalHeader closeButton>
                    <ModalTitle className="fw-bold"></ModalTitle>
                </ModalHeader>

                <ModalBody>
                    <Stack
                        direction="horizontal"
                        gap={3}
                        className={Styles.ourReachImage}
                    >
                        {reachItem?.our_reach_feature_image && (
                            <div className={Styles.ourReachImage}>
                                <Image
                                    src={`${mediaUrl}${reachItem.our_reach_feature_image}`}
                                    alt={sectionData?.our_reach_title || "Our Reach"}
                                    width={100}
                                    height={100}
                                    style={{ objectFit: "cover" }}
                                />
                            </div>
                        )}

                        {projects && projects.length > 0 && (
                            <div className={Styles.ourReachDescription}>
                                <ul>
                                    {projects.map((value, index) => (
                                        <li key={index} data-color={value.data_color}>
                                            <Link href={`${appLink}/our-projects/${value.project_slug}`}>{value.project_title}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </Stack>
                </ModalBody>
            </Modal>
        </>
    );
};

export default Ourreach;
