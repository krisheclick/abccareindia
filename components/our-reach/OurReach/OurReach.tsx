'use client';

interface OurReachCounter {
  our_reach_counter_number: string;
  our_reach_counter_title: string;
  our_reach_counter_icon?: string;
}

interface OurReachItem {
  our_reach_description: string;
  our_reach_button_data: string; 
  our_reach_counter_data: string;
  our_reach_feature_image?: string | null;
}

interface OurReachProps {
  data: OurReachItem[];
}

const mediaBaseURL = process.env.NEXT_PUBLIC_MEDIA_URL

export default function OurReach({ data }: OurReachProps) {
  if (!data || data.length === 0) return null;

  return (
    <section className="our-reach-section">
      <div className="container">
        {data.map((item, index) => {
          // Parse button and counter JSON strings
          const buttonData = item.our_reach_button_data
            ? JSON.parse(item.our_reach_button_data)
            : null;

          const counters: OurReachCounter[] = item.our_reach_counter_data
            ? JSON.parse(item.our_reach_counter_data)
            : [];

          return (
            <div className="our-reach-item" key={index}>
              
              {item.our_reach_feature_image && (
                <div className="feature-image">
                  <img
                    src={`${mediaBaseURL}${item.our_reach_feature_image}`}
                    alt={`Our Reach ${index + 1}`}
                  />
                </div>
              )}

              
              <div
                className="description"
                dangerouslySetInnerHTML={{ __html: item.our_reach_description }}
              />

              
              {counters.length > 0 && (
                <div className="reach-counters">
                  {counters.map((counter, i) => (
                    <div className="counter" key={i}>
                      <h3 className="counter-number">
                        {counter.our_reach_counter_number}
                        {counter.our_reach_counter_icon || ''}
                      </h3>
                      <p className="counter-title">{counter.our_reach_counter_title}</p>
                    </div>
                  ))}
                </div>
              )}

              
              {buttonData && buttonData.text && (
                <div className="reach-button">
                  <a href={buttonData.url} className="btn btn-primary">
                    {buttonData.text}
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
