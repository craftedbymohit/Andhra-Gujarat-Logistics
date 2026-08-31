import { CLIENT_LOGOS } from '@/data/clientLogos';

/** Infinite marquee of client-approved logo assets. */
export default function ClientLogos({ items = CLIENT_LOGOS }) {
  return (
    <div className="marquee">
      <div className="marquee__track">
        {[...items, ...items].map((client, i) => (
          <span className="marquee__item" key={`${client.name}-${i}`}>
            <img src={client.src} alt={i < items.length ? client.name : ''} />
          </span>
        ))}
      </div>
    </div>
  );
}
