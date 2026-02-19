'use client';

interface CounterItem {
  site_counter_number: string; 
  site_counter_title: string;
}

interface CounterSectionProps {
  counterMedia: string; 
  className?: string; 
}

export default function CounterSection({
  counterMedia,
  className = 'counter-section',
}: CounterSectionProps) {
  if (!counterMedia) return null;

  let counters: CounterItem[] = [];

  try {
    counters = JSON.parse(counterMedia);
  } catch (error) {
    console.error('Failed to parse counter media JSON:', error);
  }

  if (counters.length === 0) return null;

  return (
    <section className={className}>
      <div className="counter-container">
        <div className="counter-list">
          {counters.map((counter, index) => (
            <div className="counter-item" key={index}>
              <h3 className="counter-number">{counter.site_counter_number}</h3>
              <p className="counter-title">{counter.site_counter_title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
