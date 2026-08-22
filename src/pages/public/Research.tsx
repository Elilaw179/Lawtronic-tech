import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import SectionHeader from '../../components/ui/SectionHeader';
import { COLLECTIONS, listDocs } from '../../firebase/firestore';
import { mockResearch } from '../../data/mockData';
import type { ResearchPublication } from '../../types';

export default function Research() {
  const [items, setItems] = useState<ResearchPublication[]>(mockResearch);

  useEffect(() => {
    listDocs<ResearchPublication>(COLLECTIONS.research)
      .then((docs) => {
        const published = docs.filter((d) => d.published);
        if (published.length) setItems(published);
      })
      .catch(() => { });
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-5 py-20 md:px-6 md:py-24">
      <SectionHeader
        eyebrow="Research & Innovation"
        title=<span className="text-blue-chrome-animated">Practical R&amp;D</span>
        description="We believe Africa should not only consume technology—we should participate in designing and building it."
      />

      <div className="mb-12 rounded-xl border border-line bg-panel2/30 p-6 max-w-3xl mx-auto animate-fade-up">
        <p className="font-mono text-xs uppercase tracking-wider text-circuit font-semibold mb-3 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-circuit tech-pulse-dot" />
          Our Core Research Areas:
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          {[
            'Robotics',
            'Artificial Intelligence',
            'Embedded Systems',
            'Electronics',
            'Automation',
            'Educational Technology',
            'Intelligent Systems',
            'Emerging Technologies',
          ].map((area) => (
            <span key={area} className="rounded-md border border-line bg-panel px-3 py-1 text-ink-dim hover:border-circuit/40 hover:text-circuit transition-colors duration-200">
              {area}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-3xl space-y-5 stagger">
        {items.map((pub) => (
          <div key={pub.id} className="tech-card card-spotlight p-7 md:p-8 relative overflow-hidden group">
            <div className="scan-line opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-signal font-semibold">
                {pub.category}
              </span>
              <span className="text-xs text-ink-muted font-mono">{pub.publishedAt}</span>
            </div>
            <h3 className="font-display text-xl font-medium text-ink group-hover:text-circuit-bright transition-colors">{pub.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-dim">{pub.abstract}</p>
            <p className="mt-4 text-xs text-ink-muted font-mono">
              Contributors: {pub.contributors?.join(', ') || '—'}
            </p>
            {pub.documentUrl ? (
              <a
                href={pub.documentUrl}
                target="_blank"
                rel="noreferrer"
                download
                className="btn-ghost mt-5 text-sm inline-flex items-center gap-2"
              >
                <Download size={14} /> Download PDF
              </a>
            ) : (
              <span className="btn-ghost mt-5 text-sm inline-flex items-center gap-2 opacity-40 cursor-not-allowed pointer-events-none select-none">
                <Download size={14} /> Document coming soon
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
