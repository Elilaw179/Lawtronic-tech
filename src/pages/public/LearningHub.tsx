import { useEffect, useState } from 'react';
import SectionHeader from '../../components/ui/SectionHeader';
import SmartImage from '../../components/ui/SmartImage';
import { COLLECTIONS, listDocs } from '../../firebase/firestore';
import { mockCourses } from '../../data/mockData';
import type { Course } from '../../types';

const TRACKS: Course['track'][] = ['Robotics', 'AI', 'Programming', 'Electronics'];

export default function LearningHub() {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [track, setTrack] = useState<Course['track'] | 'All'>('All');

  useEffect(() => {
    listDocs<Course>(COLLECTIONS.courses)
      .then((docs) => {
        const published = docs.filter((c) => c.published);
        if (published.length) setCourses(published);
      })
      .catch(() => {});
  }, []);

  const filtered = courses.filter((c) => track === 'All' || c.track === track);

  return (
    <div className="mx-auto max-w-7xl px-5 py-20 md:px-6 md:py-24">
      <SectionHeader
        eyebrow="Technology Education"
        title=<span className="text-blue-chrome-animated">Building the Next Generation of African Innovators</span>
        description="We organize practical learning experiences where participants learn by building, testing, troubleshooting, and solving problems."
      />

      <div className="mb-10 rounded-xl border border-line bg-panel2/30 p-6 max-w-4xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-wider text-circuit font-semibold mb-3">Our Practical Training Areas:</p>
        <div className="flex flex-wrap gap-2 text-xs">
          {[
            'Robotics',
            'Embedded Systems',
            'Electronics',
            'Artificial Intelligence',
            'Software Engineering',
            'Programming',
            'STEM',
            'Engineering Thinking',
            'Innovation & Product Development',
            'Bootcamps & Workshops',
          ].map((area) => (
            <span key={area} className="rounded-md border border-line bg-panel px-3 py-1 text-ink-dim font-medium">
              {area}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-10 flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setTrack('All')}
          className={`rounded-lg border px-4 py-1.5 text-sm transition-colors ${
            track === 'All'
              ? 'border-circuit/50 bg-circuit/5 text-circuit'
              : 'border-line text-ink-dim hover:border-line-bright'
          }`}
        >
          All tracks
        </button>
        {TRACKS.map((t) => (
          <button
            key={t}
            onClick={() => setTrack(t)}
            className={`rounded-lg border px-4 py-1.5 text-sm transition-colors ${
              track === t
                ? 'border-circuit/50 bg-circuit/5 text-circuit'
                : 'border-line text-ink-dim hover:border-line-bright'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 stagger">
        {filtered.map((course) => (
          <div key={course.id} className="tech-card card-spotlight group flex flex-col overflow-hidden p-0">
            {/* Course image if provided */}
            {course.coverImage ? (
              <SmartImage
                src={course.coverImage}
                alt={course.title}
                className="aspect-[16/10] w-full"
                fit="cover"
              />
            ) : (
              <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-line bg-panel2/40 flex items-center justify-center">
                <div className="absolute h-16 w-16 rounded-full border border-circuit/15 animate-ping opacity-20" />
                <span className="font-mono text-xs uppercase tracking-wider text-circuit font-semibold">
                  {course.track} Module
                </span>
              </div>
            )}
            <div className="flex flex-1 flex-col p-6">
              <div className="mb-3 flex items-center justify-between gap-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-circuit font-semibold flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-circuit tech-pulse-dot" />
                  {course.track}
                </span>
                <span className="rounded-md border border-line bg-panel px-2 py-0.5 text-[11px] font-mono text-ink-muted">{course.level}</span>
              </div>
              <h3 className="font-display text-lg font-semibold text-ink group-hover:text-circuit-bright transition-colors duration-300">{course.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-dim">{course.description}</p>
              <div className="mt-4 pt-3 border-t border-line/50 flex items-center justify-between">
                <span className="text-xs text-ink-muted font-mono">
                  {(course.lessons?.length ?? 0)} lessons
                </span>
                <span className="text-xs font-semibold text-circuit group-hover:text-circuit-bright transition-colors flex items-center gap-1">
                  Explore →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-xl border border-dashed border-line p-8 text-center">
        <p className="eyebrow mb-2">Coming soon</p>
        <p className="text-ink-dim">Certifications for completed learning paths.</p>
      </div>
    </div>
  );
}
