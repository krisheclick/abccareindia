'use client'
import CustomImage from '@/utlis/imagefunction';
import Styles from './style.module.css';

interface PageData {
    page_name: string;
    page_feature_image: string | null;
    page_short_description: string;
    page_content: string;
}

interface Props {
    page: PageData;
}

const mediaBaseURL = process.env.NEXT_PUBLIC_MEDIA_URL
export default function ProjectDescription({ page }: Props) {
    if (!page) return null;

    return (
        <section className={`${Styles.inner_mdlprheading} pt_80`}>
            <div className="container">
                <h1 className='cmn_black_heading'>{page.page_name}</h1>

                {page.page_feature_image && (
                    <CustomImage
                        src={`${mediaBaseURL}${page.page_feature_image}`}
                        alt={page.page_name}
                        className={Styles.poster}
                    />
                )}

                {page.page_short_description && (
                    <p className="paragraph">
                        {page.page_short_description}
                    </p>
                )}

                {page.page_content && (
                    <div className="paragraph"
                        dangerouslySetInnerHTML={{ __html: page.page_content }}
                    />
                )}
            </div>
        </section>
    );
}
