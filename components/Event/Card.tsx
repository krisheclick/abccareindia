import CustomImage from "@/utlis/imagefunction";
import Styles from "./style.module.css"
import Link from "next/link";
interface EventItem {
    poster?: string;
    date?: string;
    title?: string;
    slug?: string;
    description?: string;
}
const EventCard = ({poster, date, title, slug, description}: EventItem) => {
    const dateObj = new Date(date ?? '');
    const formattedDate = dateObj.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
    }) + dateObj.getFullYear();
    return (
        <div className={Styles.evlsbx}>
            <CustomImage
                className={Styles.evlsimg}
                src={poster}
                alt={title}
            />
            <div className={Styles.evlstbx}>
                <div className={Styles.evlsdate}>{formattedDate}</div>
                <div className={Styles.evlshead}>{title}</div>
                <div className={Styles.evlspara}
                    dangerouslySetInnerHTML={{__html: description || ''}}
                />
                <div className={Styles.evlsbtn}>
                    <Link href={`${process.env.NEXT_PUBLIC_ENV_URL}/events/${slug}`} className={Styles.donatenowup}>View More</Link>
                </div>
            </div>
        </div>
    )
}
export default EventCard;