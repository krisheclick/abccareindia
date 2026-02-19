'use client';

interface ButtonData {
  text: string;
  url: string;
}

interface Project {
  project_id: number;
  project_title: string;
  project_subtitle: string;
  project_slug: string;
  project_short_description: string;
  project_description: string;
  project_feature_image: string;
  project_gallery: string | null;
  project_location: string;
  project_button: string;
  project_video_link: string;
}

interface ProjectSectionProps {
  projects: Project[];
  customFields?: any;
  sectionKey: string; 
  projectTitle?: any;
  projectDescription?: any;
  className?: string;
}

const mediaBaseURL = process.env.NEXT_PUBLIC_MEDIA_URL


export default function ProjectSection({
  projects,
  customFields,
  projectTitle,
  projectDescription,
  sectionKey,
  className = 'project-section',
}: ProjectSectionProps) {
  if (!projects || projects.length === 0) return null;

  const group = customFields?.group_name;
  const section = customFields?.group_name?.[sectionKey];
  const project_title = section?.[projectTitle];
  const project_description = section?.[projectDescription];


  return (
    <section className={className}>
      {/* Section heading */}
      
        <div className="project-section-heading">
          
            <h2>{project_title}</h2>
                 
            <div><p>{project_description}</p></div>
                       
          
        </div>
      

      <div className="container">
        <div className="project-list">
          {projects.map((project) => {
            let button: ButtonData | null = null;
            let location: ButtonData | null = null;

            try {
              button = project.project_button
                ? JSON.parse(project.project_button)
                : null;
            } catch {}

            try {
              location = project.project_location
                ? JSON.parse(project.project_location)
                : null;
            } catch {}

            return (
              <div className="project-card" key={project.project_id}>
                {/* IMAGE */}
                {project.project_feature_image && (
                  <div className="project-image">
                    <img
                      src={`${mediaBaseURL}${project.project_feature_image}`}
                      alt={project.project_title}
                    />
                  </div>
                )}

                {/* CONTENT */}
                <div className="project-content">
                  <h3>{project.project_title}</h3>

                  {project.project_subtitle && (
                    <span className="project-subtitle">
                      {project.project_subtitle}
                    </span>
                  )}

                  <div
                    className="project-description"
                    dangerouslySetInnerHTML={{
                      __html: project.project_short_description,
                    }}
                  />

                  {/* ACTIONS */}
                  <div className="project-actions">
                    {button && (
                      <a href={button.url} className="project-btn">
                        {button.text}
                      </a>
                    )}

                    {location && (
                      <a href={location.url} className="project-location">
                        {location.text}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
