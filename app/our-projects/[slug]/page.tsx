
// import ProjectSection from "@/components/common/ProjectSection";
// import ProjectDetails from "@/components/project/ProjectDetails/ProjectDetails";
// import { ProjectDetailsPageData } from "@/lib/api";

// export default async function ProjectDetailsPage({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   const { slug } = await params;


//   const data = await ProjectDetailsPageData(slug);

//   const project = data?.project;

//   if (!project) {
//     return <div>Project not found</div>;
//   }

//   return (
//     <div>
//       <ProjectDetails project={project} />

//       <ProjectSection
//             projects={data.projects}
//             projectTitle="project_title"
//             projectDescription="project_description"
//             sectionKey="legal-status-project-section"
//             className="our-projects"
//         />

//     </div>
//   );
// }

import { Metadata } from 'next'
import SingleProject from './client'
import { stripTags } from '@/utlis/strip_tags';

export async function generateMetadata({params}: {params: {slug: string}}): Promise<Metadata> {
  const {slug} = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/get-projects/${slug}`,
    { cache: "no-store" }
  );

  const {response_code, response_data } = await res.json();

  if (!response_code) {
    return {
      title: "Page Not Found",
      description: "This page does not exist",
    };
  } else {
    const pageData = response_data.project;
    const seoData = pageData.ProjectSeo;

    const title = stripTags(seoData?.seo_meta_title);
    const pageTitle = stripTags(pageData.project_title);
    const description = stripTags(seoData?.seo_meta_description);
    const keyword = stripTags(seoData?.seo_meta_keyword);

    return {
      title: title || pageTitle,
      description: description || "Asha Bhavan Centre",
      keywords: keyword || [],
      openGraph: {
        title: title || pageTitle,
        description: description,
        images: [
          {
            url: `${process.env.NEXT_PUBLIC_MEDIA_URL}${seoData.seo_og_image}`,
            width: 1200,
            height: 630,
          },
        ],
      },
    };
  }

}
const ProjectDeails = async({params}: {params: {slug: string}}) => {
  const {slug} = await params;
  
  return <SingleProject permalink={slug} />
}

export default ProjectDeails

