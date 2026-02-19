'use client';

import Image from 'next/image';
import Link from 'next/link';

interface EmpowerSectionData {
  empower_title?: string;
  empower_description?: string;
  empower_button_text?: string;
  empower_button_url?: string;
}

interface CharitableMessageItem {
  charitable_msg_title: string;
  charity_msg_slug: string;
  charity_msg_description: string;
  charitable_msg_file_link?: string;
  charitable_msg_button_data: string;
}

interface CharitableMessageProps {
  sectionData: EmpowerSectionData;
  messages: CharitableMessageItem[];
}

const mediaBaseURL = process.env.NEXT_PUBLIC_MEDIA_URL;

export default function CharitableMessage({
  sectionData,
  messages,
}: CharitableMessageProps) {
  if (!sectionData || !messages || messages.length === 0) return null;

  return (
    <section className="charitable-message-section">
      <div className="container">

        {/* SECTION HEADER */}
        <div className="charitable-header">
          <div className="charitable-header-left">
            <h2>{sectionData.empower_title}</h2>

            <div
              className="charitable-description"
              dangerouslySetInnerHTML={{  
                __html: sectionData.empower_description || '',
              }}
            />
          </div>

              <div>
          {sectionData.empower_button_text && (
            <div className="charitable-cta">
              <Link
                href={sectionData.empower_button_url || '#'}
                className="btn-primary"
              >
                {sectionData.empower_button_text}
              </Link>
            </div>
          )}
          </div>
        </div>


        {/* MESSAGE GRID */}
        <div className="charitable-grid">
          {messages.map((item, index) => (
            <div key={index} className="charitable-card">
              {item.charitable_msg_file_link && (
                <Image
                  src={`${mediaBaseURL}${item.charitable_msg_file_link}`}
                  alt={item.charitable_msg_title}
                  width={400}
                  height={260}
                  style={{ objectFit: 'cover' }}
                />
              )}

              <div className="charitable-content">
                <h3>{item.charitable_msg_title}</h3>

                {/* <div
                  dangerouslySetInnerHTML={{
                    __html: item.charity_msg_description,
                  }}
                /> */}

                <Link
                  href={JSON.parse(item.charitable_msg_button_data).url}
                  className="read-more"
                >
                  {JSON.parse(item.charitable_msg_button_data).text}
                </Link>
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
}
