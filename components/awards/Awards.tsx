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
        <Stack className={Styles.section}>
            <Container>
                <Stack className={`inner_mdlprheading ${Styles.section_content ?? ''}`}>
                    <h1
                        className={`cmn_black_heading ${Styles.cmn_black_heading ?? ''}`}
                        dangerouslySetInnerHTML={{ __html: title ?? '' }}
                    />
                    <div
                        className={`paragraph ${Styles.paragraph ?? ''}`}
                        dangerouslySetInnerHTML={{ __html: content ?? '' }}
                    />
                </Stack>
            </Container>
            {awards?.length && (
                <Stack className={Styles.awardList}>
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
