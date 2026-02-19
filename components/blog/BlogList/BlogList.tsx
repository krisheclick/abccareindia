'use client';

import Image from 'next/image';
import Link from 'next/link';

const mediaBaseURL = process.env.NEXT_PUBLIC_MEDIA_URL;

interface BlogCategory {
  blog_category_id: number;
  blog_category_title: string;
  blog_category_slug: string;
}

interface BlogItem {
  blog_id: number;
  blog_title: string;
  blog_slug: string;
  blog_short_description: string;
  blog_feature_image: string | null;
  blog_publish_at: string;
  Category?: {
    blog_category_title: string;
  };
}

interface BlogListProps {
  blogs: BlogItem[];
  blogCategories: BlogCategory[];
}



export default function BlogList({
  blogs,
  blogCategories,
}: BlogListProps) {
  return (
    <section className="blog-list">
      <div className="container">

        {/* CATEGORIES */}
        {blogCategories.length > 0 && (
          <div className="blog-categories">
            {blogCategories.map((cat) => (
              <span key={cat.blog_category_id} className="blog-category-pill">
                {cat.blog_category_title}
              </span>
            ))}
          </div>
        )}

        {/* BLOG GRID */}
        <div className="blog-grid">
          {blogs.length === 0 ? (
            <p>No blogs found.</p>
          ) : (
            blogs.map((blog) => (
              <div key={blog.blog_id} className="blog-card">

                {blog.blog_feature_image && (
                  <div className="blog-card-image">
                    <p>{`${mediaBaseURL}${blog.blog_feature_image}`}</p>
                    <Image
                      src={`${mediaBaseURL}${blog.blog_feature_image}`}
                      alt={blog.blog_title}
                      width={400}
                      height={240}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                )}

                <div className="blog-card-content">
                  {blog.Category?.blog_category_title && (
                    <span className="blog-card-category">
                      {blog.Category.blog_category_title}
                    </span>
                  )}

                  <h3>{blog.blog_title}</h3>

                  <p>
                    {blog.blog_short_description?.slice(0, 140)}...
                  </p>
                  

                  <small>
                    {new Date(blog.blog_publish_at).toDateString()}
                  </small>

                  <Link
                    href={`/blog/${blog.blog_slug}`}
                    className="read-more"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
