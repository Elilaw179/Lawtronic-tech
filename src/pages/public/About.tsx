import SectionHeader from '../../components/ui/SectionHeader';

const APPROACH_STEPS = [
  { step: '01', title: 'Identify', detail: 'Understand real-world challenges directly from the environment and users.' },
  { step: '02', title: 'Research', detail: 'Study the problem, users, technologies, and possible solutions in depth.' },
  { step: '03', title: 'Design', detail: 'Develop a dedicated engineering solution designed around the actual need.' },
  { step: '04', title: 'Prototype', detail: 'Build and test an initial working hardware or software system.' },
  { step: '05', title: 'Validate', detail: 'Test with real users and systematically refine the solution.' },
  { step: '06', title: 'Deploy', detail: 'Transform validated concepts into reliable commercial products and services.' },
];

const WHY_LAWTRONIC = [
  {
    title: 'African Perspective',
    detail: 'We build with the realities and challenges of African environments in mind.',
  },
  {
    title: 'Engineering-First Approach',
    detail: 'We combine hardware, software, electronics, and intelligent systems seamlessly.',
  },
  {
    title: 'Practical Innovation',
    detail: 'We focus on solving real problems rather than technology for technology’s sake.',
  },
  {
    title: 'Education + Industry',
    detail: 'We connect practical technology education directly with real-world engineering.',
  },
  {
    title: 'Scalable Vision',
    detail: 'We aim to develop solutions that can grow from local applications to international markets.',
  },
];

export default function About() {
  return (
    <div>
      {/* Hero Header */}
      <section className="grid-bg border-b border-line px-5 py-20 md:px-6 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow mb-4">About Lawtronic Technologies Ltd</p>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl text-balance">
            <span className="text-blue-chrome-animated">Engineering the Future Through Innovation</span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-ink-dim">
            Lawtronic Technologies Ltd is a Nigerian technology and deep-tech company focused on robotics, embedded systems, artificial intelligence, software engineering, technology education, research, and intelligent automation.
          </p>
        </div>
      </section>

      {/* Who We Are & Ambition */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-6 md:py-20">
        <div className="card p-8 md:p-12 bg-panel2/30 border-line">
          <p className="eyebrow mb-3">Who We Are</p>
          <p className="text-lg leading-relaxed text-ink font-medium">
            We combine engineering, software, research, and practical education to develop technology solutions that address real-world challenges.
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink-dim">
            Our long-term ambition is to develop locally relevant technologies that can compete beyond Africa while helping build the engineering talent required to support the continent&apos;s technological growth.
          </p>
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="mx-auto max-w-7xl px-5 py-8 md:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card p-8 md:p-10 border-circuit/30 bg-circuit/5">
            <p className="eyebrow mb-3 text-circuit">Our Vision</p>
            <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">
              Globally Competitive African Technology
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-dim">
              To become a leading African robotics and intelligent technology company, developing globally competitive solutions that transform education, industry, agriculture, healthcare, and everyday life.
            </p>
          </div>
          <div className="card p-8 md:p-10 border-accent/30 bg-accent/5">
            <p className="eyebrow mb-3 text-amber">Our Mission</p>
            <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">
              Empowering Innovators &amp; Simplifying Life
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-dim">
              To design, develop, and deploy innovative technologies that make life simpler, improve productivity, expand access to advanced technology, and empower the next generation of African innovators.
            </p>
          </div>
        </div>
      </section>

      <div className="circuit-divider my-16" />

      {/* OUR APPROACH: From Problem to Product */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-6 md:py-20">
        <SectionHeader
          eyebrow="Our Approach"
          title=<span className="text-blue-chrome-animated">From Problem to Product</span>
          description="We believe meaningful innovation starts with understanding the problem."
        />
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 stagger">
          {APPROACH_STEPS.map((s) => (
            <div key={s.step} className="tech-card card-spotlight p-6 relative overflow-hidden group">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-2xl font-bold text-circuit opacity-80 group-hover:opacity-100 transition-opacity">
                  {s.step}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-circuit tech-pulse-dot" />
              </div>
              <h3 className="font-display text-lg font-semibold text-ink group-hover:text-circuit-bright transition-colors">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-dim">
                {s.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="circuit-divider my-16" />

      {/* WHY LAWTRONIC? */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-6 md:py-20">
        <SectionHeader
          eyebrow="Why Choose Lawtronic?"
          title=<span className="text-blue-chrome-animated">Built for Impact and Scale</span>
          description="Five foundational principles that guide our technology development."
        />
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 stagger">
          {WHY_LAWTRONIC.map((w) => (
            <div key={w.title} className="tech-card card-spotlight p-6 group">
              <h3 className="font-display text-lg font-semibold text-ink group-hover:text-circuit-bright transition-colors">{w.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-dim">{w.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
