'use client';

import Link from 'next/link';

interface FooterProps {
  settings?: any;
  socialMedia?: any[];
  QuickmenuLinks?: any[];
  RelativemenuLinks?: any[];
}

const Footer = ({
  settings = {},
  socialMedia = [],
  QuickmenuLinks = [],
  RelativemenuLinks = [],
}: FooterProps) => {
  return (
    <>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerGrid}>
          {/* CONTACT */}
          <div>
            <h3 style={styles.heading}>Contact Us</h3>
            <p>📞 {settings?.site_footer_phone}</p>
            <p>📧 {settings?.site_footer_email}</p>

            <div
              dangerouslySetInnerHTML={{
                __html: settings?.site_footer_address || '',
              }}
            />
          </div>

          {/* CAREER */}
          <div>
            <h3 style={styles.heading}>Career</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: settings?.site_career_with_us || '',
              }}
            />
          </div>

          {/* SOCIAL */}
          <div>
            <h3 style={styles.heading}>Follow Us</h3>

            <div style={styles.socialRow}>
              {Array.isArray(socialMedia) &&
                socialMedia.map((social, index) => (
                  <a
                    key={index}
                    href={social.site_social_link_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.socialIcon}
                  >
                    <i className={social.site_class_name}></i>
                  </a>
                ))}
            </div>
          </div>

          {/* ABOUT */}
          <div>
            <h3 style={styles.heading}>About Site</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: settings?.site_footer_design_developed_by || '',
              }}
            />
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 style={styles.heading}>Quick Links</h3>
            <ul style={styles.list}>
              {Array.isArray(QuickmenuLinks) &&
                QuickmenuLinks.map((menu) => (
                  <li key={menu.id}>
                    <Link href={`/${menu.url}`} style={styles.link}>
                      {menu.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* RELATIVE LINKS */}
          <div>
            <h3 style={styles.heading}>Relative Links</h3>
            <ul style={styles.list}>
              {Array.isArray(RelativemenuLinks) &&
                RelativemenuLinks.map((menu) => (
                  <li key={menu.id}>
                    <Link href={`/${menu.url}`} style={styles.link}>
                      {menu.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div style={styles.bottomBar}>
          {settings?.site_footer_copy_right}
        </div>
      </footer>
    </>
  );
};

const styles = {
  partnerSection: {
    marginTop: '90px',
    padding: '60px 40px',
    background: '#ffffff',
    borderRadius: '20px',
  },
  partnerTitle: {
    textAlign: 'center' as const,
    fontSize: '34px',
    marginBottom: '45px',
    color: '#003049',
  },
  partnerGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))',
    gap: '30px',
    alignItems: 'center',
  },
  partnerCard: {
    background: '#f7f9fc',
    padding: '25px',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '110px',
    boxShadow: '0 6px 18px rgba(0,0,0,0.05)',
  },
  partnerImage: {
    maxWidth: '120px',
    maxHeight: '60px',
    objectFit: 'contain' as const,
    filter: 'grayscale(100%)',
    transition: '0.3s',
  },

  footer: {
    marginTop: '100px',
    background: '#0b1d2a',
    color: '#ffffff',
    padding: '70px 40px 30px',
  },
  footerGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))',
    gap: '40px',
    marginBottom: '40px',
  },
  heading: {
    marginBottom: '20px',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  link: {
    color: '#ffffff',
    textDecoration: 'none',
    display: 'block',
    marginBottom: '8px',
  },
  socialRow: {
    display: 'flex',
    gap: '15px',
    marginTop: '10px',
  },
  socialIcon: {
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    background: '#163447',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '18px',
    textDecoration: 'none',
  },
  bottomBar: {
    borderTop: '1px solid rgba(255,255,255,0.1)',
    paddingTop: '20px',
    textAlign: 'center' as const,
    fontSize: '14px',
    opacity: 0.8,
  },
};


export default Footer;
