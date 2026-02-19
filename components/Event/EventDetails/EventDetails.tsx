'use client';

interface EventDetailsProps {
  event_title: string;
  event_slug: string;
  event_short_description: string;
  event_description: string;
  event_feature_image: string | null;
  event_date: string;
  event_gallery: string; 
  event_video_link_gallery: string; 
}

const mediaBaseURL = process.env.NEXT_PUBLIC_MEDIA_URL

export default function EventDetails({
  event_title,
  event_slug,
  event_short_description,
  event_description,
  event_feature_image,
  event_date,
  event_gallery,
  event_video_link_gallery,
}: EventDetailsProps) {
  const galleryImages: string[] = event_gallery
    ? JSON.parse(event_gallery)
    : [];

  const videoLinks: string[] = event_video_link_gallery
    ? JSON.parse(event_video_link_gallery)
    : [];

  return (
    <section className="event-details">
      <div className="container">
        <h1>{event_title}</h1>

        <p className="event-date">
          {new Date(event_date).toLocaleDateString()}
        </p>

        {event_feature_image && (
          <img
            src={`${mediaBaseURL}${event_feature_image}`}
            alt={event_title}
            className="event-feature-image"
          />
        )}

        <p className="event-short-description">
          {event_short_description}
        </p>

        <div
          className="event-description"
          dangerouslySetInnerHTML={{ __html: event_description }}
        />

        {galleryImages.length > 0 && (
          <div className="event-gallery">
            <h3>Gallery</h3>
            <div className="gallery-grid">
              {galleryImages.map((img, index) => (
                <img
                  key={index}
                  src={`${mediaBaseURL}${img}`}
                  alt={`${event_slug}-gallery-${index}`}
                />
              ))}
            </div>
          </div>
        )}

        {videoLinks.length > 0 && (
          <div className="event-videos">
            <h3>Videos</h3>
            {videoLinks.map((link, index) => (
              <iframe
                key={index}
                src={link}
                title={`event-video-${index}`}
                allowFullScreen
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
