import { useEffect, useState } from 'react';
import SectionHeader from '../../components/ui/SectionHeader';
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

      <div className="grid gap-5 sm:grid-cols-2">
        {filtered.map((course) => (
          <div key={course.id} className="card-interactive p-6">
            <div className="mb-3 flex items-center justify-between gap-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-circuit">
                {course.track}
              </span>
              <span className="text-xs text-ink-muted">{course.level}</span>
            </div>
            <h3 className="font-display text-lg font-medium text-ink">{course.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-dim">{course.description}</p>
            <p className="mt-4 text-xs text-ink-muted">
              {(course.lessons?.length ?? 0)} lessons
            </p>
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
