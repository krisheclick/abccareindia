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
    return (
        <Stack className={`pt_80 pb_50 ${Styles.evlsbxdetails ?? ''}`}>
            <Container>
                <Stack as="figure" className={Styles.evlsimg}>
                    <Image
                        src={poster ?? ''}
                        alt="Events Poster"
                        width={1440}
                        height={720}
                    />
                </Stack>
                <Stack className={Styles.evlstbx}>
                    <div 
                        className={Styles.evlsdate}
                        dangerouslySetInnerHTML={{ __html:date ?? '' }}
                    />
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
