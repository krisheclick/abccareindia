'use client'

interface Testimonial {
  testimonial_name: string;
  testimonial_designation: string;
  testimonial_rating: number;
  testimonial_description: string;
  testimonial_feature_image: string;
}

interface Props {
  testimonial: Testimonial[];
}

const mediaBaseURL = process.env.NEXT_PUBLIC_MEDIA_URL

export default function ProjectTestimonial({ testimonial }: Props) {
  if (!testimonial || testimonial.length === 0) return null;

  return (
    <section className="project-testimonial">
      <div className="container">
        <h2>What People Say</h2>

        <div className="testimonial-list">
          {testimonial.map((item, index) => (
            <div className="testimonial-card" key={index}>
              {item.testimonial_feature_image && (
                <img
                  src={item.testimonial_feature_image}
                  alt={item.testimonial_name}
                />
              )}

              <div
                className="testimonial-content"
                dangerouslySetInnerHTML={{
                  __html: item.testimonial_description,
                }}
              />

              <h4>{item.testimonial_name}</h4>
              <span>{item.testimonial_designation}</span>

              <div className="testimonial-rating">
                {"*".repeat(item.testimonial_rating)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
