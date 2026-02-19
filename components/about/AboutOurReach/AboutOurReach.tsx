"use client";


interface ButtonData {
  text: string;
  url: string;
}

interface CounterItem {
  our_reach_counter_number: string;
  our_reach_counter_title: string;
  our_reach_counter_icon: string;
}

interface OurReachItem {
  our_reach_description: string;
  our_reach_button_data: string;
  our_reach_counter_data: string;
  our_reach_feature_image: string;
}

interface Props {
  ourReach: OurReachItem[];
}

const mediaBaseURL = process.env.NEXT_PUBLIC_MEDIA_URL

export default function AboutOurReach({ ourReach }: Props) {
  if (!ourReach || ourReach.length === 0) return null;

  const data = ourReach[0];

  let button: ButtonData | null = null;
  let counters: CounterItem[] = [];

  try {
    button = data.our_reach_button_data
      ? JSON.parse(data.our_reach_button_data)
      : null;
  } catch (err) {
    console.error("Invalid our_reach_button_data", err);
  }

  try {
    counters = data.our_reach_counter_data
      ? JSON.parse(data.our_reach_counter_data)
      : [];
  } catch (err) {
    console.error("Invalid our_reach_counter_data", err);
  }

  return (
    <section className="about-our-reach">
      <div className="container">
        <div className="about-our-reach-wrapper">

          {/* LEFT CONTENT */}
          <div className="about-our-reach-content">
            <div
              className="about-our-reach-description"
              dangerouslySetInnerHTML={{
                __html: data.our_reach_description,
              }}
            />

            {button && (
              <a href={button.url} className="about-our-reach-btn">
                {button.text}
              </a>
            )}
          </div>

          
          {data.our_reach_feature_image && (
            <div className="about-our-reach-image">
              <img
                src={`${mediaBaseURL}${data.our_reach_feature_image}`}
                alt="Our Reach"
              />
            </div>
          )}
        </div>

        {/* COUNTERS */}
        {counters.length > 0 && (
          <div className="about-our-reach-counters">
            {counters.map((item, index) => (
              <div className="about-our-reach-counter" key={index}>
                <h3>
                  {item.our_reach_counter_number}
                  <span>{item.our_reach_counter_icon}</span>
                </h3>
                <p>{item.our_reach_counter_title}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
