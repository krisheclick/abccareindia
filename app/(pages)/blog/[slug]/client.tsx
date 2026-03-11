"use client";

import { Container, Stack } from "react-bootstrap";
import Styles from "../style.module.css";
import InnerBanner from "@/components/layout/banner/InnerBanner";
import { useEffect, useState } from "react";
import NotFound from "@/app/not-found";
import { useGlobalContext } from "@/context/global_context";
import Counter from "@/components/common/Counter";
import Projects from "@/components/project/Projects";

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
}

const BlogDetailsClient = ({ permalink }: { permalink: string }) => {
    const { setHasLoading, setInnerBanner } = useGlobalContext();

    const [notFound, setNotFound] = useState(false);
    const [data, setData] = useState<ProjectDataType | null>(null);

    const apiBase = process.env.NEXT_PUBLIC_API_URL;


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
                    {data?.blog && (
                        <>
                            <h1
                                dangerouslySetInnerHTML={{
                                    __html: data.blog.blog_title ?? "",
                                }}
                                className={`cmn_black_heading ${Styles.details_title}`}
                            />

                            <div
                                dangerouslySetInnerHTML={{
                                    __html: data.blog.blog_description ?? "",
                                }}
                                className={Styles.description}
                            />
                        </>
                    )}

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