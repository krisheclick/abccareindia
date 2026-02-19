'use client';

import Image from 'next/image';
import Link from 'next/link';

interface ProjectSectionConfig {
  project_title: string;
  project_subtitle: string;
  project_button_text?: string;
  project_button_url?: string;
}

interface ProjectItem {
  project_id: number;
  project_title: string;
  project_subtitle: string;
  project_slug: string;
  project_feature_image: string;
  project_video_link: string;
  project_short_description: string;
}

interface HomeProjectProps {
  sectionData: ProjectSectionConfig;
  projects: ProjectItem[];
}

const mediaBaseURL = process.env.NEXT_PUBLIC_MEDIA_URL;

export default function HomeProject({
  sectionData,
  projects,
}: HomeProjectProps) {
  if (!sectionData || !projects || projects.length === 0) return null;

  return (
    <section className="home-projects">
      <div className="container">

        {/* SECTION HEADER */}
        <div className="home-projects-header">
          <h2>{sectionData.project_title}</h2>
          <p>{sectionData.project_subtitle}</p>
        </div>

        {/* PROJECT GRID */}
        <div className="home-projects-grid">
          {projects.map((project) => (
            <div key={project.project_id} className="project-card">
              {/* TEXT FIRST */}
              <div className="project-card-content">
                <h3>{project.project_title}</h3>
                <h4>{project.project_subtitle}</h4>

                <div
                  className="project-description"
                  dangerouslySetInnerHTML={{
                    __html: project.project_short_description,
                  }}
                />

                <Link
                  href={`/our-project/${project.project_slug}`}
                  className="project-link"
                >
                  Learn More →
                </Link>
              </div>

              {/* IMAGE SECOND */}
              {project.project_feature_image && (
                <a href={project.project_video_link}>
                  <Image
                    src={`${mediaBaseURL}${project.project_feature_image}`}
                    alt={project.project_title}
                    width={400}
                    height={260}
                    style={{ objectFit: 'cover' }}
                  />
                </a>
              )}
            </div>

          ))}
        </div>

        {/* CTA BUTTON */}
        {sectionData.project_button_text && (
          <div className="home-projects-cta">
            <Link
              href={sectionData.project_button_url || '#'}
              className="btn-primary"
            >
              {sectionData.project_button_text}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
