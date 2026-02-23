// lib/seo.ts

import { Metadata } from "next";

interface SeoImage {
    url?: string;
}

interface SeoData {
    seo_meta_title?: string;
    seo_meta_description?: string;
    seo_meta_keywords?: string[];
    seo_og_image?: string;
}

interface PageData {
    page_name?: string;
    page_slug?: string;
    seo?: SeoData;
}

interface GenerateSeoProps {
    page?: PageData;
    fallbackTitle?: string;
    fallbackDescription?: string;
}

export function generateSeoMetadata({
    page,
    fallbackTitle = "Asha Bhavan Centre",
    fallbackDescription = "Default website description",
}: GenerateSeoProps): Metadata {
    const seo = page?.seo;

    const title = seo?.seo_meta_title || page?.page_name || fallbackTitle;

    const description =
        seo?.seo_meta_description || fallbackDescription;

    const keywords = seo?.seo_meta_keywords || [];

    const ogImage = seo?.seo_og_image
        ? `${process.env.NEXT_PUBLIC_MEDIA_URL}${seo.seo_og_image}`
        : undefined;

    return {
        title,
        description,
        keywords,
        openGraph: {
            title,
            description,
            type: "website",
            images: ogImage
                ? [
                    {
                        url: ogImage,
                        width: 1200,
                        height: 630,
                    },
                ]
                : undefined,
        },
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_ENV_URL}/${page?.page_slug}`,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ogImage ? [ogImage] : undefined,
        },
    };
}