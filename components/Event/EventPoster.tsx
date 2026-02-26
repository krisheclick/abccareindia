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
        <Stack className={`pt_80 pb_50 ${Styles.evlsbxdetails ?? ''}`}>
            <Container>
                <Stack as="figure" className={Styles.evlsimg}>
                    <Image
                        src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${poster}` || ''}
                        alt="Events Poster"
                        width={1440}
                        height={720}
                    />
                </Stack>
                <Stack className={Styles.evlstbx}>
                    <div className={Styles.evlsdate}>{formttedDate}</div>
                    <div
                        className={Styles.evlshead}
                        dangerouslySetInnerHTML={{ __html:title ?? '' }}
                    />
                    <div
                        className={Styles.evlspara}
                        dangerouslySetInnerHTML={{ __html: description ?? '' }}
                    />
                </Stack>
            </Container>
        </Stack>
    )
}

export default EventPoster
