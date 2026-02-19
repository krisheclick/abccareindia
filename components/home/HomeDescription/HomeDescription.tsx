'use client';
import Link from 'next/link';
import Styles from "./style.module.css";
import { Col, Container, Row } from 'react-bootstrap';
import CustomImage from '@/utlis/imagefunction';

interface HomeDescriptionProps {
    aboutSection: {
        about_subtitle?: string;
        about_title?: string;
        about_left_button_text?: string;
        about_left_button_url?: string;
        about_left_image?: string;
        about_right_description?: string;
        about_right_button_text?: string;
        about_right_button_url?: string;
        about_right_image?: string;
    };
}

const mediaBaseURL = process.env.NEXT_PUBLIC_MEDIA_URL;

export default function HomeDescription({ aboutSection }: HomeDescriptionProps) {
    if (!aboutSection) return null;

    return (
        <section className={Styles.posterAd}>
            <Container fluid className='px-0'>
                <Row className="g-0 align-items-stretch">

                    {/* LEFT SIDE */}
                    <Col lg={6} className={Styles.left}>
                        <div className={Styles.leftContent}>
                            <h4 className={Styles.smallTitle}>{aboutSection.about_subtitle}</h4>

                            <h1 className={Styles.mainTitle}
                                dangerouslySetInnerHTML={{
                                    __html: aboutSection.about_title ?? '',
                                }}
                            />
                            {aboutSection.about_left_button_text && (
                                <Link
                                    href={aboutSection.about_left_button_url ?? ''}
                                    className={Styles.donateBtn}
                                >
                                    {aboutSection.about_left_button_text}
                                </Link>
                            )}
                        </div>
                        <CustomImage
                            src={`${mediaBaseURL}/uploads/page_image/${aboutSection.about_left_image}`}
                            alt="QR Code"
                            className={Styles.qrBox}
                        />
                    </Col>

                    {/* RIGHT SIDE */}
                    <Col lg={6} className={Styles.right}>
                        <div className={Styles.rightContent}>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: aboutSection.about_right_description ?? '',
                                }}
                            />
                            {aboutSection.about_right_button_text && (
                                <Link
                                    href={aboutSection.about_right_button_url ?? ''}
                                    className={Styles.secondaryBtn}
                                >
                                    {aboutSection.about_right_button_text}
                                </Link>
                            )}
                        </div>
                        {aboutSection.about_right_image && (
                            <CustomImage
                                src={`${mediaBaseURL}/uploads/page_image/${aboutSection.about_right_image}`}
                                alt="About Image"
                                className={Styles.imageWrap}
                            />
                        )}
                    </Col>

                </Row>
            </Container>
        </section>
    );
}



// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';

// interface HomeDescriptionProps {
//   aboutSection: any;
// }

// const mediaBaseURL = process.env.NEXT_PUBLIC_MEDIA_URL;

// export default function HomeDescription({
//   aboutSection,
// }: HomeDescriptionProps) {
//   if (!aboutSection) return null;

//   return (
//     <section className="home-about">
//       <div className="container home-about-grid">

//         {/* LEFT */}
//         <div className="home-about-left">
//           <div
//             dangerouslySetInnerHTML={{
//               __html: aboutSection.about_left_description,
//             }}
//           />

//           {aboutSection.about_left_button_text && (
//             <Link
//               href={aboutSection.about_left_button_url}
//               className="btn-primary"
//             >
//               {aboutSection.about_left_button_text}
//             </Link>
//           )}

//           {aboutSection.about_left_image && (
//             <Image
//               src={`${mediaBaseURL}/uploads/page_image/${aboutSection.about_left_image}`}
//               alt="About Image"
//               width={500}
//               height={500}
//             />
//           )}
//         </div>

//         {/* RIGHT */}
//         <div className="home-about-right">
//           <div
//             dangerouslySetInnerHTML={{
//               __html: aboutSection.about_right_description,
//             }}
//           />

//           {aboutSection.about_right_button_text && (
//             <Link
//               href={aboutSection.about_right_button_url}
//               className="btn-secondary"
//             >
//               {aboutSection.about_right_button_text}
//             </Link>
//           )}

//           {aboutSection.about_right_image && (
//             <Image
//               src={`${mediaBaseURL}/uploads/page_image/${aboutSection.about_right_image}`}
//               alt="About Image"
//               width={500}
//               height={500}
//             />
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }
