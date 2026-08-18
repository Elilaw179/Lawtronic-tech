import { useEffect, useState } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import SectionHeader from '../../components/ui/SectionHeader';
import { COLLECTIONS, listDocs } from '../../firebase/firestore';
import { mockEvents } from '../../data/mockData';
import type { CommunityEvent } from '../../types';

export default function Community() {
  const [events, setEvents] = useState<CommunityEvent[]>(mockEvents);

  useEffect(() => {
    listDocs<CommunityEvent>(COLLECTIONS.events)
      .then((docs) => docs.length && setEvents(docs))
      .catch(() => {});
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-5 py-20 md:px-6 md:py-24">
      <SectionHeader
        eyebrow="Community"
        title="Events, workshops & volunteering"
        description="Every open way to build alongside us."
      />

      <div className="grid gap-5 sm:grid-cols-2">
        {events.map((event) => (
          <div key={event.id} className="card-interactive p-6">
            <span className="font-mono text-[10px] uppercase tracking-wider text-circuit">
              {event.type}
            </span>
            <h3 className="mt-2 font-display text-lg font-medium text-ink">{event.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-dim">{event.description}</p>
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-ink-muted">
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={13} /> {event.date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={13} /> {event.location}
              </span>
            </div>
            <button className="btn-primary mt-5 text-sm" disabled={!event.registrationOpen}>
              {event.registrationOpen
                ? `Register (${event.registeredCount} joined)`
                : 'Registration closed'}
            </button>
          </div>
        ))}
      </div>

      <div className="circuit-divider my-16" />

      <div className="mx-auto max-w-4xl text-center">
        <p className="eyebrow mb-3">Partnerships &amp; Collaboration</p>
        <h3 className="font-display text-2xl font-bold text-ink sm:text-3xl">
          Let&apos;s Build Together
        </h3>
        <p className="mt-3 text-base leading-relaxed text-ink-dim max-w-2xl mx-auto">
          Lawtronic welcomes collaboration with universities, schools, research institutions, technology companies, government organizations, startups, manufacturers, investors, innovation hubs, and international organizations.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-2 text-xs">
          {[
            'Universities',
            'STEM Schools',
            'Research Institutions',
            'Tech Companies',
            'Government Orgs',
            'Startups',
            'Manufacturers',
            'Investors',
            'Innovation Hubs',
            'International Orgs',
          ].map((partner) => (
            <span key={partner} className="rounded-full border border-circuit/30 bg-circuit/5 px-3 py-1 text-circuit font-medium">
              {partner}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
