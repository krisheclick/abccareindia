

import ProjectSection from "@/components/common/ProjectSection";
import EventDetails from "@/components/Event/EventDetails/EventDetails";
import { EventDetailsPageData } from "@/lib/api";

export default async function EventDetailsData({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data = await EventDetailsPageData(slug);
  

  const event = data?.event;
  const settings = data?.settings || {}; 

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div>
      <EventDetails
        event_title={event.event_title}
        event_slug={event.event_slug}
        event_short_description={event.event_short_description}
        event_description={event.event_description}
        event_feature_image={event.event_feature_image}
        event_date={event.event_date}
        event_gallery={event.event_gallery}
        event_video_link_gallery={event.event_video_link_gallery}
      />

      <ProjectSection
        projects={data.projects}
        projectTitle="project_title"
        projectDescription="project_description"
        sectionKey="legal-status-project-section"
        className="our-projects"
      />

    </div>
  );
}

