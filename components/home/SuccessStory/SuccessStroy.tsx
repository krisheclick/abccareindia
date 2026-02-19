'use client';

import Image from 'next/image';

interface SuccessStorySectionProps {
  sectionData: {
    success_story_title: string;
    success_story_subtitle: string;
    success_story_description: string;
  };
  stories: {
    success_story_media_file: string;
  }[];
}

const mediaBaseURL = process.env.NEXT_PUBLIC_MEDIA_URL;

export default function SuccessStory({
  sectionData,
  stories,
}: SuccessStorySectionProps) {
  if (!sectionData || !stories || stories.length === 0) return null;

  // media gallery comes as JSON string
  const mediaItems =
    stories[0]?.success_story_media_file
      ? JSON.parse(stories[0].success_story_media_file)
      : [];

  return (
    <section className="success-story">
      <div className="container">

        {/* HEADER */}
        <div className="success-story-header">
          <h2>{sectionData.success_story_title}</h2>

          <h3
            dangerouslySetInnerHTML={{
              __html: sectionData.success_story_subtitle,
            }}
          />

          <div
            className="success-story-description"
            dangerouslySetInnerHTML={{
              __html: sectionData.success_story_description,
            }}
          />
        </div>

        {/* MEDIA GRID */}
        <div className="success-story-grid">
          {mediaItems.map((item: any, index: number) => (
            <div key={index} className="success-story-item">
              {item.thumb_name && (
                <a href={`${item.media_link}`}>
                <Image
                  src={`${mediaBaseURL}${item.thumb_name}`}
                  alt={`Success Story ${index + 1}`}
                  width={400}
                  height={300}
                  style={{ objectFit: 'cover' }}
                /></a>
              )}

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
