import { Container, Stack } from 'react-bootstrap';
import Styles from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faPlay } from '@fortawesome/free-solid-svg-icons';

interface EventsData {
    event_title?: string;
    event_slug?: string;
    event_short_description?: string;
    event_description?: string;
    event_feature_image?: string;
    event_date?: string;
    event_gallery?: string[] | string;
    event_video_link_gallery?: string[] | string;
}
const Events = ({data}: {data: EventsData[] | null | undefined}) => {
    const eventData = data?.[0];
    return (
        <Stack className={`pt_80 pb_100 ${Styles.inrmdl_upcomsecds ?? ''}`}>
            <Container>
                <ul className={`d-flex align-items-center justify-content-center ${Styles.gllist}`}>
                    <li className={Styles.active}>
                        <span className={Styles.tabLink}>
                            <FontAwesomeIcon icon={faImage} /> images
                        </span>
                    </li>
                    <li>
                        <span className={Styles.tabLink}>
                            <FontAwesomeIcon icon={faPlay} /> Videos
                        </span>
                    </li>
                </ul>
                <div className={Styles.glimages}>
                </div>
            </Container>
        </Stack>
    )
}

export default Events
