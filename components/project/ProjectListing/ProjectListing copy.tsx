'use client'
 import Styles from './style.module.css';

interface Category {
  project_category_title: string;
  project_category_slug: string;
}
 
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
  project_location: string;
  project_button: string;
  Category?: Category;
}
 
interface Props {
  projects: Project[];
  projectCategories: Category[];
}
 
const mediaBaseURL = process.env.NEXT_PUBLIC_MEDIA_URL;
 
/**
 * Safely parses normal or double-stringified JSON
 */
const parseJSON = <T,>(value: string | null): T | null => {
  if (!value) return null;
 
  try {
    const firstParse = JSON.parse(value);
 
    // If backend double stringified it
    if (typeof firstParse === "string") {
      return JSON.parse(firstParse);
    }
 
    return firstParse;
  } catch (error) {
    console.error("JSON Parse Error:", error);
    return null;
  }
};
 
export default function ProjectListing({
  projects,
  projectCategories,
}: Props) {
  if (!projects || projects.length === 0) return null;
 
  return (
    <section className="project-listing">
      <div className="container">
 
        {/* CATEGORY FILTER */}
        {projectCategories?.length > 0 && (
          <ul className='gllist d-flex align-items-center justify-content-center'>
            {projectCategories.map((cat) => (
              <li key={cat.project_category_slug}>
                {cat.project_category_title}
              </li>
            ))}
          </ul>
        )}
 
        <div className="project-list">
          {projects.map((project) => {
            const button = parseJSON<ButtonData>(project.project_button);
            const location = parseJSON<ButtonData>(project.project_location);
 
            return (
              <div className="inner_mdlbxsin d-flex align-items-center" key={project.project_id}>

                <div className="inrplsbl">
                  {/* CATEGORY */}
                  {project.Category && (
                    <div className="inrplsblcm">
                      <span>{project.Category.project_category_title}</span>
                    </div>
                  )}

                  <div className="inrplsblaltxt">
                    <div className='inrplsblaltxth'>{project.project_title}</div>
                    <span>{project.project_subtitle}</span>
  
                    
  
                    {/* DESCRIPTION */}
                    <div className="project-description"
                      dangerouslySetInnerHTML={{
                        __html: project.project_short_description,
                      }}
                    />
  
                    {/* ACTION BUTTONS */}
                    <div className="project-actions">
                      {button?.text && button?.url && (
                        <a href={button.url} className="btn">
                          {button.text}
                        </a>
                      )}
  
                      {location?.text && location?.url && (
                        <a href={location.url} className="location">
                          {location.text}
                        </a>
                      )}
                    </div>
                  </div>
 
                </div>
 
                {/* IMAGE */}
                {project.project_feature_image && (
                  <img src={`${mediaBaseURL}${project.project_feature_image}`} alt={project.project_title}/>
                )} 

              </div>
            );
          })}
        </div>
 
      </div>
    </section>
  );
}