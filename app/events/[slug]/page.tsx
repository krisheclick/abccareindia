import { stripTags } from "@/utlis/strip_tags";
import { Metadata } from "next";
import SingleClientpage from "./Clientpage";
// import { notFound } from "next/navigation";

// export async function generateMetadata(
//   { params }: { params: { slug: string } }
// ): Promise<Metadata> {

//     const slug = params.slug;

//     const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/event/${slug}`,
//         { cache: "no-store" }
//     );

//     const data = await res.json();
//     const response_data = data?.response_data;

//     // ✅ Correct 404 check
//     // if (!response_data?.event) {
//     //     notFound();
//     // }

//     const event = response_data.event;
//     const seo = event?.EventSeo;

//     const title = stripTags(seo?.seo_meta_title || "");
//     const pageTitle = stripTags(event?.event_title || "");
//     const description = stripTags(seo?.seo_meta_description || "");
//     const keyword = stripTags(seo?.seo_meta_keyword || "");

//     return {
//         title: title || pageTitle,
//         description: description || "Asha Bhavan Centre",
//         keywords: keyword || [],
//         openGraph: {
//             title: title || pageTitle,
//             description: description,
//             images: seo?.seo_og_image
//                 ? [
//                     {
//                         url: `${process.env.NEXT_PUBLIC_MEDIA_URL}${seo.seo_og_image}`,
//                         width: 1200,
//                         height: 630,
//                     },
//                 ]
//                 : [],
//         },
//     };
// }

const Singlepage = async({ params }: { params: { slug: string } }) => {
    const {slug} = await params;

    return <SingleClientpage permalink={slug ?? ''} />
}

export default Singlepage