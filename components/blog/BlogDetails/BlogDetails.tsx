'use client';

interface BlogDetailsProps {
  blog_title: string;
  blog_short_description: string;
  blog_description: string;
  blog_feature_image: string | null;
  blog_banner_image: string | null;
  blog_publish_at: string;
  blog_category_title: string;
}

export default function BlogDetails({
  blog_title,
  blog_short_description,
  blog_description,
  blog_feature_image,
  blog_banner_image,
  blog_publish_at,
  blog_category_title,
}: BlogDetailsProps) {
  return (
    <section className="blog-details">
      <div className="container">
        
        {blog_banner_image && (
          <div className="blog-banner">
            <img src={blog_banner_image} alt={blog_title} />
          </div>
        )}

     
        <h1>{blog_title}</h1>

        
        <p className="blog-meta">
          <span className="blog-category">{blog_category_title}</span> |{' '}
          <span className="blog-date">
            {new Date(blog_publish_at).toLocaleDateString()}
          </span>
        </p>

       
        {blog_feature_image && (
          <div className="blog-feature-image">
            <img src={blog_feature_image} alt={blog_title} />
          </div>
        )}

  
        {/* <p className="blog-short-description">{blog_short_description}</p> */}

        
        <div
          className="blog-description"
          dangerouslySetInnerHTML={{ __html: blog_description }}
        />
      </div>
    </section>
  );
}
