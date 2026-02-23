import { getAboutPageData } from "@/lib/api";

import AboutDescription from "@/components/about/AboutDescription/AboutDescription";
import AboutOurReach from "@/components/about/AboutOurReach/AboutOurReach";

import ProjectSection from "@/components/common/ProjectSection";
import PageHeader from "@/components/layout/PageHeader";

export default async function AboutUsPage() {
  const data = await getAboutPageData();


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

      <AboutDescription
        customFields={customFields}
        settings={data.settings}
      />

      
      <AboutOurReach ourReach={data.our_reach} />

      
      <ProjectSection
        projects={data.projects}
        customFields={customFields}
        projectTitle="about_us_project_section_title"
        projectDescription="about_us_project_section_description"
        sectionKey="about-us-project-section"
        className="our-projects"
      />
    </>
  );
}




// import { getAboutPageData } from "@/lib/api";
// import AboutDescription from "@/components/about/AboutDescription/AboutDescription";
// import AboutOurReach from "@/components/about/AboutOurReach/AboutOurReach";
// import AboutProjects from "@/components/about/AboutProjects/AboutProjects";

// export default async function AboutUsPage() {
//   const data = await getAboutPageData();

//   const customFields = JSON.parse(
//     data.page.pages_custom_field
//   );

//   return (
//      <>
//     <AboutDescription
//       customFields={customFields}
//       settings={data.settings}
//     />
//     <AboutOurReach 
//         ourReach={data.our_reach}
//     />
//     <AboutProjects 
//         customFields={customFields}
//         projects={data.projects}
//     />
//     </>
//   );
// }
