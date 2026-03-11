"use client";
import InnerBanner from "@/components/layout/banner/InnerBanner";
import { useGlobalContext } from "@/context/global_context";
import { useEffect, useState } from "react";
import { Container, Stack } from "react-bootstrap";
import Styles from "./style.module.css";
import Counter from "@/components/common/Counter";
import BlogList from "@/components/blog/BlogList";

interface PageData {
    page_name?: string;
    page_slug?: string;
    page_feature_image?: string;
    page_short_description?: string;
    page_content?: string;
}
interface Category {
    blog_category_id?: string;
    blog_category_title?: string;
    blog_category_slug?: string;
}
interface BlogItem {
    blog_title?: string;
    blog_slug?: string;
    blog_short_description?: string;
    blog_description?: string;
    blog_feature_image?: string;
    blog_banner_image?: string;
    blog_publish_at?: string;
    Category?: Category;
}
interface Pages {
  page?: PageData;
  blogs?: BlogItem[] | null;
  blogCategories?: Category[] | null;
}
interface PageProps {
    page?: number;
}
const ClientPage = ({page}: PageProps) => {
    const {setHasLoading, setInnerBanner} = useGlobalContext();
    const [data, setData] = useState<Pages | null>(null);
    
    useEffect(() => {
        const fetchData = async() => {
            try{
                setHasLoading(true);
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/page/blog`, {cache: "no-store"});
                const {response_data} = await response.json();
                setData(response_data ?? undefined)
                setInnerBanner(response_data.page ?? undefined)
            }catch(err: unknown){
                console.log('Blog page api is something wrong: ', (err as Error).message)
            }finally{
                setHasLoading(false);
            }
        }
        fetchData();
    }, [setHasLoading, setInnerBanner]);
    return (
        <Stack className="blog-page">
            <InnerBanner />
            <Stack className={Styles.blog_page}>
                <Container>
                    <Stack className={Styles.page_content}>
                        <h1 
                            className="cmn_black_heading"
                            dangerouslySetInnerHTML={{__html: data?.page?.page_name || ''}}
                        />
                        <div 
                            className={Styles.paragraph}
                            dangerouslySetInnerHTML={{__html: data?.page?.page_short_description || ''}}
                        />
                    </Stack>
                    <BlogList 
                        page={page}
                    />
                </Container>
            </Stack>
            <Counter className="home_counter" poster={true} />
        </Stack>
    )
}

export default ClientPage;