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
    const dateObj = new Date(date || '');

    const formttedDate =  dateObj.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
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
                    <div className={Styles.date}>{formttedDate}</div>
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
