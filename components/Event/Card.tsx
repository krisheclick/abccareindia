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
        <div className={Styles.card}>
            <CustomImage
                className={Styles.card_image}
                src={poster}
                alt={title}
            />
            <div className={Styles.event_content}>
                <div className={Styles.date}>{formattedDate}</div>
                <div className={Styles.title}>{title}</div>
                <div className={Styles.card_content}
                    dangerouslySetInnerHTML={{__html: description || ''}}
                />
                <div className={Styles.card_btn_wrap}>
                    <Link href={`${process.env.NEXT_PUBLIC_ENV_URL}/events/${slug}`} className={`btn btn-primary ${Styles.card_btn}`}>View More</Link>
                </div>
            </div>
        </div>
    )
}
export default EventCard;