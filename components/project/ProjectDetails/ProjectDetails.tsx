'use client'

interface ProjectButton {
  text: string;
  url: string;
}

interface ProjectLocation {
  text: string;
  url: string;
}

interface Category {
  project_category_title: string;
  project_category_slug: string;
}

interface Project {
  project_title: string;
  project_subtitle: string;
  project_slug: string;
  project_short_description: string;
  project_feature_image: string;
  project_description: string;
  project_gallery: string[] | null;
  project_location: string; 
  project_button: string; 
  project_video_link: string;
  Category: Category;
}

interface ProjectDetailsProps {
  project: Project;
}

const mediaBaseURL = process.env.NEXT_PUBLIC_MEDIA_URL

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  
  let projectLocation: ProjectLocation | null = null;
  let projectButton: ProjectButton | null = null;

  try {
    projectLocation = project.project_location ? JSON.parse(project.project_location) : null;
  } catch (err) {
    console.error("Invalid project_location JSON", err);
  }

  try {
    projectButton = project.project_button ? JSON.parse(project.project_button) : null;
  } catch (err) {
    console.error("Invalid project_button JSON", err);
  }

  return (
    <div className="project-details">
      <h1>{project.project_title}</h1>
      <h2>{project.project_subtitle}</h2>
      <p><strong>Slug:</strong> {project.project_slug}</p>

      {project.project_feature_image && (
        <img src={`${mediaBaseURL}${project.project_feature_image}`} alt={project.project_title} />
      )}

      {/* <div dangerouslySetInnerHTML={{ __html: project.project_short_description }} /> */}
      <div dangerouslySetInnerHTML={{ __html: project.project_description }} />

      {project.project_video_link && (
        <div>
          <a href={project.project_video_link} target="_blank" rel="noopener noreferrer">
            Watch Video
          </a>
        </div>
      )}

      {projectLocation && (
        <p>
          <strong>Location:</strong>{" "}
          {projectLocation.url ? (
            <a href={projectLocation.url}>{projectLocation.text}</a>
          ) : (
            projectLocation.text
          )}
        </p>
      )}

      {projectButton && (
        <a href={projectButton.url} className="project-button">
          {projectButton.text}
        </a>
      )}

      {project.Category && (
        <p>
          <strong>Category:</strong> {project.Category.project_category_title}
        </p>
      )}

      {project.project_gallery && project.project_gallery.length > 0 && (
        <div className="project-gallery">
          {project.project_gallery.map((img, index) => (
            <img key={index} src={`${mediaBaseURL}${img}`} alt={`Gallery ${index + 1}`} />
          ))}
        </div>
      )}
    </div>
  );
}
