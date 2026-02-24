import { Container, Stack } from 'react-bootstrap'
import Styles from './style.module.css'
import AwardCard from './Card'

interface AwardItem {
    "recognition_award_description"?: string;
    "recognition_award_feature_image"?: string;
}
interface ContentProps {
    title?: string;
    content?: string;
    awards?: AwardItem[] | null;
}
const Awards = ({ title, content, awards }: ContentProps) => {
    return (
        <Stack className={`pt_80 ${Styles.inrmdl_upcomsecourrecog ?? ''}`}>
            <Container>
                <div className={Styles.inner_mdlprheading}>
                    <h1
                        className={`cmn_black_heading ${Styles.cmn_black_heading ?? ''}`}
                        dangerouslySetInnerHTML={{ __html: title ?? '' }}
                    />
                    <div
                        className={`paragraph ${Styles.paragraph ?? ''}`}
                        dangerouslySetInnerHTML={{ __html: content ?? '' }}
                    />
                </div>
            </Container>
            {awards?.length && (
                <Stack className={Styles.reog_alltextimg}>
                    {awards?.map((value, index) => (
                        <AwardCard
                            key={index}
                            poster={value?.recognition_award_feature_image}
                            content={value?.recognition_award_description}
                        />
                    ))}
                </Stack>
            )}
        </Stack>
    )
}

export default Awards
