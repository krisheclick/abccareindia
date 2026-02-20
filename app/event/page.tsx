import { getEventPageData } from '@/lib/api';

import EventDescription from '@/components/Event/EventDescription/EventDescription';
import AllEvent from '@/components/Event/AllEvent/AllEvent';

import ProjectSection from '@/components/common/ProjectSection';
import PageHeader from '@/components/layout/PageHeader';

export default async function EventsPage() {
  const data = await getEventPageData();

  const customFields = JSON.parse(
    data.page.pages_custom_field
  );

  return (
    <>
      <PageHeader
        page_name={data.page.page_name}
        page_slug={data.page.page_slug}
        page_feature_image={data.page.page_feature_image}
      />

      <EventDescription
        page_name={data.page.page_name}
        page_feature_image={data.page.page_feature_image}
        page_short_description={data.page.page_short_description}
        page_content={data.page.page_content}
      />

      
      <AllEvent events={data.events} />

      
      <ProjectSection
        projects={data.projects}
        customFields={customFields}
        sectionKey="event-project-section"
        projectTitle="project_section_title"
        projectDescription="project_section_description"
        className="event-projects"
       />
    </>
  );
}
