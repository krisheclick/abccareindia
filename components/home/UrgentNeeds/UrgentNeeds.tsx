'use client';
import Styles from "./style.module.css";
import { Container } from 'react-bootstrap';
import CustomImage from '@/utlis/imagefunction';
import Link from "next/link";

interface UrgentNeedsSectionData {
    urgent_needs_image?: string;
    urgent_title?: string;
    urgent_needs_description?: string;
    urgent_button?: string;
    urgent_button_link?: string;
}

interface UrgentNeedsProps {
    sectionData: UrgentNeedsSectionData;
}

const mediaBaseURL = process.env.NEXT_PUBLIC_MEDIA_URL;

export default function UrgentNeeds({ sectionData }: UrgentNeedsProps) {
    if (!sectionData) return null;

    return (
        <div className={Styles.urgentNeeds_section}>
            <Container>
                <div className={Styles.urgentNeeds_wrapper}>
                    {sectionData.urgent_needs_image && (
                        <CustomImage
                            src={`${mediaBaseURL}/uploads/page_image/${sectionData.urgent_needs_image}`}
                            alt="Urgent Needs"
                            width={600}
                            height={400}
                            style={{ objectFit: 'cover' }}
                            className={Styles.urgentNeeds_image}
                        />
                    )}
                    <div className={Styles.urgentNeeds_content}>
                        {sectionData.urgent_title && (
                            <h2 
                                dangerouslySetInnerHTML={{
                                    __html: sectionData.urgent_title,
                                }}
                            />
                        )}
                        {sectionData.urgent_needs_description && (
                            <div 
                                dangerouslySetInnerHTML={{
                                    __html: sectionData.urgent_needs_description,
                                }}
                            />
                        )}
                        {sectionData.urgent_button && (
                            <Link href={sectionData.urgent_button_link ?? ''} className={Styles.button}>{sectionData.urgent_button}</Link>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
}
