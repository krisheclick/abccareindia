'use client'

import { useGlobalContext } from "@/context/global_context";
import Image from "next/image";
import styles from "../../common/style.module.css";

interface ContactDescriptionProps {
  page_name: string;
  page_feature_image: string | null;
  page_short_description: string;
  page_content: string;
}



  const mediaBaseURL = process.env.NEXT_PUBLIC_MEDIA_URL

export default function ContactDescription({
  page_name,
  page_feature_image,
  page_short_description,
  page_content,
}: ContactDescriptionProps) {

    const {commonData} = useGlobalContext();

    const phone1 = commonData?.site_footer_phone_1;
    const phone2 = commonData?.site_footer_phone_2;
    const email = commonData?.site_footer_email;
    const address = commonData?.site_footer_address;
    const address_link = commonData?.site_footer_address_link;

  return (



     <div className={styles.contact_inner_page}>
      <div className="container">
        <div className={styles.inner_mdlprheading}>
          <h2
            className={styles.cmn_black_heading}
            dangerouslySetInnerHTML={{ __html: page_short_description }}
            />

          <div
            className={styles.paragraph}
            dangerouslySetInnerHTML={{ __html: page_content }}
            />

        </div>

        <div className="row wow fadeInUp" data-wow-delay="0.5s">
          <div className="col-lg-4">
            <div className={styles.contact_box}>
              <div className={styles.img_icon}>
                <figure>
                  <img src="/images/contact_call.png" alt="" />
                </figure>
              </div>

              <div className={styles.contact_sub_text}>Call us at</div>

              <div className={styles.link_contact_text}>
                {phone1 && (
                  <a href={`tel:${phone1.replace(/\s+/g, "")}`}>
                    {phone1}
                  </a>
                )}
                {phone2 && (
                  <>
                    {" / "}
                    <a href={`tel:${phone2.replace(/\s+/g, "")}`}>
                      {phone2}
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className={styles.contact_box}>
              <div className={styles.img_icon}>
                <figure>
                  <img src="/images/contact_mail.png" alt="" />
                </figure>
              </div>

              <div className={styles.contact_sub_text}>Email us</div>

              <div className={styles.link_contact_text}>
                {email && (
                  <a href={`mailto:${email.trim()}`}>
                    {email}
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className={styles.contact_box}>
              <div className={styles.img_icon}>
                <figure>
                  <img src="/images/contact_map.png" alt="" />
                </figure>
              </div>

              <div className={styles.contact_sub_text}>We are here</div>

              <div className={styles.link_contact_text}>
                {address && (
                  <a
                    href={address_link ?? "#"}
                    dangerouslySetInnerHTML={{ __html: address }}
                    />
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>






    
  );
}
