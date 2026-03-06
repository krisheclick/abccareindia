import { Metadata } from 'next';
import { stripTags } from '@/utlis/strip_tags';
import SingleReport from './client';

export async function generateMetadata({params}: {params: {slug: string}}): Promise<Metadata> {
  const {slug} = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/page/${slug}`,
    { cache: "no-store" }
  );

  const {response_code, response_data } = await res.json();

  if (!response_code) {
    return {
      title: "Page Not Found",
      description: "This page does not exist",
    };
  } else {
    const pageData = response_data.page;
    const seoData = pageData.seo;

    const title = stripTags(seoData?.seo_meta_title);
    const pageTitle = stripTags(pageData.project_title);
    const description = stripTags(seoData?.seo_meta_description);
    const keyword = stripTags(seoData?.seo_meta_keyword);

    return {
      title: title || pageTitle,
      description: description || "Asha Bhavan Centre",
      keywords: keyword || [],
      openGraph: {
        title: title || pageTitle,
        description: description,
        images: [
          {
            url: `${process.env.NEXT_PUBLIC_MEDIA_URL}${seoData.seo_og_image}`,
            width: 1200,
            height: 630,
          },
        ],
      },
    };
  }

}
const ProjectDeails = async({params}: {params: {slug: string}}) => {
  const {slug} = await params;
  
  return <SingleReport permalink={slug} />
}

export default ProjectDeails

