"use client";


interface CounterItem {
  site_counter_number: string;
  site_counter_title: string;
}

interface Props {
  customFields: any;
  settings: any;
}
const mediaBaseURL = process.env.NEXT_PUBLIC_MEDIA_URL

export default function AboutDescription({ customFields, settings }: Props) {
  const group = customFields.group_name;

  const underBanner = group["under-banner-section"];
  const secretaryMessage = group["secretarys-message"];
  const whatWeDo = group["what-we-do"];
  const successStory = group["success-story-of-about-us-section"];

  let counters: CounterItem[] = [];
  try {
    counters = settings?.counter_media
      ? JSON.parse(settings.counter_media)
      : [];
  } catch (err) {
    console.error("Counter media parse error", err);
  }

  return (
    <section className="about-description">

      {/* Under Banner Section */}
      <div className="about-under-banner">
        {underBanner?.video_thumb_nail_image && (
          <img
            src={`${mediaBaseURL}/uploads/page_image/${underBanner.video_thumb_nail_image}`}
            alt="Video Thumbnail"
          />
        )}

        {underBanner?.upload_video_file && (
          <video controls>
            <source
              src={`${mediaBaseURL}/uploads/page_image/${underBanner.upload_video_file}`}
              type="video/mp4"
            />
          </video>
        )}

        {underBanner?.upload_feature_image && (
          <img
            src={`${mediaBaseURL}/uploads/page_image/${underBanner.upload_feature_image}`}
            alt="Feature"
          />
        )}
      </div>

      {/* Secretary's Message */}
      <div className="secretary-message">
        <div
          className="content"
          dangerouslySetInnerHTML={{
            __html: secretaryMessage?.["secretary's_message_description"],
          }}
        />

        <div className="images">
          {secretaryMessage?.["secretary's_feature_image_1"] && (
            <img
              src={`${mediaBaseURL}/uploads/page_image/${secretaryMessage["secretary's_feature_image_1"]}`}
              alt="Secretary"
            />
          )}

          {secretaryMessage?.["secretary's_feature_image_2"] && (
            <img
              src={`${mediaBaseURL}/uploads/page_image/${secretaryMessage["secretary's_feature_image_2"]}`}
              alt="Secretary"
            />
          )}
        </div>
      </div>

      {/* What We Do */}
      <div className="what-we-do">
        <div
          className="content"
          dangerouslySetInnerHTML={{
            __html: whatWeDo?.what_we_do_description,
          }}
        />

        {whatWeDo?.what_we_do_feature_image && (
          <img
            src={`${mediaBaseURL}/uploads/page_image/${whatWeDo.what_we_do_feature_image}`}
            alt="What We Do"
          />
        )}
      </div>

      {/* Success Story */}
      <div className="about-success-story">
        <div
          className="content"
          dangerouslySetInnerHTML={{
            __html: successStory?.success_story_description,
          }}
        />

        {successStory?.success_story_feature_image && (
          <img
            src={`${mediaBaseURL}/uploads/page_image/${successStory.success_story_feature_image}`}
            alt="Success Story"
          />
        )}
      </div>

      {/* Counter Section */}
      {counters.length > 0 && (
        <div className="about-counters">
          {counters.map((item, index) => (
            <div className="counter-item" key={index}>
              <h3>{item.site_counter_number}</h3>
              <p>{item.site_counter_title}</p>
            </div>
          ))}
        </div>
      )}


    </section>
  );
}
