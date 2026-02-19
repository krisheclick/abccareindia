'use client';

interface RecognitionAward {
  recognition_award_id: number;
  recognition_award_description: string;
  recognition_award_feature_image?: string | null;
}

interface LegalStatusProps {
  awards: RecognitionAward[];
}

const mediaBaseURL = process.env.NEXT_PUBLIC_MEDIA_URL

export default function LegalStatus({ awards }: LegalStatusProps) {
  if (!awards || awards.length === 0) return null;

  return (
    <section className="legal-status-section">
      <div className="container">
        <div className="legal-status-list">
          {awards.map((award) => (
            <div
              className="legal-status-card"
              key={award.recognition_award_id}
            >
              {award.recognition_award_feature_image && (
                <div className="award-image">
                  <img
                    src={`${mediaBaseURL}${award.recognition_award_feature_image}`}
                    alt="Recognition Award"
                  />
                </div>
              )}

              {award.recognition_award_description && (
                <div
                  className="award-description"
                  dangerouslySetInnerHTML={{
                    __html: award.recognition_award_description,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
