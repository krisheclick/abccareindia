'use client';

import Image from 'next/image';

interface OurReachSectionData {
  our_reach_title?: string;
  our_reach_description?: string;
}

interface OurReachItem {
  our_reach_description?: string;
  our_reach_feature_image?: string;
  our_reach_button_data?: string;
  our_reach_counter_data?: string;
}

interface HomeOurReachProps {
  sectionData: OurReachSectionData;
  ourReachData: OurReachItem[];
}

const mediaBaseURL = process.env.NEXT_PUBLIC_MEDIA_URL;

export default function HomeOurReach({
  sectionData,
  ourReachData,
}: HomeOurReachProps) {
  if (!sectionData && !ourReachData?.length) return null;

  const reachItem = ourReachData?.[0];

  const counters = reachItem?.our_reach_counter_data
    ? JSON.parse(reachItem.our_reach_counter_data)
    : [];

  const button = reachItem?.our_reach_button_data
    ? JSON.parse(reachItem.our_reach_button_data)
    : null;

  return (
    <section className="our-reach-section">
      <div className="container">

        {/* SECTION HEADER */}
        <div className="our-reach-header">
          {sectionData?.our_reach_title && (
            <h2>{sectionData.our_reach_title}</h2>
          )}
          {sectionData?.our_reach_description && (
            <p>{sectionData.our_reach_description}</p>
          )}
        </div>

        <div className="our-reach-wrapper">

          {/* LEFT CARD */}
          <div className="our-reach-left-card">

            {/* Image */}
            {reachItem?.our_reach_feature_image && (
              <div className="our-reach-image">
                <Image
                  src={`${mediaBaseURL}${reachItem.our_reach_feature_image}`}
                  alt={sectionData?.our_reach_title || 'Our Reach'}
                  width={100}
                  height={100}
                  style={{ objectFit: 'cover' }}
                />
              </div>
            )}

            {/* Description + Button */}
            <div className="our-reach-description">
              {reachItem?.our_reach_description && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: reachItem.our_reach_description,
                  }}
                />
              )}

              {button?.text && button?.url && (
                <a href={button.url} className="our-reach-btn">
                  {button.text}
                </a>
              )}
            </div>

          </div>

          {/* RIGHT CARD - COUNTERS */}
          {counters.length > 0 && (
            <div className="our-reach-right-card">
              <div className="our-reach-counters">
                {counters.map((counter: any, index: number) => (
                  <div key={index} className="our-reach-counter">
                    <div className="counter-circle">
                      {counter.our_reach_counter_number}
                      {counter.our_reach_counter_icon}
                    </div>
                    <p>{counter.our_reach_counter_title}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
