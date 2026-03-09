import { Metadata } from 'next';
import BlogDetailsClient from './client'
import { stripTags } from '@/utlis/strip_tags';


export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
    const {slug} = await params;
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blog/${slug}`,
        { cache: "no-store" }
    );

    const { response_data } = await res.json();

    if (!response_data) {
        return {
            title: "Page Not Found",
            description: "This page does not exist",
        };
    } else {
        const pageData = response_data.blog;
        const seodata = pageData.BlogSeo;
        const title = stripTags(seodata.seo_meta_title);
        const pageTitle = stripTags(pageData.blog_title);
        const description = stripTags(seodata?.seo_meta_description);
        const keyword = stripTags(seodata?.seo_meta_keyword);

        return {
            title: title || pageTitle,
            description: description || "Asha Bhavan Centre",
            keywords: keyword || [],
            openGraph: {
                title: title || pageTitle,
                description: description,
                images: [
                    {
                        url: `${process.env.NEXT_PUBLIC_MEDIA_URL}${seodata.seo_og_image}`,
                        width: 1200,
                        height: 630,
                    },
                ],
            },
        };
    }

}
const BlogDetails = async({params}: {params: Promise<{slug: string}>}) => {
    const {slug} = await params;
    return <BlogDetailsClient permalink={slug} />
}

export default BlogDetails
