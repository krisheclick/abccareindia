import { LegalStatusPageData } from "@/lib/api";


import LegalStatus from "@/components/legal-status/LegalStatus/LegalStatus";
import LegalStatusDescription from "@/components/legal-status/LegalStatusDescription/LegalStatusDescription";
import ProjectSection from "@/components/common/ProjectSection";
import PageHeader from "@/components/layout/PageHeader";

export default async function OurProjectsPage() {
  const data = await LegalStatusPageData();

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

      <LegalStatusDescription
        page_name={data.page.page_name}
        page_short_description={data.page.page_short_description}
        page_content={data.page.page_content}
        page_feature_image={data.page.page_feature_image}
      />

      <LegalStatus awards={data.recognition_award} />

      
      <ProjectSection
        projects={data.projects}
        customFields={customFields}
        projectTitle="project_title"
        projectDescription="project_description"
        sectionKey="legal-status-project-section"
        className="our-projects"
      />
    </>
  );
}