'use client';

interface DonationSectionProps {
  settings: {
    site_donation_heading_title: string;
    site_donation_heading_subtitle: string;
    site_donation_heading_short_desc: string;

    site_volunteer_title: string;
    site_volunteer_short_desc: string;
    site_volunteer_button_text: string;
    site_volunteer_button_url: string;

    site_donate_title: string;
    site_donate_short_desc: string;
    site_donate_button_text: string;
    site_donate_button_url: string;
  };
}

export default function DonationSection({ settings }: DonationSectionProps) {
  if (!settings) return null;

  return (
    <section className='donation-section donsec_homeft pt_100 pb_100'>
      <div className='container'> 
        <div className='row align-items-stretch g-4'>

            {/* Left Content */}
            <div className='col-lg-4'>
                <p className='smallsubhead mb-2'>{settings.site_donation_heading_title}</p> 
                <h3 className='cmn_black_heading big' dangerouslySetInnerHTML={{__html: settings.site_donation_heading_subtitle,}}/>
                <p className='mt-3'>{settings.site_donation_heading_short_desc}</p>
            </div> 

            {/* Volunteer Box */}
            <div className='col-lg-4'>
                <div className='info-box volunteer-box h-100'>
                    <h4 className='fw-bold'>{settings.site_volunteer_title}</h4>
                    <p>
                        {settings.site_volunteer_short_desc}
                    </p> 
                    <a href={settings.site_volunteer_button_url} className='btn-link'>
                      {settings.site_volunteer_button_text} <i className="fa-solid fa-arrow-right-long ms-2"></i>
                    </a>
                </div>
            </div>
            
            {/* Donate Box */}
            <div className='col-lg-4'>
                <div className='info-box donate-box h-100'>
                    <h4 className='fw-bold'>{settings.site_donate_title}</h4>
                    <p>
                        {settings.site_donate_short_desc}
                    </p> 
                    <a href={settings.site_donate_button_url} className='btn-link dark'>
                      {settings.site_donate_button_text} <i className="fa-solid fa-arrow-right-long ms-2"></i>
                    </a>
                </div>
            </div>   

        </div>
      </div>
    </section>
  );
}
