
import DonationSection from "@/components/common/DonationSection";
import ProjectSection from "@/components/common/ProjectSection";
import ProjectDetails from "@/components/project/ProjectDetails/ProjectDetails";
import { ProjectDetailsPageData } from "@/lib/api";

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  
  const data = await ProjectDetailsPageData(slug);

  const project = data?.project;
  const settings = data?.settings || {};

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div>
      <ProjectDetails project={project} />

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
