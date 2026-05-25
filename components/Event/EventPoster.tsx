import { Container, Stack } from 'react-bootstrap'
import Styles from './style.module.css'
import Image from 'next/image';

interface Props{
    poster?: string;
    title?: string;
    date?: string;
    description?: string;
}
const EventPoster = ({poster, title, date, description}: Props) => {
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
                    <div className={`event_date ${Styles.date}`}>{formattedDate}</div>
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
