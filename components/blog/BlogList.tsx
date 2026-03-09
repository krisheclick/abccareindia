"use client";

import { useGlobalContext } from "@/context/global_context";
import { Col, Row, Stack } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Styles from "./style.module.css";
import PaginationBar from "../pagination/Pagination";
import Image from "next/image";

interface Category {
  blog_category_id?: string;
  blog_category_title?: string;
  blog_category_slug?: string;
}

interface BlogItem {
  blog_title?: string;
  blog_slug?: string;
  blog_short_description?: string;
  blog_feature_image?: string;
  Category?: Category;
}

interface BlogListProps {
  page?: number;
}

interface PaginationData {
  totalPages: number;
  currentPage: number;
}

const BlogList = ({ page }: BlogListProps) => {
  const router = useRouter();
  const { setHasLoading, mediaUrl } = useGlobalContext();

  const [blogCategory, setBlogCategory] = useState<Category[]>([]);
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [pagination, setPagination] = useState<PaginationData | null>(null);

  const blogListRef = useRef<HTMLDivElement | null>(null);

  const itemsPerPage = 2;
  const currentPage = page ?? 1;
  const apiBase = process.env.NEXT_PUBLIC_API_URL;

  /* -------- SCROLL FUNCTION -------- */

  const scrollToSection = () => {
    blogListRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  /* -------- FETCH CATEGORY -------- */

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${apiBase}/page/blog`);
      const { response_data } = await res.json();
      setBlogCategory(response_data?.blogCategories ?? []);
    } catch (err) {
      console.log("Category error:", err);
    }
  };

  /* -------- FETCH BLOG -------- */

  const fetchBlog = async (slug?: string) => {
    try {
      setHasLoading(true);

      const url =
        slug && slug !== "all"
          ? `${apiBase}/blog/category/${slug}?page=${currentPage}&size=${itemsPerPage}`
          : `${apiBase}/page/blog?page=${currentPage}&size=${itemsPerPage}`;

      const res = await fetch(url, { cache: "no-store" });
      const { response_data } = await res.json();

      setBlogs(response_data?.blogs ?? []);
      setPagination(response_data?.pagination ?? null);
    } catch (err) {
      console.log("Blog error:", err);
    } finally {
      setHasLoading(false);
    }
  };

  /* -------- INITIAL LOAD -------- */

  useEffect(() => {
    fetchCategories();
  }, []);

  /* -------- FETCH BLOG WHEN PAGE OR TAB CHANGES -------- */

  useEffect(() => {
    fetchBlog(activeTab);
  }, [activeTab, currentPage]);

  /* -------- PAGINATION CLICK -------- */

  const handlePageChange = (newPage: number) => {
    scrollToSection();
    router.push(`/blog?page=${newPage}`, { scroll: false });
  };

  /* -------- CATEGORY TAB CLICK -------- */

  const handleTabChange = (slug: string) => {
    setActiveTab(slug);
    scrollToSection();
    router.push(`/blog?page=1`, { scroll: false });
  };

  return (
    <Stack className={Styles.BlogWrapper} ref={blogListRef}>
      
      {/* -------- CATEGORY TABS -------- */}

      <ul className={Styles.tabs}>
        <li
          className={`${Styles.tabButton} ${
            activeTab === "all" ? Styles.active : ""
          }`}
          onClick={() => handleTabChange("all")}
        >
          All
        </li>

        {blogCategory.map((cat) => (
          <li
            key={cat.blog_category_slug}
            className={`${Styles.tabButton} ${
              activeTab === cat.blog_category_slug ? Styles.active : ""
            }`}
            onClick={() => handleTabChange(cat.blog_category_slug || "all")}
          >
            {cat.blog_category_title}
          </li>
        ))}
      </ul>

      {/* -------- BLOG LIST -------- */}

      {blogs.length ? (
        <Stack>
          {blogs.map((item, index) => (
            <Stack key={index} className={Styles.inner_mdlbxsin}>
              <Row className="g-0">
                
                <Col lg={6}>
                  <div className={Styles.contentWrap}>
                    
                    {item.Category?.blog_category_title && (
                      <div className={Styles.inrplsblcm}>
                        <span>{item.Category.blog_category_title}</span>
                      </div>
                    )}

                    <div className={Styles.inrplsblaltxt}>
                      
                      <div
                        className={Styles.inrplsblaltxth}
                        dangerouslySetInnerHTML={{
                          __html: item.blog_title ?? "",
                        }}
                      />

                      <div
                        className={Styles.inrplsblaltxtp}
                        dangerouslySetInnerHTML={{
                          __html: item.blog_short_description ?? "",
                        }}
                      />

                      <div
                        className={`${Styles.lmwv} d-flex align-items-center`}
                      >
                        <Link
                          href={`/blog/${item.blog_slug}`}
                          className={Styles.lmwvlm}
                        >
                          Learn More
                        </Link>
                      </div>

                    </div>
                  </div>
                </Col>

                <Col lg={6}>
                  <Stack as="figure">
                    <Image
                      src={`${mediaUrl}${item.blog_feature_image}`}
                      alt={item.blog_title ?? ""}
                      width={720}
                      height={480}
                    />
                  </Stack>
                </Col>

              </Row>
            </Stack>
          ))}

          <PaginationBar
            pagination={pagination}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            className={Styles.paginationClass}
          />
        </Stack>
      ) : (
        <p className={Styles.notfound}>Blogs not found!</p>
      )}
    </Stack>
  );
};

export default BlogList;