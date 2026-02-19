import CounterSection from "@/components/common/CounterSection";
import ProjectSection from "@/components/common/ProjectSection";
import PageHeader from "@/components/layout/PageHeader";
import OurReach from "@/components/our-reach/OurReach/OurReach";
import OurReachDescription from "@/components/our-reach/OurReachPageDescription/OurReachDescription";
import { WhereWeArePageData } from "@/lib/api";

export default async function WhereWeArePage() {
  const data = await WhereWeArePageData();

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
        <OurReachDescription
            page_name={data.page.page_name}
            page_short_description={data.page.page_short_description}
            page_content={data.page.page_content}
            page_feature_image={data.page.page_feature_image}
        />

      <OurReach data={data.our_reach} />

        <CounterSection
            counterMedia={data.settings.counter_media} 
            className="event-counter-section"
        />
      
      <ProjectSection
        projects={data.projects}
        customFields={customFields}
        projectTitle="project_title"
        projectDescription="project_description"
        sectionKey="our-reach-project-section"
        className="our-projects"
      />
    </>
  );
}