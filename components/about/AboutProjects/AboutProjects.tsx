"use client";


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
  project_feature_image: string;
  project_description: string;
  project_gallery: string | null;
  project_location: string;
  project_button: string;
  project_video_link: string;
}

interface Props {
    customFields: any;
  projects: Project[];
}

export default function AboutProjects({ customFields, projects }: Props) {
    const group = customFields.group_name;
    const aboutProject = group["about-us-project-section"];

  if (!projects || projects.length === 0) return null;

  return (
    <section className="about-projects">
        <div className="about-project-section">
        <h2>{aboutProject?.about_us_project_section_title}</h2>

        <div
          dangerouslySetInnerHTML={{
            __html: aboutProject?.about_us_project_section_description,
          }}
        />
      </div>

      <div className="container">
        <div className="about-projects-list">
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
              <div className="about-project-card" key={project.project_id}>
                
                {/* IMAGE */}
                {project.project_feature_image && (
                  <div className="about-project-image">
                    <img
                      src={project.project_feature_image}
                      alt={project.project_title}
                    />
                  </div>
                )}

                {/* CONTENT */}
                <div className="about-project-content">
                  <h3>{project.project_title}</h3>
                  <span className="about-project-subtitle">
                    {project.project_subtitle}
                  </span>

                  <div
                    className="about-project-description"
                    dangerouslySetInnerHTML={{
                      __html: project.project_short_description,
                    }}
                  />

                  <div className="about-project-actions">
                    {button && (
                      <a href={button.url} className="about-project-btn">
                        {button.text}
                      </a>
                    )}

                    {location && (
                      <a
                        href={location.url}
                        className="about-project-location"
                      >
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
