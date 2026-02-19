"use client";
import { useEffect, useState } from "react";

export default function HomeClient() {
  const [data, setData] = useState(null);
  const [counterData, setCounterData] = useState([]);
  const [socialMedia, setsocialMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [settings, setSettings] = useState(null);
  const [QuickmenuLinks, setMenuLinks] = useState([]);
  const [RelativemenuLinks, setRelativeMenuLinks] = useState([]);

  useEffect(() => {
    let isMounted = true; // prevents state update if component unmounts

    async function fetchData() {
      try {
        setLoading(true);

        const [homeRes, settingRes, quickMenuRes, relativemenuRes] =
          await Promise.all([
            fetch("https://abcindia.eclickprojects.com/api/v1/page/home"),
            fetch("https://abcindia.eclickprojects.com/api/v1/site-setting"),
            fetch(
              "https://abcindia.eclickprojects.com/api/v1/menu/b01ab7766351d275f05d",
            ),
            fetch(
              "https://abcindia.eclickprojects.com/api/v1/menu/ddc3f99b63b33ca94eec",
            ),
          ]);

        // check errors manually (many devs skip this ❗)
        if (!homeRes.ok || !settingRes.ok) {
          throw new Error("API request failed");
        }

        const homeJson = await homeRes.json();
        const settingJson = await settingRes.json();
        const QuickmenuJson = await quickMenuRes.json();
        const RelativemenuJson = await relativemenuRes.json();

        if (!isMounted) return;

        setData(homeJson);

        // ✅ SAFE JSON parse
        const counterData = JSON.parse(
          settingJson?.response_data?.filteredSettings?.counter_media || "[]",
        );

        const socialMedia = JSON.parse(
          settingJson?.response_data?.filteredSettings?.social_media || "[]",
        );

        setMenuLinks(Object.values(QuickmenuJson?.response_data || {}));

        setRelativeMenuLinks(
          Object.values(RelativemenuJson?.response_data || {}),
        );

        setCounterData(counterData);

        setsocialMedia(socialMedia);

        setSettings(settingJson?.response_data?.filteredSettings);

        if (!settings) return null;
      } catch (err) {
        console.error("Fetch error:", err);
        if (isMounted) setError("Something went wrong while fetching data.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false; // cleanup
    };
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!data?.response_data) return <p>No data found</p>;

  const {
    banner,
    pages_custom_field,
    usp,
    projects,
    charitable_message,
    testimonial,
    donor_brand,
  } = data.response_data;

  // ✅ Normalize banner into an array
  const banners = Array.isArray(banner) ? banner : banner ? [banner] : [];

  /* ---------------- About Us ---------------- */
  let aboutSection: any = null;
  let projectSection: any = null;
  let charitableMessageSection: any = null;
  let volunteerSection: any = null;
  let urgentNeedsSection: any = null;
  let ourReachSection: any = null;

  try {
    const customField = JSON.parse(pages_custom_field || "{}");
    aboutSection = customField?.group_name?.["about-section"];

    projectSection = customField?.group_name?.["project-section"];

    charitableMessageSection = customField?.group_name?.["charitable-section"];

    volunteerSection = customField?.group_name?.["volunteer-section"];

    urgentNeedsSection = customField?.group_name?.["urgent-needs-section"];
  } catch {
    aboutSection = null;
    projectSection = null;
    charitableMessageSection = null;
    volunteerSection = null;
    urgentNeedsSection = null;
    ourReachSection = null;
  }

  // usp section
  const uspList = Array.isArray(usp)
    ? [...usp].sort((a: any, b: any) => a.usp_order - b.usp_order)
    : [];

  // success story
  const success_story = data?.response_data?.success_story?.[0];
  try {
    var successMedia = success_story?.success_story_media_file
      ? JSON.parse(success_story.success_story_media_file)
      : [];
  } catch (e) {
    successMedia = [];
  }

  // our projects
  const safeParse = (value) => {
    try {
      let parsed = JSON.parse(value);

      // If still string → parse again
      if (typeof parsed === "string") {
        parsed = JSON.parse(parsed);
      }

      return parsed;
    } catch {
      return null;
    }
  };

  // our reach
  const our_reach = data?.response_data?.our_reach?.[0];

  // our reach section
  const buttonData = our_reach?.our_reach_button_data
    ? JSON.parse(our_reach.our_reach_button_data)
    : {};

  const counters = our_reach?.our_reach_counter_data
    ? JSON.parse(our_reach.our_reach_counter_data)
    : [];

  return (
    <>
      {/* ---------------- Banner Section ---------------- */}
      <div>
        <h1>Home Page Data</h1>

        {banners.length > 0 ? (
          banners.map((item: any) => (
            <div key={item.banner_id} style={{ marginBottom: "30px" }}>
              <h3>{item.banner_title}</h3>

              {item.banner_video_upload_type === "file" &&
              item.banner_file_link ? (
                <video autoPlay muted loop width={600}>
                  <source src={item.banner_file_link} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={item.banner_link}
                  alt={item.banner_title}
                  width={600}
                />
              )}
            </div>
          ))
        ) : (
          <p>No banners found</p>
        )}
      </div>

      {/* ---------------- About Us Section ---------------- */}
      <section style={{ marginTop: "40px" }}>
        <h2>About Us</h2>

        {aboutSection ? (
          <div
            style={{
              display: "flex",
              gap: "40px",
              flexWrap: "wrap",
              alignItems: "flex-start",
            }}
          >
            {/* LEFT SIDE */}
            <div style={{ flex: "1", minWidth: "300px" }}>
              <h3>{aboutSection.name}</h3>

              <div
                dangerouslySetInnerHTML={{
                  __html: aboutSection.about_left_description,
                }}
              />

              {aboutSection.about_left_image && (
                <img
                  src={aboutSection.about_left_image}
                  alt={aboutSection.about_left_image_text || "About us"}
                  width={400}
                  style={{ borderRadius: "10px", marginTop: "15px" }}
                />
              )}

              {aboutSection.about_left_button_url && (
                <div>
                  <a
                    href={aboutSection.about_left_button_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
                      marginTop: "20px",
                      padding: "12px 24px",
                      backgroundColor: "#e63946",
                      color: "#fff",
                      textDecoration: "none",
                      borderRadius: "6px",
                      fontWeight: "600",
                    }}
                  >
                    {aboutSection.about_left_button_text}
                  </a>
                </div>
              )}
            </div>

            {/* RIGHT SIDE */}
            <div style={{ flex: "1", minWidth: "300px" }}>
              <div
                dangerouslySetInnerHTML={{
                  __html: aboutSection.about_right_description,
                }}
              />

              {aboutSection.about_right_image && (
                <img
                  src={aboutSection.about_right_image}
                  alt="About Right"
                  width={400}
                  style={{ borderRadius: "10px", marginTop: "15px" }}
                />
              )}

              {aboutSection.about_right_button_url && (
                <div>
                  <a
                    href={aboutSection.about_right_button_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
                      marginTop: "20px",
                      padding: "12px 24px",
                      backgroundColor: "#1d3557",
                      color: "#fff",
                      textDecoration: "none",
                      borderRadius: "6px",
                      fontWeight: "600",
                    }}
                  >
                    {aboutSection.about_right_button_text}
                  </a>
                </div>
              )}
            </div>
          </div>
        ) : (
          <p>No About Section Found</p>
        )}
      </section>

      {/* usp section */}
      <section style={{ marginTop: "70px" }}>
        {uspList.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "30px",
            }}
          >
            {uspList.map((usp: any) => (
              <div
                key={usp.id}
                style={{
                  background: "#fff",
                  borderRadius: "14px",
                  padding: "25px",
                  textAlign: "center",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                  transition: "transform 0.3s",
                }}
              >
                {/* Image */}
                {usp.usp_feature_image && (
                  <img
                    src={`https://abcindia.eclickprojects.com${usp.usp_feature_image}`}
                    alt={usp.usp_title}
                    style={{
                      width: "90px",
                      height: "90px",
                      objectFit: "contain",
                      marginBottom: "15px",
                    }}
                  />
                )}

                {/* Title */}
                <h3 style={{ marginBottom: "10px" }}>{usp.usp_title}</h3>

                {/* Description */}
                <div
                  dangerouslySetInnerHTML={{
                    __html: usp.usp_description,
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: "center" }}>No USP Data Found</p>
        )}
      </section>

      {/* success story */}
      <section style={{ marginTop: "80px" }}>
        {success_story ? (
          <>
            {/* Title */}
            <h2 style={{ textAlign: "center" }}>
              {success_story.success_story_title}
            </h2>

            {/* Subtitle (HTML) */}
            <div
              style={{ textAlign: "center", marginTop: "10px" }}
              dangerouslySetInnerHTML={{
                __html: success_story.success_story_subtitle,
              }}
            />

            {/* Description */}
            <div
              style={{
                maxWidth: "900px",
                margin: "20px auto",
                textAlign: "center",
              }}
              dangerouslySetInnerHTML={{
                __html: success_story.success_story_description,
              }}
            />

            {/* Media Gallery */}
            {successMedia.length > 0 && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: "25px",
                  marginTop: "35px",
                }}
              >
                {successMedia.map((media, index) => (
                  <div
                    key={index}
                    style={{
                      overflow: "hidden",
                      borderRadius: "14px",
                      boxShadow: "0 10px 28px rgba(0,0,0,0.1)",
                    }}
                  >
                    {media.upload_type === "link" && media.thumb_name && (
                      <img
                        src={`https://abcindia.eclickprojects.com${media.thumb_name}`}
                        alt={`Success Story ${index + 1}`}
                        style={{
                          width: "100%",
                          height: "230px",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <p style={{ textAlign: "center" }}>No Success Story Found</p>
        )}
      </section>

      {/* our project section */}
      <section style={{ marginTop: "80px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "40px" }}>
          {projectSection.project_title}
        </h2>

        <p style={{ textAlign: "center", marginBottom: "40px" }}>
          {projectSection.project_subtitle}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "30px",
          }}
        >
          {projects.map((project) => {
            const location = safeParse(project.project_location);
            const button = safeParse(project.project_button);

            return (
              <div
                key={project.project_id}
                style={{
                  borderRadius: "14px",
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                  background: "#fff",
                }}
              >
                {/* Image */}
                <img
                  src={`https://abcindia.eclickprojects.com${project.project_feature_image}`}
                  alt={project.project_title}
                  style={{
                    width: "100%",
                    height: "220px",
                    objectFit: "cover",
                  }}
                />

                {/* Content */}
                <div style={{ padding: "20px" }}>
                  <h3>{project.project_title}</h3>

                  <p style={{ color: "#777", marginBottom: "10px" }}>
                    {project.project_subtitle}
                  </p>

                  {/* Short Description */}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: project.project_short_description,
                    }}
                  />

                  {/* Location */}
                  {location?.text && (
                    <p style={{ marginTop: "10px", fontWeight: "500" }}>
                      📍 {location.text}
                    </p>
                  )}

                  {/* Button */}
                  {button?.text && (
                    <a
                      href={button.url}
                      style={{
                        display: "inline-block",
                        marginTop: "15px",
                        padding: "10px 18px",
                        background: "#ff6b6b",
                        color: "#fff",
                        borderRadius: "8px",
                        textDecoration: "none",
                      }}
                    >
                      {button.text}
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------------- Volunteer Section ---------------- */}
      <section style={{ marginTop: "80px" }}>
        {volunteerSection ? (
          <div
            style={{
              display: "flex",
              gap: "50px",
              flexWrap: "wrap",
              alignItems: "center",
              background: "#f8f9fa",
              padding: "50px",
              borderRadius: "16px",
            }}
          >
            {/* LEFT IMAGE */}
            {volunteerSection.volunteer_image && (
              <div style={{ flex: "1", minWidth: "300px" }}>
                <img
                  src={`https://abcindia.eclickprojects.com/uploads/${volunteerSection.volunteer_image}`}
                  alt={volunteerSection.volunteer_title}
                  style={{
                    width: "100%",
                    maxWidth: "450px",
                    borderRadius: "14px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                  }}
                />
              </div>
            )}

            {/* RIGHT CONTENT */}
            <div style={{ flex: "1", minWidth: "300px" }}>
              <h2 style={{ marginBottom: "20px" }}>
                {volunteerSection.volunteer_title}
              </h2>

              {volunteerSection.volunteer_button_url && (
                <a
                  href={volunteerSection.volunteer_button_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    padding: "14px 28px",
                    background: "#1d3557",
                    color: "#fff",
                    textDecoration: "none",
                    borderRadius: "8px",
                    fontWeight: "600",
                    marginTop: "15px",
                  }}
                >
                  {volunteerSection.volunteer_button_text}
                </a>
              )}
            </div>
          </div>
        ) : (
          <p style={{ textAlign: "center" }}>No Volunteer Section Found</p>
        )}
      </section>

      <section style={{ marginTop: "80px" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1>{charitableMessageSection?.charitable_msg_title}</h1>
          <p>{charitableMessageSection?.charitable_msg_description}</p>
        </div>
        {charitable_message.length > 0 ? (
          charitable_message.map((msg, index) => {
            let button = null;

            try {
              button = msg.charitable_msg_button_data
                ? JSON.parse(msg.charitable_msg_button_data)
                : null;
            } catch {
              button = null;
            }

            return (
              <div
                key={index}
                style={{
                  maxWidth: "900px",
                  margin: "60px auto",
                  textAlign: "center",
                }}
              >
                {/* Title */}
                <h2>{msg.charitable_msg_title}</h2>

                {/* Description */}
                <div
                  dangerouslySetInnerHTML={{
                    __html: msg.charity_msg_description,
                  }}
                />

                {/* File (Image / Video) */}
                {msg.charitable_msg_file_link && (
                  <img
                    src={`https://abcindia.eclickprojects.com${msg.charitable_msg_file_link}`}
                    alt={msg.charitable_msg_title}
                    style={{
                      width: "100%",
                      maxWidth: "600px",
                      marginTop: "20px",
                      borderRadius: "12px",
                    }}
                  />
                )}

                {/* Button */}
                {button && (
                  <div style={{ marginTop: "25px" }}>
                    <a
                      href={button.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: "12px 26px",
                        background: "#e63946",
                        color: "#fff",
                        textDecoration: "none",
                        borderRadius: "6px",
                        fontWeight: "600",
                      }}
                    >
                      {button.text}
                    </a>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p style={{ textAlign: "center" }}>No Charitable Messages Found</p>
        )}
      </section>

      {/* urgent needs */}

      {/* ---------------- Urgent Needs Section ---------------- */}
      <section style={{ marginTop: "80px" }}>
        {urgentNeedsSection ? (
          <div
            style={{
              display: "flex",
              gap: "50px",
              flexWrap: "wrap",
              alignItems: "center",
              background: "#fff3f3",
              padding: "50px",
              borderRadius: "18px",
              boxShadow: "0 10px 35px rgba(0,0,0,0.08)",
            }}
          >
            {/* LEFT CONTENT */}
            <div style={{ flex: "1", minWidth: "300px" }}>
              <h2 style={{ marginBottom: "20px", color: "#c1121f" }}>
                {urgentNeedsSection.name}
              </h2>

              <div
                dangerouslySetInnerHTML={{
                  __html: urgentNeedsSection.urgent_needs_description,
                }}
              />
            </div>

            {/* RIGHT IMAGE */}
            {urgentNeedsSection.urgent_needs_image && (
              <div style={{ flex: "1", minWidth: "300px" }}>
                <img
                  src={`https://abcindia.eclickprojects.com/uploads/${urgentNeedsSection.urgent_needs_image}`}
                  alt="Urgent Needs"
                  style={{
                    width: "100%",
                    maxWidth: "450px",
                    borderRadius: "16px",
                    boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
                  }}
                />
              </div>
            )}
          </div>
        ) : (
          <p style={{ textAlign: "center" }}>No Urgent Needs Section Found</p>
        )}
      </section>

      {/* our reach section */}
      <section style={{ marginTop: "80px" }}>
        {!our_reach ? (
          <p style={{ textAlign: "center" }}>No Our Reach Section Found</p>
        ) : (
          <div
            style={{
              display: "flex",
              gap: "60px",
              flexWrap: "wrap",
              alignItems: "center",
              background: "#f0f7ff",
              padding: "60px",
              borderRadius: "20px",
              boxShadow: "0 15px 40px rgba(0,0,0,0.06)",
            }}
          >
            {/* LEFT */}
            <div style={{ flex: 1, minWidth: "320px" }}>
              <h2
                style={{
                  marginBottom: "25px",
                  color: "#003049",
                  fontSize: "36px",
                }}
              >
                {our_reach?.name}
              </h2>

              <div
                dangerouslySetInnerHTML={{
                  __html: our_reach?.our_reach_description || "",
                }}
              />

              {/* BUTTON */}
              {buttonData?.text && (
                <a
                  href={buttonData.url || "#"}
                  style={{
                    display: "inline-block",
                    marginTop: "25px",
                    background: "#003049",
                    color: "#fff",
                    padding: "14px 30px",
                    borderRadius: "10px",
                    textDecoration: "none",
                    fontWeight: "600",
                    transition: "0.3s",
                  }}
                >
                  {buttonData.text}
                </a>
              )}

              {/* COUNTERS */}
              {counters.length > 0 && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
                    gap: "25px",
                    marginTop: "45px",
                  }}
                >
                  {counters.map((counter, index) => (
                    <div
                      key={index}
                      style={{
                        background: "#fff",
                        padding: "25px",
                        borderRadius: "14px",
                        textAlign: "center",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "34px",
                          color: "#c1121f",
                          marginBottom: "8px",
                        }}
                      >
                        {counter.our_reach_counter_number}
                        {counter.our_reach_counter_icon}
                      </h3>

                      <p
                        style={{
                          margin: 0,
                          fontWeight: 500,
                          lineHeight: "1.4",
                        }}
                      >
                        {counter.our_reach_counter_title}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT IMAGE */}
            {our_reach?.our_reach_feature_image && (
              <div style={{ flex: 1, minWidth: "320px", textAlign: "center" }}>
                <img
                  src={`https://abcindia.eclickprojects.com${our_reach.our_reach_feature_image}`}
                  alt="Our Reach"
                  style={{
                    width: "100%",
                    maxWidth: "520px",
                    borderRadius: "18px",
                    boxShadow: "0 20px 45px rgba(0,0,0,0.12)",
                  }}
                />
              </div>
            )}
          </div>
        )}
      </section>

      {/* ================= COUNTER SECTION ================= */}

      <section
        style={{
          marginTop: "80px",
          padding: "60px 40px",
          background: "linear-gradient(135deg,#003049,#1d3557)",
          borderRadius: "20px",
          color: "#fff",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "40px",
            fontSize: "36px",
            letterSpacing: "1px",
          }}
        >
          Our Impact
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "30px",
          }}
        >
          {counterData.map((item, index) => (
            <div
              key={index}
              style={{
                background: "rgba(255,255,255,0.08)",
                padding: "35px 20px",
                borderRadius: "16px",
                textAlign: "center",
                backdropFilter: "blur(6px)",
              }}
            >
              <h1
                style={{
                  fontSize: "48px",
                  marginBottom: "10px",
                  fontWeight: "700",
                }}
              >
                {item.site_counter_number}+
              </h1>

              <p style={{ margin: 0, opacity: 0.9 }}>
                {item.site_counter_title}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* donation section */}

      <section
        style={{
          marginTop: "80px",
          padding: "70px 40px",
          background: "#fff7f0",
          borderRadius: "20px",
        }}
      >
        {/* MAIN HEADING */}
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <h2 style={{ fontSize: "38px", marginBottom: "10px" }}>
            {settings.site_donation_heading_title}
          </h2>

          <h3
            style={{ fontSize: "26px", fontWeight: "500" }}
            dangerouslySetInnerHTML={{
              __html: settings.site_donation_heading_subtitle,
            }}
          />

          <p style={{ marginTop: "10px", opacity: 0.8 }}>
            {settings.site_donation_heading_short_desc}
          </p>
        </div>

        {/* CARDS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            gap: "40px",
          }}
        >
          {/* VOLUNTEER */}
          <div
            style={{
              padding: "40px",
              borderRadius: "18px",
              background: "#ffffff",
              boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
              textAlign: "center",
            }}
          >
            <h2>{settings.site_volunteer_title}</h2>

            <p style={{ margin: "15px 0" }}>
              {settings.site_volunteer_short_desc}
            </p>

            <a
              href={settings.site_volunteer_button_url}
              style={{
                display: "inline-block",
                marginTop: "10px",
                background: "#1d3557",
                color: "#fff",
                padding: "12px 26px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              {settings.site_volunteer_button_text}
            </a>
          </div>

          {/* DONATE */}
          <div
            style={{
              padding: "40px",
              borderRadius: "18px",
              background: "linear-gradient(135deg,#e63946,#c1121f)",
              color: "#fff",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              textAlign: "center",
            }}
          >
            <h2>{settings.site_donate_title}</h2>

            <p style={{ margin: "15px 0", opacity: 0.95 }}>
              {settings.site_donate_short_desc}
            </p>

            <a
              href={settings.site_donate_button_url}
              style={{
                display: "inline-block",
                marginTop: "10px",
                background: "#fff",
                color: "#c1121f",
                padding: "12px 26px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "700",
              }}
            >
              {settings.site_donate_button_text}
            </a>
          </div>
        </div>
      </section>

      {/* testimonial section */}
      <section
        style={{
          marginTop: "90px",
          padding: "70px 40px",
          background: "#f9fbff",
          borderRadius: "20px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "36px",
            marginBottom: "50px",
            color: "#003049",
          }}
        >
          What People Say About Us
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            gap: "35px",
          }}
        >
          {testimonial.map((item, index) => (
            <div
              key={index}
              style={{
                background: "#fff",
                padding: "35px",
                borderRadius: "18px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                transition: "0.3s",
              }}
            >
              {/* IMAGE + NAME */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  marginBottom: "20px",
                }}
              >
                <img
                  src={`https://abcindia.eclickprojects.com/public${item.testimonial_feature_image}`}
                  alt={item.testimonial_name}
                  style={{
                    width: "65px",
                    height: "65px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />

                <div>
                  <h3 style={{ margin: 0 }}>{item.testimonial_name}</h3>
                  <p style={{ margin: 0, opacity: 0.7 }}>
                    {item.testimonial_designation}
                  </p>
                </div>
              </div>

              {/* STARS */}
              <div style={{ marginBottom: "15px", color: "#ffb703" }}>
                {"⭐".repeat(item.testimonial_rating)}
              </div>

              {/* DESCRIPTION */}
              <div
                style={{ opacity: 0.85, lineHeight: "1.6" }}
                dangerouslySetInnerHTML={{
                  __html: item.testimonial_description,
                }}
              />
            </div>
          ))}
        </div>
      </section>

      <section
        style={{
          marginTop: "90px",
          padding: "60px 40px",
          background: "#ffffff",
          borderRadius: "20px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "34px",
            marginBottom: "45px",
            color: "#003049",
          }}
        >
          Our Trusted Partners
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
            gap: "30px",
            alignItems: "center",
          }}
        >
          {donor_brand.map((brand, index) => (
            <a
              key={index}
              href={brand.donor_brand_link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#f7f9fc",
                padding: "25px",
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "110px",
                boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
                transition: "0.3s",
              }}
            >
              <img
                src={`https://abcindia.eclickprojects.com${brand.donor_brand_logo}`}
                alt={brand.donor_brand_name}
                style={{
                  maxWidth: "120px",
                  maxHeight: "60px",
                  objectFit: "contain",
                  filter: "grayscale(100%)",
                  transition: "0.3s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.filter = "grayscale(0%)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.filter = "grayscale(100%)")
                }
              />
            </a>
          ))}
        </div>
      </section>

      {/* social links */}
      {/* <Footer
        settings={settings}
        socialMedia={socialMedia}
        QuickmenuLinks={QuickmenuLinks}
        RelativemenuLinks={RelativemenuLinks}
      /> */}

    </>
  );
}
