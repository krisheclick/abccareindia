

import Counter from '@/components/common/Counter';
import CounterSection from '@/components/common/CounterSection';
import TestimonialSection from '@/components/common/Testimonial';
import Donation from '@/components/donation/Donation';
import Brand from '@/components/home/Brand/Brand';
import CharitableMessage from '@/components/home/CharitableMessage/CharitableMessage';
import ChildEmpower from '@/components/home/CharitableMessage/ChildEmpower';
import HomeBanner from '@/components/home/HomeBanner/HomeBanner';
import HomeDescription from '@/components/home/HomeDescription/HomeDescription';
import HomeProject from '@/components/home/HomeProject/HomeProject';
import SuccessStory from '@/components/home/SuccessStory/SuccessStroy';
import UrgentNeeds from '@/components/home/UrgentNeeds/UrgentNeeds';
import USP from '@/components/home/Usp/Usp';
import Volunteer from '@/components/home/Volunteer/Volunteer';
import Ourreach from '@/components/our-reach/Ourreach';
import { getHomeData } from '@/lib/api';

const HomePage = async() => {
    const data = await getHomeData();

    const customFields = JSON.parse(data.pages_custom_field);
    const aboutSection = customFields.group_name['about-section'];
    const successStorySection = customFields.group_name['success-stroy-section'];
    const projectSection = customFields.group_name['project-section'];

    return (
        <>
            <HomeBanner banner={data.banner} />
            <HomeDescription aboutSection={aboutSection} />
            <USP usp={data.usp} />
            <SuccessStory
                sectionData={successStorySection}
                stories={data.success_story}
            />

            <HomeProject
                sectionData={projectSection}
                projects={data.projects}
            />

            <Volunteer
                sectionData={customFields.group_name['volunteer-section']}
            />
            <ChildEmpower
                sectionData={customFields.group_name['empower-section']}
                messages={data.charitable_message}
            />

            <UrgentNeeds
                sectionData={customFields.group_name['urgent-needs-section']}
            />
            <Ourreach
                sectionData={customFields.group_name['our-reach-section']}
                ourReachData={data.our_reach}
            />

            <Counter 
                className='home_counter'
                poster={true}
            />
            <Donation />
            <TestimonialSection
                testimonials={data.testimonial}
                customFields={customFields}
                sectionKey="testimonial-section"
                className="event-testimonials"
            />

            <Brand brands={data.donor_brand} />

        </>
    );
}

export default HomePage;