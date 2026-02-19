"use client";
import { useGlobalContext } from "@/context/global_context";
import { parseToArray } from "@/utlis/array_prase";
import Link from "next/link";

interface SocialItem {
  site_social_link_name?: string;
  site_social_link_url?: string;
  site_class_name?: string;
}

const Social = ({className = ''}:{className?: string}) => {
    const {commonData} = useGlobalContext();
    const social = parseToArray<SocialItem>(commonData?.social_media);
    return (
        <ul className={`${className ?? ''} d-flex align-items-center`}>
            {social?.map((value, index) => {
                return(
                    <li key={index}>
                        <Link 
                            href={value.site_social_link_url ?? ''}
                            aria-label={value.site_social_link_name}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className={value.site_class_name}></i>
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}

export default Social
