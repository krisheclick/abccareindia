'use client';

interface Testimonial {
  testimonial_name: string;
  testimonial_designation: string;
  testimonial_rating: number;
  testimonial_description: string;
  testimonial_feature_image: string;
}

interface TestimonialSectionProps {
  testimonials: Testimonial[];

  /** Custom fields JSON already parsed in page.tsx */
  customFields?: any;

  /** Key of section inside group_name */
  sectionKey?: string;

  /** Optional wrapper class for page-specific styling */
  className?: string;
}

const mediaBaseURL = process.env.NEXT_PUBLIC_MEDIA_URL

export default function TestimonialSection({
  testimonials,
  customFields,
  sectionKey,
  className = 'testimonial-section',
}: TestimonialSectionProps) {
  if (!testimonials || testimonials.length === 0) return null;

  // get section from custom fields dynamically
  const group = customFields?.group_name;
  const section = sectionKey ? group?.[sectionKey] : null;
  const sectionTitle = section?.testimonial_title || 'Testimonials';

  return (
    <section className='testimonial_sectionsm'>
      <div className='container'>
        <div className='testimonial-section-heading'>
          <h2 className='cmn_black_heading'>{sectionTitle}</h2>
        </div>

        <div className="testimonial-container">
          <div className="testimonial-list">
            {testimonials.map((testimonial, index) => (
              <div className="testimonial-card" key={index}> 
                <div className='tccinmbx'>
                  {testimonial.testimonial_feature_image && (
                    <div className="testimonial-image">
                      <img src={`${mediaBaseURL}${testimonial.testimonial_feature_image}`} alt={testimonial.testimonial_name}/>
                    </div>
                  )} 
                  <div className='tstimgrnmbx'>
                    <div className='ticname'>{testimonial.testimonial_name}</div>
                      {testimonial.testimonial_designation && (
                        <span className="testimonial-designation">
                          {testimonial.testimonial_designation}
                        </span>
                      )}
                  </div>
                </div>  
                <div className="testimonial-content">  
                  {testimonial.testimonial_rating && (
                    <div className="testimonial-rating">
                      {Array.from({ length: testimonial.testimonial_rating }).map(
                        (_, i) => (
                          <span key={i}>&#9733;</span>
                        )
                      )}
                    </div>
                  )} 
                  
                  <div className="testimonial-description"
                    dangerouslySetInnerHTML={{
                      __html: testimonial.testimonial_description,
                    }}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
