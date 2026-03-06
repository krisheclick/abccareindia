"use client";
import { useGlobalContext } from "@/context/global_context";
import {Stack } from "react-bootstrap";
import Styles from "./style.module.css";
import { useRouter } from "next/navigation";

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
interface BlogListProps {
    page?: number
}

const BlogList = ({ page }: BlogListProps) => {
    const {hasLoading} = useGlobalContext();
    const router = useRouter();
    return (
        <Stack className={Styles.BlogWrapper}>
            
        </Stack>
    )
}

export default BlogList;