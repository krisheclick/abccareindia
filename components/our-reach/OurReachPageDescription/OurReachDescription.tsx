'use client';

interface OurReachDescriptionProps {
  page_name: string;
  page_short_description: string;
  page_content: string;
  page_feature_image?: string | null;
}

const mediaBaseURL = process.env.NEXT_PUBLIC_MEDIA_URL

export default function OurReachDescription({
  page_name,
  page_short_description,
  page_content,
  page_feature_image,
}: OurReachDescriptionProps) {
  return (
    <section className="our-reach-description">
      <div className="container">
        {page_name && <h1 className="page-title">{page_name}</h1>}

        {page_short_description && (
          <p className="page-short-description">{page_short_description}</p>
        )}

        {page_feature_image && (
          <div className="page-feature-image">
            <img src={`${mediaBaseURL}${page_feature_image}`} alt={page_name} />
          </div>
        )}

        {page_content && (
          <div
            className="page-content"
            dangerouslySetInnerHTML={{ __html: page_content }}
          />
        )}
      </div>
    </section>
  );
}
