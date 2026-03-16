'use client'

import { useGlobalContext } from "@/context/global_context";
import styles from "./style.module.css";
import { Col, Container, Row, Stack } from "react-bootstrap";
import Image from "next/image";

interface ContactDescriptionProps {
    page_short_description?: string;
    page_content?: string;
}

export default function ContactDescription({ page_short_description, page_content, }: ContactDescriptionProps) {

    const { commonData } = useGlobalContext();

    const phone1 = commonData?.site_footer_phone_1;
    const phone2 = commonData?.site_footer_phone_2;
    const email = commonData?.site_footer_email;
    const address = commonData?.site_footer_address;
    const address_link = commonData?.site_footer_address_link;

    return (



        <Stack className={styles.contact_inner_page}>
            <Container>
                <div className={`inner_mdlprheading ${styles.page_content ?? ''}`}>
                    <h1
                        className={`cmn_black_heading ${styles.heading ?? ''}`}
                        dangerouslySetInnerHTML={{ __html: page_short_description || ''}}
                    />

                    <div
                        className={styles.paragraph}
                        dangerouslySetInnerHTML={{ __html: page_content || ''}}
                    />

                </div>

                <Row className="rowGap">
                    <Col lg={4} md={6}>
                        <Stack className={styles.contact_box}>
                            <figure className={styles.img_icon}>
                                <Image
                                    src="/assets/images/contact_call.webp"
                                    alt="Phone"
                                    width={80}
                                    height={80}
                                />
                            </figure>

                            <div className={styles.contact_sub_text}>Call us at</div>

                            <div className={styles.link_contact_text}>
                                {phone1 && (
                                    <a href={`tel:${phone1.replace(/\s+/g, "")}`}>
                                        {phone1}
                                    </a>
                                )}
                                {phone2 && (
                                    <>
                                        {" / "}
                                        <a href={`tel:${phone2.replace(/\s+/g, "")}`}>
                                            {phone2}
                                        </a>
                                    </>
                                )}
                            </div>
                        </Stack>
                    </Col>
                    <Col lg={4} md={6}>
                        <Stack className={styles.contact_box}>
                            <figure className={styles.img_icon}>
                                <Image
                                    src="/assets/images/contact_mail.webp"
                                    alt="Email"
                                    width={80}
                                    height={80}
                                />
                            </figure>
                            <div className={styles.contact_sub_text}>Email us</div>
                            <div className={styles.link_contact_text}>
                                {email && (
                                    <a href={`mailto:${email.trim()}`}>
                                        {email}
                                    </a>
                                )}
                            </div>
                        </Stack>
                    </Col>
                    <Col lg={4}>
                        <Stack className={styles.contact_box}>
                            <figure className={styles.img_icon}>
                                <Image
                                    src="/assets/images/contact_map.webp"
                                    alt="Map Location"
                                    width={80}
                                    height={80}
                                />
                            </figure>
                            <div className={styles.contact_sub_text}>We are here</div>

                            <div className={styles.link_contact_text}>
                                {address && (
                                    <a
                                        href={address_link ?? "#"}
                                        dangerouslySetInnerHTML={{ __html: address }}
                                    />
                                )}
                            </div>
                        </Stack>
                    </Col>
                </Row>
            </Container>
        </Stack>
    );
}
