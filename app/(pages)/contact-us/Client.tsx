"use client"
import Counter from '@/components/common/Counter'
import ContactDescription from '@/components/contact/ContactDescription/ContactDescription'
import ContactFormSection from '@/components/contact/ContactFormSection'
import InnerBanner from '@/components/layout/banner/InnerBanner';
import { useGlobalContext } from '@/context/global_context';
import { useEffect, useState } from 'react';
interface GroupData {
    group_name?: {
        "contact-page"?: {
            form_title?: string;
            map?: string;
        }
    };
}
interface PageData {
    page?: {
        page_name?: string;
        page_slug?: string;
        page_feature_image?: string;
        page_short_description?: string;
        page_content?: string;
        pages_custom_field?: GroupData;
    };
}
const ContactClient = () => {

    const { setHasLoading, setInnerBanner } = useGlobalContext();
    const [data, setData] = useState<PageData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setHasLoading(true);

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/page/contact-us`,
                    { cache: "no-cache" }
                );

                const { response_data } = await response.json();

                setData(response_data ?? null);
                setInnerBanner(response_data?.page ?? undefined);

                window.scrollTo({ top: 0, behavior: "smooth" });

            } catch (err: unknown) {
                console.log("API error:", (err as Error).message);
            } finally {
                setHasLoading(false);
            }
        };

        fetchData();
    }, [setHasLoading]);
    return (
        <div className='contact-page'>
            <InnerBanner />
            <ContactDescription
                page_short_description={data?.page?.page_short_description}
                page_content={data?.page?.page_content}
            />
            <ContactFormSection formData={data?.page} />
            <Counter
                className='home_counter'
                poster={true}
            />
        </div>
    )
}

export default ContactClient
