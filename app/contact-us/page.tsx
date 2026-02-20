import { ContactUsPageData } from '@/lib/api';
import Counter from '@/components/common/Counter';
import ContactDescription from '@/components/contact/ContactDescription/ContactDescription';
import Contact from '@/components/contact/Contact/Contact';
import PageHeader from '@/components/layout/PageHeader';

export default async function EventsPage() {
  const data = await ContactUsPageData();

  return (
    <>
      <PageHeader
        page_name={data.page.page_name}
        page_slug={data.page.page_slug}
        page_feature_image={data.page.page_feature_image}
      />

      <ContactDescription
        page_short_description={data.page.page_short_description}
        page_content={data.page.page_content}
      />
      <Counter
        className='home_counter'
        poster={true}
      />
    </>
  );
}
