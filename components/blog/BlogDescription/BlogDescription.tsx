'use client';

import Image from 'next/image';

interface BlogDescriptionProps {
  page_name: string;
  page_slug: string;
  page_feature_image: string | null;
  page_short_description: string;
  page_content: string;
}

const mediaBaseURL = process.env.NEXT_PUBLIC_MEDIA_URL;

export default function BlogDescription({
  page_name,
  page_feature_image,
  page_short_description,
  page_content,
}: BlogDescriptionProps) {
  return (
    <section className="blog-description">
      <div className="container">
        <h1>{page_name}</h1>

        {page_feature_image && (
          <div className="blog-feature-image">
            <Image
              src={`${mediaBaseURL}${page_feature_image}`}
              alt={page_name}
              width={1200}
              height={600}
              priority
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}

        {page_short_description && (
          <p className="blog-short-description">
            {page_short_description}
          </p>
        )}

        {page_content && (
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: page_content }}
          />
        )}
      </div>
    </section>
  );
}
