import { Container, Stack } from 'react-bootstrap'
import Styles from './style.module.css'
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

interface Props{
    poster?: string;
    title?: string;
    date?: string;
    description?: string;
    location?: string;
}
const EventPoster = ({poster, title, date, description, location}: Props) => {
    const dateObj = new Date(date ?? '');
    function getOrdinal(day: number): string {
        if (day > 3 && day < 21) return "th";

        switch (day % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    }

    const day = dateObj.getDate();

    const formattedDate =
        `${day}${getOrdinal(day)} ` +
        dateObj.toLocaleDateString("en-GB", {
            month: "long",
        }) +
        ` ${dateObj.getFullYear()}`;
    
    return (
        <Stack className={Styles.eventBoxdetails}>
            <Container>
                <Stack as="figure" className={Styles.poster}>
                    <Image
                        src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${poster}` || ''}
                        alt="Events Poster"
                        width={1440}
                        height={720}
                    />
                </Stack>
                <Stack className={Styles.detailsCard}>
                    <Stack direction="horizontal" className='align-items-center gap-3 mb-2'>
                        <div className={`event_date mb-0 ${Styles.date}`}>{formattedDate}</div>
                        {location &&(
                            <div className={Styles.locationBox}>
                                <span><FontAwesomeIcon icon={faLocationDot} /></span>
                                <div>{location}</div>
                            </div>
                        )}
                    </Stack>
                    <div
                        className={Styles.title}
                        dangerouslySetInnerHTML={{ __html:title ?? '' }}
                    />
                    <div
                        className={Styles.paragraph}
                        dangerouslySetInnerHTML={{ __html: description ?? '' }}
                    />
                </Stack>
            </Container>
        </Stack>
    )
}

export default EventPoster
