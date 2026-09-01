"use client";

import FancyboxWrapper from "@/utlis/FancyboxWrapper";
import { faArrowUpRightFromSquare, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Styles from "./style.module.css";
import { useGlobalContext } from "@/context/global_context";
import { trimWords } from "@/utlis/trimwords";
import { stripTags } from "@/utlis/strip_tags";

interface GalleryItem {
    media_gallery_id: number;
    media_gallery_image: string;
    media_gallery_url: string | null;
    media_gallery_description: string | null;
}

const MasonaryGallery = () => {
    const [gallery, setGallery] = useState<GalleryItem[]>([]);
    const {setHasLoading, hasLoading} = useGlobalContext();
        const fetchData = useCallback(async() => {
            setHasLoading(true);
            try{
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/media-gallery`, {
                    cache: "no-store",
                    credentials: "include",
                });
                const {response_data} = await response.json();
                setGallery(response_data ?? []);
            }catch(err: unknown){
                console.log('Gallery Item ', (err as Error).message);
                setGallery([]);
            }finally{
                setHasLoading(false);
            }
        }, [setHasLoading]);
        useEffect(() => {
            fetchData();
        }, [fetchData]);
        
    if (gallery.length === 0) return <p className={Styles.empty}>No gallery images found.</p>;

    return (
        <section aria-label="Media gallery">
            {!hasLoading ? (
                <FancyboxWrapper>
                    <ResponsiveMasonry
                        columnsCountBreakPoints={{ 0: 1, 576: 2, 992: 3 }}
                        gutterBreakPoints={{ 0: 12, 576: 16, 992: 24 }}
                    >
                        <Masonry>
                            {gallery.map((item, index) => {
                                const galleryUrl = item.media_gallery_url?.trim() ?? "";
                                const hasLink = galleryUrl !== "" && galleryUrl !== "#";
                                const imageUrl = `${process.env.NEXT_PUBLIC_MEDIA_URL}/uploads/media-gallery/${item.media_gallery_image}`;
                                const title = `Gallery image ${index + 1}`;
                                const description = item.media_gallery_description?.trim() || title;
                                const plainDescription = stripTags(description);
                                const trimDescription = trimWords(description, 20, "");

                                return (
                                    <Link
                                        href={hasLink ? galleryUrl : imageUrl}
                                        target={hasLink ? "_blank" : undefined}
                                        rel={hasLink ? "noopener noreferrer" : undefined}
                                        data-fancybox={hasLink ? undefined : "media-gallery"}
                                        data-caption={hasLink ? undefined : description}
                                        aria-label={hasLink ? `Visit link for ${plainDescription}` : `View ${plainDescription}`}
                                        className={Styles.item}
                                        key={item.media_gallery_id}
                                    >
                                        <Image
                                            src={imageUrl}
                                            alt={title}
                                            width={800}
                                            height={600}
                                            sizes="(max-width: 575px) 100vw, (max-width: 991px) 50vw, 33vw"
                                        />
                                        <span className={Styles.overlay} aria-hidden="true">
                                            <FontAwesomeIcon icon={hasLink ? faArrowUpRightFromSquare : faEye} />
                                        </span>
                                        <div className={Styles.description} aria-hidden="true">
                                            {trimDescription}
                                        </div>
                                    </Link>
                                );
                            })}
                        </Masonry>
                    </ResponsiveMasonry>
                </FancyboxWrapper>

            ) : (
                <ResponsiveMasonry
                    columnsCountBreakPoints={{ 0: 1, 576: 2, 992: 3 }}
                    gutterBreakPoints={{ 0: 12, 576: 16, 992: 24 }}
                >
                    <Masonry>
                        {[320, 420, 360, 460, 340, 400].map((height, index) => (
                            <div
                                className={`skeleton ${Styles.skeletonItem}`}
                                style={{ height }}
                                key={index}
                            />
                        ))}
                    </Masonry>
                </ResponsiveMasonry>
            )}
        </section>
    );
};

export default MasonaryGallery;
