

import { notFound } from 'next/navigation';
import { BlogDetailsPageData } from '@/lib/api';
import BlogDetails from '@/components/blog/BlogDetails/BlogDetails';

interface BlogDetailsPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailsPage({ params }: BlogDetailsPageProps) {
    const { slug } = await params;
  let blogData;
  try {
    blogData = await BlogDetailsPageData(slug);
  } catch (error) {
    console.error("Error fetching blog data:", error);
    notFound();
  }

  const blog = blogData.blog;

  if (!blog) {
    notFound();
  }

  return (
    
    <BlogDetails
      blog_title={blog.blog_title}
      blog_short_description={blog.blog_short_description}
      blog_description={blog.blog_description}
      blog_feature_image={blog.blog_feature_image}
      blog_banner_image={blog.blog_banner_image}
      blog_publish_at={blog.blog_publish_at}
      blog_category_title={blog.Category.blog_category_title}
    />
  );
}
