'use client';

import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
  page_name?: string;
  page_slug?: string;
  page_feature_image?: string | null;
}

const mediaBaseURL = process.env.NEXT_PUBLIC_MEDIA_URL

const Header = ({
  page_name,
  page_slug,
  page_feature_image,
}: HeaderProps) => {
  return (
    <>
     
      <header style={styles.header}>
        <div style={styles.logo}>MyWebsite</div> 
        <nav>
          <Link href="/" style={styles.link}>Home</Link>
          <Link href="/about-us" style={styles.link}>About Us</Link>
          <Link href="/legal-status" style={styles.link}>Legal Status</Link>
          <Link href="/our-project" style={styles.link}>Projects</Link>
          <Link href="/event" style={styles.link}>Events</Link>
          <Link href="/contact-us" style={styles.link}>Contact Us</Link>
        </nav>
      </header>

     
      {page_name && (
        <section style={styles.pageHeader}>
          {page_feature_image && (
            <div style={styles.imageWrapper}>
              <Image
                src={`${mediaBaseURL}${page_feature_image}`}
                alt={page_name}
                fill
                priority
                style={{ objectFit: 'cover' }}
              />
            </div>
          )}

          <div style={styles.overlay}>
            <h1 style={styles.pageTitle}>{page_name}</h1>

            {page_slug && (
              <div style={styles.breadcrumb}>
                <span>Home</span>
                <span style={styles.separator}>/</span>
                <span>{page_name}</span>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

const styles = {
  
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 40px',
    background: '#111',
    color: '#fff',
  },
  logo: {
    fontSize: '22px',
    fontWeight: 'bold',
  },
  link: {
    marginLeft: '20px',
    color: '#fff',
    textDecoration: 'none',
  },

 
  pageHeader: {
    position: 'relative' as const,
    height: '300px',
    width: '100%',
  },
  imageWrapper: {
    position: 'absolute' as const,
    inset: 0,
  },
  overlay: {
    position: 'relative' as const,
    zIndex: 2,
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(0,0,0,0.55)',
    color: '#fff',
    textAlign: 'center' as const,
  },
  pageTitle: {
    fontSize: '40px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  breadcrumb: {
    fontSize: '14px',
    opacity: 0.9,
  },
  separator: {
    margin: '0 8px',
  },
};

export default Header;
