'use client'

interface ContactProps {
  site_contact_phone: string;
  site_contact_email: string;
  site_contact_address: string;
  site_contact_map_link: string;
}

export default function Contact({
  site_contact_phone,
  site_contact_email,
  site_contact_address,
  site_contact_map_link,
}: ContactProps) {
  return (
    <section className="contact-info">
      <div className="container">
        <h2>Contact Information</h2>

        {site_contact_phone && (
          <p>
            <strong>Phone:</strong>{" "}
            <a href={`tel:${site_contact_phone}`}>
              {site_contact_phone}
            </a>
          </p>
        )}

        {site_contact_email && (
          <p>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${site_contact_email}`}>
              {site_contact_email}
            </a>
          </p>
        )}

        {site_contact_address && (
          <div className="contact-address">
            <strong>Address:</strong>
            <div
              dangerouslySetInnerHTML={{
                __html: site_contact_address,
              }}
            />
          </div>
        )}

        {site_contact_map_link && (
          <p>
            <a
              href={site_contact_map_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Map
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
