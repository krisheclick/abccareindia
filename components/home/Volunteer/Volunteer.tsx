'use client';
import Link from 'next/link';
import Styles from "./style.module.css";
import { Container } from 'react-bootstrap';

interface VolunteerSectionData {
    volunteer_image?: string;
    volunteer_title?: string;
    volunteer_button_text?: string;
    volunteer_button_url?: string;
}

interface VolunteerProps {
    sectionData: VolunteerSectionData;
}

const mediaBaseURL = process.env.NEXT_PUBLIC_MEDIA_URL;

export default function Volunteer({ sectionData }: VolunteerProps) {
    if (!sectionData) return null;

    return (
        <>
            <div className={Styles.volunteer} style={{background: `url('${mediaBaseURL}/uploads/page_image/${sectionData.volunteer_image}') no-repeat center / cover`}}>
                <Container className={Styles.volunteerWrapper}>
                    <div className={Styles.volunteerContent}>
                        <h2 className="cmn_white_heading big text-uppercase">{sectionData.volunteer_title}</h2>
                        {sectionData.volunteer_button_text && (
                            <Link
                                href={sectionData.volunteer_button_url || '#'}
                                className="btn-primary d-inline-block mt-1"
                            >
                                {sectionData.volunteer_button_text}
                            </Link>
                        )}
                    </div>
                </Container>
            </div>
        </>
    );
}
