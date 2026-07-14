"use client";

import { Col, Container, Row, Stack } from "react-bootstrap";
import Styles from "../style.module.css";
import InnerBanner from "@/components/layout/banner/InnerBanner";
import { useEffect, useState } from "react";
import NotFound from "@/app/not-found";
import { useGlobalContext } from "@/context/global_context";
import Counter from "@/components/common/Counter";
import Projects from "@/components/project/Projects";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

interface Category {
    blog_category_title?: string;
    blog_category_slug?: string;
}

interface BlogType {
    blog_title?: string;
    blog_slug?: string;
    blog_short_description?: string;
    blog_description?: string;
    blog_feature_image?: string;
    blog_banner_image?: string;
    blog_publish_at?: string;
    Category?: Category[] | null;
}

interface ProjectDataType {
    blog?: BlogType;
    otherBlogs?: BlogType[];
}

const BlogDetailsClient = ({ permalink }: { permalink: string }) => {
    const { setHasLoading, setInnerBanner } = useGlobalContext();

    const [notFound, setNotFound] = useState(false);
    const [data, setData] = useState<ProjectDataType | null>(null);

    const apiBase = process.env.NEXT_PUBLIC_API_URL;
    const {mediaUrl} = useGlobalContext();


    useEffect(() => {
        const fetchData = async () => {
            try {
                setHasLoading(true);

                const response = await fetch(`${apiBase}/blog/${permalink}`);
                const { response_code, response_data } = await response.json();

                if (!response_code) {
                    setNotFound(true);
                    return;
                }

                const blog = response_data?.blog;

                setData(response_data ?? null);

                setInnerBanner({
                    page_name: blog?.blog_title,
                    page_feature_image:
                        blog?.blog_banner_image ?? blog?.blog_feature_image,
                });

            } catch (err: unknown) {
                console.log(
                    "Blog Details API error:",
                    (err as Error).message
                );
            } finally {
                setHasLoading(false);
            }
        };
        if (permalink && apiBase) {
            fetchData();
        }
    }, [permalink, apiBase, setHasLoading, setInnerBanner]);

    if (notFound) {
        return <NotFound />;
    }
    const dateObjPost = new Date(data?.blog?.blog_publish_at ?? '');
    const formattedDatePost = dateObjPost.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
    }) + ' ' + dateObjPost.getFullYear();
    return (
        <Stack className="blog-single-page">
            <InnerBanner
                breadcrumb={[
                    {
                        breadcrumb_slug: `${process.env.NEXT_PUBLIC_ENV_URL}/blog`,
                        breadcrumb_item: "Blog",
                    },
                ]}
            />

            <Stack className={Styles.single_page}>
                <Container>
                    <Row className="gx-xl-5 rowGap">
                        <Col md={7} xl={8} xxl={9}>
                            {data?.blog && (
                                <>
                                    {formattedDatePost && (
                                        <div className={Styles.postDate}><FontAwesomeIcon icon={faCalendar} /> {formattedDatePost}</div>
                                    )}
                                    <h1
                                        dangerouslySetInnerHTML={{
                                            __html: data.blog.blog_title ?? "",
                                        }}
                                        className={`cmn_black_heading ${Styles.details_title ?? ''}`}
                                    />
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: data.blog.blog_description ?? "",
                                        }}
                                        className={`rj_editor_text ${Styles.description ?? ''}`}
                                    />
                                </>
                            )}
                        </Col>
                        <Col md={5} xl={4} xxl={3}>
                            <Stack className={Styles.sidebarBlog}>
                                <div className={Styles.sideTitle}>Recents Blog</div>
                                {data?.otherBlogs?.length ? (
                                    <Stack className={Styles.sidebarBlogList}>
                                        {data?.otherBlogs.slice(0, 5).map((item, index) => {
                                            const dateObj = new Date(item.blog_publish_at ?? '');
                                            const formattedDate = dateObj.toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "long",
                                            }) + ' ' + dateObj.getFullYear();
                                            return(
                                            <Link href={`${process.env.NEXT_PUBLIC_ENV_URL}/blog/${item?.blog_slug}`} key={index} className={Styles.sideBlog}>
                                                <figure>
                                                    <Image
                                                        src={`${mediaUrl}${item.blog_feature_image}`}
                                                        alt={item.blog_title || ""}
                                                        fill
                                                    />
                                                </figure>
                                                <Stack className={Styles.sideBlogContent}>
                                                    <div
                                                        className={Styles.subtitle}
                                                        dangerouslySetInnerHTML={{
                                                            __html: item.blog_title ?? "",
                                                        }}
                                                    />
                                                    <span className={Styles.date}><FontAwesomeIcon icon={faCalendar} /> {formattedDate}</span>

                                                </Stack>
                                            </Link>
                                        )})}
                                    </Stack>
                                ) : (
                                    <p className={Styles.notfound}>Blogs not found!</p>
                                )}
                            </Stack>
                        </Col>
                    </Row>
                </Container>
            </Stack>
            <Counter
                poster={true}
                className="home_counter"
            />
            <Projects />
        </Stack>
    );
};

export default BlogDetailsClient;
