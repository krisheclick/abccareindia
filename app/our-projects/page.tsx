import { getProjectPageData } from "@/lib/api";

import ProjectDescription from "@/components/project/ProjectDescription/ProjectDescription";

import TestimonialSection from "@/components/common/Testimonial";
import PageHeader from "@/components/layout/PageHeader";
import ProjectListing from "@/components/project/ProjectListing/ProjectListing";

export default async function OurProjectsPage() {
  const data = await getProjectPageData();

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
      {/* Page description */}
      <ProjectDescription page={data.page} />  

      <ProjectListing projects={data.projects} projectCategories={data.project_categories}/>

      <TestimonialSection
        testimonials={data.testimonial}
        customFields={customFields}
        sectionKey="testimonial-section"
        className="event-testimonials"
      />
    </>
  );
}

 
