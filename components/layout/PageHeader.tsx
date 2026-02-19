'use client';

import Image from 'next/image';

interface PageHeaderProps {
  page_name: string;
  page_slug?: string;
  page_feature_image?: string | null;
}

const PageHeader = ({
  page_name,
  page_slug,
  page_feature_image,
}: PageHeaderProps) => {
  return (
    <section style={styles.pageHeader}>
      {page_feature_image && (
        <div style={styles.imageWrapper}>
          <Image
            src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${page_feature_image}`}
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
  );
};

const styles = {
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
  },
  breadcrumb: {
    fontSize: '14px',
  },
  separator: {
    margin: '0 8px',
  },
};

export default PageHeader;
