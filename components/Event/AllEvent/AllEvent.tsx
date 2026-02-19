'use client';

interface EventItem {
  event_id: number;
  event_title: string;
  event_slug: string;
  event_short_description: string;
  event_feature_image: string;
  event_date: string;
}

interface AllEventProps {
  events: EventItem[];
}
  const mediaBaseURL = process.env.NEXT_PUBLIC_MEDIA_URL

export default function AllEvent({ events }: AllEventProps) {
  if (!events || events.length === 0) return null;

  return (
    <section className="all-events">
      <div className="container">
        <div className="event-list">
          {events.map((event) => (
            <div className="event-card" key={event.event_id}>
              <img src={`${mediaBaseURL}${event.event_feature_image}`} alt={event.event_title} />

              <h3>{event.event_title}</h3>

              <div
                dangerouslySetInnerHTML={{
                  __html: event.event_short_description,
                }}
              />

              <span>
                {new Date(event.event_date).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
