

import { GetSiteData } from '@/lib/api';
import Link from 'next/link';

const SiteHeader = async () => {
   const data = await GetSiteData();
   const logoPath = data.filteredSettings.site_logo
   const mediaBaseURL = process.env.NEXT_PUBLIC_MEDIA_URL
  
  return (
    <header className='nav'>
      <div className='logo'><Link href ="/">
        <img
            src={`${mediaBaseURL}${logoPath}`}
            alt="What We Do"
          />
      </Link></div>

      <nav className='menu'>
        {/* <Link href="/" >Home</Link> */}
        <Link href="/about-us" className='nav-item'>About Us</Link>
        <Link href="/legal-status" className='nav-item'>Legal Status</Link>
        <Link href="/our-project" className='nav-item'>Projects</Link>
        <Link href="/event" className='nav-item'>Events</Link>
        <Link href="/blog" className='nav-item'>Blog</Link>
        <Link href="/contact-us" className='nav-item'>Contact Us</Link>
      </nav>
    </header>
  );
};


export default SiteHeader;
