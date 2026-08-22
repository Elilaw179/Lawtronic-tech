import { useEffect, useState } from 'react';
import { Linkedin } from 'lucide-react';
import SectionHeader from '../../components/ui/SectionHeader';
import { COLLECTIONS, listDocs } from '../../firebase/firestore';
import { mockTeam } from '../../data/mockData';
import type { TeamMember } from '../../types';

/** Professional headshot card image — targeted face+shoulder crop */
function MemberPhoto({ src, name }: { src?: string; name: string }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2);

  if (!src || error) {
    return (
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-2xl border-b border-line bg-gradient-to-br from-panel2 to-panel3 select-none flex items-center justify-center">
        {/* Animated radar rings */}
        <div className="absolute h-20 w-20 rounded-full border border-circuit/10 animate-ping opacity-20" />
        <div className="absolute h-16 w-16 rounded-full border border-circuit/15" />
        <div className="absolute h-10 w-10 rounded-full border border-circuit/25" />
        <div className="scan-line" />
        {/* Initials badge */}
        <span className="relative z-10 font-display text-3xl font-bold text-circuit [text-shadow:0_0_16px_currentColor]">
          {initials}
        </span>
      </div>
    );
  }

  return (
    <div className="group/photo relative aspect-[4/3] w-full overflow-hidden rounded-t-2xl border-b border-line/60 bg-void shadow-card">
      {/* Loading skeleton */}
      {!loaded && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-panel2 animate-pulse">
          <div className="h-7 w-7 rounded-full border-2 border-circuit/30 border-t-circuit animate-spin" />
        </div>
      )}

      {/*
        THE FACE-TARGETING CROP:
        - object-fit: cover         → always fills the frame
        - object-position: 50% 15% → focuses on the upper-center
                                     (where face+shoulders sit in most photos)
        - This works for portrait, landscape, and square source images
      */}
      <img
        src={src}
        alt={name}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover/photo:scale-[1.06] ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ objectPosition: '50% 25%' }}
        loading="lazy"
      />

      {/* Bottom gradient fade — professional & tasteful */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

      {/* Subtle top vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent pointer-events-none" />

      {/* Hover scan-line effect */}
      <div className="scan-line z-10 opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Hover border glow */}
      <div className="absolute inset-0 rounded-t-2xl ring-1 ring-inset ring-circuit/0 group-hover/photo:ring-circuit/30 transition-all duration-500 pointer-events-none" />
    </div>
  );
}

export default function Team() {
  const [members, setMembers] = useState<TeamMember[]>(mockTeam);

  useEffect(() => {
    listDocs<TeamMember>(COLLECTIONS.team)
      .then((docs) => docs.length && setMembers(docs))
      .catch(() => {});
  }, []);

  const sorted = [...members].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <div className="mx-auto max-w-7xl px-5 py-20 md:px-6 md:py-24">
      <SectionHeader eyebrow="The people" title="Team" />

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 stagger">
        {sorted.map((member) => (
          <div key={member.id} className="tech-card card-spotlight group flex flex-col overflow-hidden p-0">
            {/* Professional headshot — 3:4 portrait ratio, face-targeted crop */}
            <MemberPhoto src={member.photoUrl} name={member.name} />

            {/* Info section */}
            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-display text-lg font-semibold text-ink group-hover:text-circuit-bright transition-colors duration-300">
                {member.name}
              </h3>
              <p className="mt-0.5 text-sm font-medium text-circuit flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-circuit tech-pulse-dot" />
                {member.role}
              </p>

              {member.bio && (
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-dim line-clamp-3">
                  {member.bio}
                </p>
              )}

              {(member.skills ?? []).length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {(member.skills ?? []).map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-line bg-panel2/60 px-2 py-0.5 text-[11px] font-mono text-ink-muted group-hover:border-circuit/30 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              {member.linkedinUrl && (
                <a
                  href={member.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-ink-dim transition-colors hover:text-circuit"
                >
                  <Linkedin size={13} /> View LinkedIn
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
