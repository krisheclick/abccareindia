import { ContactUsPageData } from '@/lib/api';
import Counter from '@/components/common/Counter';
import CounterSection from '@/components/common/CounterSection';
import ContactDescription from '@/components/contact/ContactDescription/ContactDescription';
import Contact from '@/components/contact/Contact/Contact';
import PageHeader from '@/components/layout/PageHeader';

export default async function EventsPage() {
  const data = await ContactUsPageData();

  const customFields = JSON.parse(
    data.page.pages_custom_field
  );

  return (
    <>
    <PageHeader
        page_name={data.page.page_name}
        page_slug={data.page.page_slug}
        page_feature_image={data.page.page_feature_image}
      />

      <ContactDescription
        page_name={data.page.page_name}
        page_feature_image={data.page.page_feature_image}
        page_short_description={data.page.page_short_description}
        page_content={data.page.page_content}
       />

        <Contact
        site_contact_phone={data.settings.site_contact_phone}
        site_contact_email={data.settings.site_contact_email}
        site_contact_address={data.settings.site_contact_address}
        site_contact_map_link={data.settings.site_contact_map_link}
        />
       <Counter
            className='home_counter'
            poster={true}
        />
    </>
  );
}
