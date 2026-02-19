'use client';

interface EventDescriptionProps {
  page_name: string;
  page_feature_image: string | null;
  page_short_description: string;
  page_content: string;
}

const mediaBaseURL = process.env.NEXT_PUBLIC_MEDIA_URL

export default function EventDescription({
  page_name,
  page_feature_image,
  page_short_description,
  page_content,
}: EventDescriptionProps) {
  return (
    <section className="event-description">
      <div className="container">
        <h1>{page_name}</h1>

        {page_feature_image && (
          <img src={`${mediaBaseURL}${page_feature_image}`} alt={page_name} />
        )}

        <p>{page_short_description}</p>

        <div
          className="event-content"
          dangerouslySetInnerHTML={{ __html: page_content }}
        />
      </div>
    </section>
  );
}
