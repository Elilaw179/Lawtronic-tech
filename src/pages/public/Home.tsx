import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Cpu, Bot, CircuitBoard, GraduationCap,
  FlaskConical, Zap, ChevronRight, Sparkles,
} from 'lucide-react';
import SectionHeader from '../../components/ui/SectionHeader';
import StatusBadge from '../../components/ui/StatusBadge';
import { COLLECTIONS, listDocs } from '../../firebase/firestore';
import { mockProjects, mockPosts } from '../../data/mockData';
import type { Project, Post } from '../../types';

/* ─── Data ──────────────────────────────────────────────────────────── */

const FOCUS_AREAS = [
  { label: 'Robotics',                detail: 'Field-deployable autonomous systems',          icon: Bot,           color: 'from-blue-500/20 to-cyan-500/10',   iconColor: 'text-cyan-400'   },
  { label: 'Artificial Intelligence', detail: 'Applied models for real constraints',           icon: Cpu,           color: 'from-violet-500/20 to-blue-500/10', iconColor: 'text-violet-400' },
  { label: 'Electronics',             detail: 'Custom boards, sensors, and firmware',          icon: CircuitBoard,  color: 'from-sky-500/20 to-indigo-500/10',  iconColor: 'text-sky-400'    },
  { label: 'Automation',              detail: 'Industrial and infrastructure systems',          icon: Zap,           color: 'from-amber-500/20 to-orange-500/10',iconColor: 'text-amber-400'  },
  { label: 'STEM Education',          detail: 'Curriculum and kits for classrooms',            icon: GraduationCap, color: 'from-emerald-500/20 to-teal-500/10',iconColor: 'text-emerald-400'},
  { label: 'Research & Development',  detail: 'Published, peer-referenced work',               icon: FlaskConical,  color: 'from-rose-500/20 to-pink-500/10',   iconColor: 'text-rose-400'   },
];

const IMPACT_STATS = [
  { value: '12+', label: 'Active Projects',        delay: '0ms'   },
  { value: '30+', label: 'Learners Trained',       delay: '120ms' },
  { value: '8',   label: 'Research Papers',        delay: '240ms' },
  { value: '5',   label: 'Partner Institutions',   delay: '360ms' },
];

/* ─── Floating Particle ─────────────────────────────────────────────── */
function Particle({ style }: { style: React.CSSProperties }) {
  return (
    <div
      className="particle absolute rounded-full bg-circuit/30 pointer-events-none"
      style={style}
    />
  );
}

/* ─── Hero Visual ────────────────────────────────────────────────────── */
function HeroCircuit() {
  return (
    <div className="relative h-[270px] w-[270px] sm:h-[340px] sm:w-[340px] md:h-[460px] md:w-[460px] flex items-center justify-center pointer-events-none select-none">

      {/* Outer ambient glow blob */}
      <div className="absolute h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-circuit/8 blur-[80px] animate-pulse" />

      {/* Pulsing ring halo — outermost */}
      <div className="absolute h-[310px] w-[310px] sm:h-[380px] sm:w-[380px] md:h-[440px] md:w-[440px] rounded-full border border-circuit/8 animate-[spin_90s_linear_infinite]" />

      {/* Secondary dashed ring */}
      <div className="absolute h-[260px] w-[260px] sm:h-[330px] sm:w-[330px] md:h-[390px] md:w-[390px] rounded-full border border-dashed border-circuit/15 animate-[spin_60s_linear_infinite_reverse]" />

      {/* Third solid ring */}
      <div className="absolute h-[210px] w-[210px] sm:h-[270px] sm:w-[270px] md:h-[330px] md:w-[330px] rounded-full border border-circuit/10 animate-[spin_40s_linear_infinite]" />

      {/* Pulse ring grow */}
      <div className="absolute h-32 w-32 sm:h-44 sm:w-44 rounded-full border border-circuit/20 animate-pulse-ring" />

      {/* Corner cyber brackets */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-circuit/30 rounded-tl-sm" />
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-circuit/30 rounded-tr-sm" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-circuit/30 rounded-bl-sm" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-circuit/30 rounded-br-sm" />

      {/* Floating particles */}
      <Particle style={{ width: 5, height: 5, top: '15%', left: '10%', '--particle-dur': '7s', '--particle-delay': '0s' } as React.CSSProperties} />
      <Particle style={{ width: 4, height: 4, top: '70%', left: '15%', '--particle-dur': '5s', '--particle-delay': '1s' } as React.CSSProperties} />
      <Particle style={{ width: 6, height: 6, top: '25%', right: '8%', '--particle-dur': '9s', '--particle-delay': '2s' } as React.CSSProperties} />
      <Particle style={{ width: 3, height: 3, bottom: '20%', right: '14%', '--particle-dur': '6s', '--particle-delay': '0.5s' } as React.CSSProperties} />
      <Particle style={{ width: 5, height: 5, top: '50%', left: '5%', '--particle-dur': '8s', '--particle-delay': '1.5s' } as React.CSSProperties} />

      {/* Main SVG emblem */}
      <div className="absolute inset-0 rounded-full bg-logo-glow blur-2xl opacity-40 scale-75" />
      <svg
        className="relative h-[230px] w-[230px] sm:h-[300px] sm:w-[300px] md:h-[380px] md:w-[380px] animate-float"
        viewBox="0 0 420 420"
        fill="none"
        aria-hidden
      >
        {/* Main circle */}
        <circle cx="210" cy="210" r="155" stroke="url(#ringGrad)" strokeWidth="1.5" strokeDasharray="974" className="animate-draw-ring" opacity="0.65" />

        {/* Inner circle */}
        <circle cx="210" cy="210" r="100" stroke="url(#ringGrad2)" strokeWidth="1" strokeDasharray="628" className="animate-draw-ring" opacity="0.3" style={{ animationDelay: '0.3s' }} />

        {/* Arc traces */}
        <path d="M75 210 A135 135 0 0 1 210 75" stroke="#1A9FFF" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="424" className="animate-trace" opacity="0.9" />
        <path d="M345 210 A135 135 0 0 1 210 345" stroke="#C5CDD8" strokeWidth="2" strokeLinecap="round" strokeDasharray="424" className="animate-trace" style={{ animationDelay: '0.35s' }} opacity="0.45" />

        {/* Circuit traces — left side */}
        <path d="M25 175 L90 175 L115 155 L160 155" stroke="#1A9FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="210" className="animate-trace" style={{ animationDelay: '0.15s' }} />
        <path d="M25 210 L95 210 L120 230 L165 230" stroke="#4DB8FF" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="210" className="animate-trace" style={{ animationDelay: '0.30s' }} />
        <path d="M25 245 L80 245 L105 265 L148 265" stroke="#1A9FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="185" className="animate-trace" style={{ animationDelay: '0.45s' }} opacity="0.65" />

        {/* Circuit traces — right side */}
        <path d="M395 175 L330 175 L305 155 L260 155" stroke="#2DD4BF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="190" className="animate-trace" style={{ animationDelay: '0.55s' }} opacity="0.6" />
        <path d="M395 245 L325 245 L300 265 L258 265" stroke="#2DD4BF" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="190" className="animate-trace" style={{ animationDelay: '0.70s' }} opacity="0.45" />

        {/* Node dots */}
        {[
          [25, 175], [90, 175], [160, 155],
          [25, 210], [95, 210], [165, 230],
          [25, 245], [148, 265],
          [330, 175], [260, 155],
          [325, 245], [258, 265],
        ].map(([cx, cy], i) => (
          <circle
            key={`${cx}-${cy}`}
            cx={cx} cy={cy} r="4"
            fill={i % 3 === 2 ? '#2DD4BF' : '#1A9FFF'}
            className="animate-glow"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}

        {/* Central LT text */}
        <text x="210" y="228" textAnchor="middle" fill="url(#ltGrad)" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="78" opacity="0.92">LT</text>

        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#1A9FFF" />
            <stop offset="50%"  stopColor="#4DB8FF" />
            <stop offset="100%" stopColor="#C5CDD8" />
          </linearGradient>
          <linearGradient id="ringGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#2DD4BF" />
            <stop offset="100%" stopColor="#1A9FFF" />
          </linearGradient>
          <linearGradient id="ltGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#1A9FFF" />
            <stop offset="55%"  stopColor="#4DB8FF" />
            <stop offset="100%" stopColor="#C5CDD8" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ─── Home Page ─────────────────────────────────────────────────────── */
export default function Home() {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [posts,    setPosts]    = useState<Post[]>(mockPosts);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    listDocs<Project>(COLLECTIONS.projects)
      .then((docs) => docs.length && setProjects(docs))
      .catch(() => {});
    listDocs<Post>(COLLECTIONS.posts)
      .then((docs) => docs.length && setPosts(docs.filter((p) => p.published)))
      .catch(() => {});
  }, []);

  // Intersection observer — trigger stat reveal animation once
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const featured    = projects.filter((p) => p.featured).slice(0, 3);
  const latestPosts = posts.slice(0, 3);

  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="grid-bg relative overflow-hidden border-b border-line">
        {/* Multi-layer glow backdrop */}
        <div className="pointer-events-none absolute inset-0 bg-hero-glow" />
        <div className="pointer-events-none absolute inset-0 hero-gradient-bg opacity-40" />
        {/* Top accent line */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-circuit/50 to-transparent" />

        {/* Floating ambient blobs */}
        <div className="pointer-events-none absolute -left-32 top-20 h-64 w-64 rounded-full bg-circuit/5 blur-[100px] animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="pointer-events-none absolute -right-20 bottom-10 h-48 w-48 rounded-full bg-signal/5 blur-[80px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:py-28 md:py-36 md:px-6">
          <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-16">

            {/* ── Text side ── */}
            <div className="flex-1 text-center lg:text-left">

              {/* Animated location badge */}
              <div
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-circuit/25 badge-shimmer px-4 py-1.5 animate-fade-up"
                style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-circuit opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-circuit" />
                </span>
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-circuit">
                  Lawtronic Technologies Ltd — Port Harcourt, Nigeria
                </span>
              </div>

              <h1
                className="font-display text-3xl font-bold leading-[1.06] tracking-tight text-ink animate-fade-up sm:text-4xl md:text-5xl lg:text-[3.5rem]"
                style={{ animationDelay: '120ms', animationFillMode: 'forwards' }}
              >
                We engineer{' '}
                <span className="text-blue-chrome-animated">
                  robotics, AI &amp; automation
                </span>{' '}
                <br className="hidden md:block" />
                <span className="text-ink/80">systems Africa builds on next.</span>
              </h1>

              <p
                className="mt-6 text-base leading-relaxed text-ink-dim animate-fade-up sm:text-lg md:max-w-xl mx-auto lg:mx-0"
                style={{ animationDelay: '240ms', animationFillMode: 'forwards' }}
              >
                We research real-world problems and ship working hardware and software — while
                training the innovators who&apos;ll take it further.
              </p>

              {/* CTA buttons */}
              <div
                className="mt-9 flex flex-col sm:flex-row justify-center gap-3 animate-fade-up lg:justify-start"
                style={{ animationDelay: '360ms', animationFillMode: 'forwards' }}
              >
                <Link
                  to="/projects"
                  className="group btn-primary relative overflow-hidden w-full sm:w-auto text-base px-6 py-3"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    See our projects <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  {/* Shine sweep */}
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </Link>
                <Link to="/contact" className="btn-ghost w-full sm:w-auto text-base px-6 py-3">
                  Propose a collaboration
                </Link>
              </div>

              {/* Trust micro-badges */}
              <div
                className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3 animate-fade-up"
                style={{ animationDelay: '480ms', animationFillMode: 'forwards' }}
              >
                {['12+ Active Projects', '5 Partner Institutions', 'Open Research'].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 rounded-md border border-line/60 bg-panel/60 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-muted backdrop-blur-sm"
                  >
                    <Sparkles size={9} className="text-circuit" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Circuit visual ── */}
            <div
              className="flex shrink-0 items-center justify-center animate-slide-right"
              style={{ animationDelay: '300ms', animationFillMode: 'both' }}
            >
              <HeroCircuit />
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-void to-transparent" />
      </section>

      {/* ── IMPACT STATS ─────────────────────────────────────────── */}
      <section ref={statsRef} className="relative border-b border-line py-10 md:py-16">
        {/* Gradient fill */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-panel/20 via-panel/5 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-5 md:px-6">
          <div className="relative overflow-hidden rounded-2xl border border-line/80 bg-panel2/40 p-8 md:p-12 backdrop-blur-lg">

            {/* Decorative top line sweep */}
            <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-circuit/50 to-transparent animate-shimmer" />
            {/* Decorative bottom line */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-signal/30 to-transparent" />
            {/* BG grid */}
            <div className="absolute inset-0 bg-grid-bg opacity-[0.06] pointer-events-none" />
            {/* Corner accents */}
            <div className="absolute top-3 left-3 w-8 h-8 border-t border-l border-circuit/20 rounded-tl-sm" />
            <div className="absolute top-3 right-3 w-8 h-8 border-t border-r border-circuit/20 rounded-tr-sm" />
            <div className="absolute bottom-3 left-3 w-8 h-8 border-b border-l border-circuit/20 rounded-bl-sm" />
            <div className="absolute bottom-3 right-3 w-8 h-8 border-b border-r border-circuit/20 rounded-br-sm" />

            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 relative z-10">
              {IMPACT_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className={`text-center group ${statsVisible ? 'stat-reveal' : 'opacity-0'}`}
                  style={{ animationDelay: stat.delay }}
                >
                  {/* Glow pulse dot */}
                  <div className="relative mx-auto mb-3 flex h-8 w-8 items-center justify-center">
                    <span className="absolute h-8 w-8 rounded-full bg-circuit/10 animate-pulse-ring" />
                    <span className="relative h-2 w-2 rounded-full bg-circuit" />
                  </div>

                  <p className="font-display text-4xl font-extrabold text-circuit sm:text-5xl tracking-tight transition-all duration-300 group-hover:scale-105 group-hover:text-circuit-bright">
                    {stat.value}
                  </p>
                  <div className="mt-2 mx-auto w-10 h-[2px] rounded-full bg-circuit/30 group-hover:bg-circuit/70 transition-colors duration-300 group-hover:w-16" />
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-ink-muted sm:text-xs">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION ──────────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-7xl px-5 py-20 md:px-6 md:py-28">
        {/* Decorative vertical circuit trace */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-line/60 to-transparent hidden md:block" />

        <div className="grid gap-12 md:grid-cols-2 md:gap-20 items-center">
          <div>
            <p className="eyebrow mb-4">Our mission</p>
            <h2 className="font-display text-3xl font-bold leading-tight text-ink md:text-4xl">
              <span className="text-blue-chrome-animated">Research real problems.</span>
              <br />
              <span className="text-ink/70">Ship real solutions.</span>
              <br />
              <span className="text-blue-chrome-animated">Train the next builders.</span>
            </h2>
          </div>
          <div className="relative">
            {/* Quote-style card */}
            <div className="card-border-sweep card-spotlight relative rounded-2xl border border-line/70 bg-panel/60 p-8 backdrop-blur-md">
              <div className="absolute -top-3 left-8 font-display text-6xl text-circuit/20 leading-none select-none">&ldquo;</div>
              <p className="relative text-base leading-relaxed text-ink-dim sm:text-lg">
                We work across robotics, artificial intelligence, software, electronics, and
                automation — researching real-world problems across Africa and beyond, developing
                innovative solutions, and empowering the next generation of innovators through
                hands-on STEM education.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <img src="/logo.jpg" alt="" className="h-9 w-9 rounded-full object-cover shadow-glow-sm animate-wobble" />
                <div>
                  <p className="font-display text-sm font-semibold text-ink">Lawtronic Technologies</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">Port Harcourt, Nigeria</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="circuit-divider" />

      {/* ── FOCUS AREAS ──────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-6 md:py-24">
        <SectionHeader
          eyebrow="Technology focus"
          title={<span className="text-blue-chrome-animated">Where we build</span>}
          description="Six connected disciplines, one systems approach."
        />
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 stagger">
          {FOCUS_AREAS.map((area) => {
            const Icon = area.icon;
            return (
              <div
                key={area.label}
                className="card-border-sweep card-spotlight group relative overflow-hidden rounded-2xl border border-line/70 bg-panel/50 p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-circuit/40"
              >
                {/* Gradient bg */}
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${area.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

                {/* Corner tech bracket */}
                <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-circuit/15 group-hover:border-circuit/40 transition-colors duration-300" />

                {/* Icon with glow */}
                <div className={`relative mb-5 flex h-13 w-13 items-center justify-center rounded-xl bg-panel2 border border-line transition-all duration-300 group-hover:border-circuit/30 group-hover:shadow-glow-sm icon-glow-pulse`}
                  style={{ height: 52, width: 52 }}>
                  <Icon
                    size={22}
                    strokeWidth={1.75}
                    className={`${area.iconColor} transition-transform duration-300 group-hover:scale-115`}
                    style={{ transform: undefined }}
                  />
                </div>

                <h3 className="relative font-display text-base font-semibold text-ink sm:text-lg group-hover:text-circuit-bright transition-colors duration-300">
                  {area.label}
                </h3>
                <p className="relative mt-2 text-sm text-ink-dim leading-relaxed">{area.detail}</p>

                {/* Arrow indicator */}
                <div className="relative mt-4 flex items-center gap-1 text-xs font-medium text-circuit opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <span>Explore</span>
                  <ArrowRight size={12} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="circuit-divider" />

      {/* ── FEATURED PROJECTS ────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-6 md:py-24">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-2">Featured work</p>
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
              <span className="text-blue-chrome-animated">Projects in motion</span>
            </h2>
          </div>
          <Link
            to="/projects"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-circuit hover:text-circuit-bright transition-colors"
          >
            View all <ChevronRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 stagger">
          {featured.map((project, idx) => (
            <Link
              key={project.id}
              to={`/projects/${project.slug}`}
              className="card-border-sweep card-spotlight group relative flex flex-col overflow-hidden rounded-2xl border border-line/70 bg-panel/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-circuit/40 p-0"
            >
              {/* Index number badge */}
              <span className="absolute top-4 left-4 z-10 font-mono text-[10px] font-bold text-ink-muted bg-panel/80 border border-line/60 rounded px-1.5 py-0.5 backdrop-blur-sm">
                {String(idx + 1).padStart(2, '0')}
              </span>

              {project.coverImage ? (
                <div className="aspect-[16/10] overflow-hidden relative border-b border-line/50 bg-void">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-panel via-panel/20 to-transparent" />
                  <div className="absolute inset-0 bg-circuit/0 group-hover:bg-circuit/5 transition-colors duration-500" />
                  {/* Scan line */}
                  <div className="scan-line opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
                </div>
              ) : (
                <div className="aspect-[16/10] flex items-center justify-center border-b border-line/50 bg-panel2/60 relative overflow-hidden">
                  <div className="absolute inset-0 bg-grid-bg opacity-20" />
                  <div className="absolute inset-0 bg-gradient-to-br from-circuit/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="font-display text-3xl font-extrabold text-circuit/20 relative z-10 group-hover:text-circuit/30 transition-colors duration-300">LT</span>
                </div>
              )}

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="mb-3.5 flex items-center justify-between gap-2">
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-circuit font-semibold bg-circuit/10 px-2.5 py-1 rounded-md border border-circuit/10">
                      {project.category}
                    </span>
                    <StatusBadge status={project.status} />
                  </div>
                  <h3 className="font-display text-base font-semibold text-ink transition-colors group-hover:text-circuit-bright sm:text-lg line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-ink-dim line-clamp-2">{project.summary}</p>
                </div>
                <div className="mt-5 pt-4 border-t border-line/40 flex items-center justify-between text-xs font-semibold text-circuit group-hover:text-circuit-bright transition-colors">
                  <span>View project detail</span>
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="circuit-divider" />

      {/* ── BLOG + COMMUNITY ─────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-6 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">

          {/* Blog */}
          <div>
            <p className="eyebrow mb-6">Latest from the blog</p>
            <div className="space-y-3">
              {latestPosts.map((post, i) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group card-border-sweep flex flex-col gap-2 rounded-xl border border-line/60 bg-panel/40 px-5 py-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-circuit/35 hover:bg-panel2/50"
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-circuit font-semibold bg-circuit/10 px-2 py-0.5 rounded border border-circuit/10">
                      {post.type}
                    </span>
                    {post.publishedAt && (
                      <span className="font-mono text-[9px] text-ink-muted">{post.publishedAt}</span>
                    )}
                  </div>
                  <h3 className="font-display text-sm font-semibold text-ink transition-colors group-hover:text-circuit-bright sm:text-base line-clamp-1">
                    {post.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-ink-dim line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-1 text-xs font-medium text-circuit opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-y-1 group-hover:translate-y-0">
                    Read more <ArrowRight size={11} />
                  </div>
                </Link>
              ))}
              <div className="pt-1">
                <Link to="/blog" className="group inline-flex items-center gap-1 text-sm font-medium text-circuit hover:text-circuit-bright transition-colors">
                  All posts <ChevronRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Community */}
          <div>
            <p className="eyebrow mb-6">Community</p>
            <div className="card-border-sweep card-spotlight relative overflow-hidden rounded-2xl border border-line/70 bg-panel/50 p-7 sm:p-9 backdrop-blur-md h-full flex flex-col justify-between">
              {/* Ambient glow orbs */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-circuit/8 blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
              <div className="pointer-events-none absolute -left-6 bottom-6 h-28 w-28 rounded-full bg-signal/6 blur-2xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />

              {/* Corner bracket */}
              <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-circuit/15" />

              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-panel2">
                  <Sparkles size={20} className="text-circuit animate-glow" />
                </div>
                <h3 className="font-display text-xl font-semibold text-ink mb-3">Get involved</h3>
                <p className="relative text-sm leading-relaxed text-ink-dim sm:text-base">
                  Join workshops, volunteer as a mentor, or collaborate on an active project — our
                  community page tracks every open way to get involved.
                </p>
              </div>

              <Link to="/community" className="btn-ghost relative mt-6 text-sm inline-flex group w-full justify-center sm:w-auto">
                Explore the community <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-line">
        {/* Rich layered background */}
        <div className="pointer-events-none absolute inset-0 bg-panel" />
        <div className="pointer-events-none absolute inset-0 bg-hero-glow opacity-70" />
        <div className="pointer-events-none absolute inset-0 hero-gradient-bg opacity-30" />
        <div className="pointer-events-none absolute inset-0 bg-grid-bg opacity-[0.04]" />

        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -left-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-circuit/8 blur-[80px] animate-pulse" style={{ animationDuration: '5s' }} />
        <div className="pointer-events-none absolute -right-16 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-signal/6 blur-[60px] animate-pulse" style={{ animationDuration: '7s', animationDelay: '1.5s' }} />

        {/* Top/bottom lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-circuit/40 to-transparent animate-shimmer" />

        <div className="relative mx-auto max-w-5xl px-5 py-20 text-center md:px-6 md:py-28">
          {/* Floating logo with pulse rings */}
          <div className="relative mx-auto mb-8 h-20 w-20">
            <span className="absolute inset-0 rounded-full bg-circuit/20 animate-ripple" />
            <span className="absolute inset-0 rounded-full bg-circuit/10 animate-ripple" style={{ animationDelay: '0.5s' }} />
            <img
              src="/logo.jpg"
              alt=""
              className="relative h-20 w-20 rounded-full object-cover shadow-glow animate-float ring-2 ring-circuit/30"
            />
          </div>

          <h2 className="mx-auto max-w-2xl font-display text-2xl font-bold text-ink sm:text-3xl md:text-4xl text-balance leading-tight">
            Have a problem worth{' '}
            <span className="text-blue-chrome-animated">engineering a solution</span> for?
          </h2>

          <p className="mx-auto mt-4 max-w-md font-mono text-[10px] uppercase tracking-[0.28em] text-ink-muted sm:text-[11px]">
            Innovate · Automate · Elevate
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link to="/contact" className="group btn-primary relative overflow-hidden w-full sm:w-auto text-base px-8 py-3">
              <span className="relative z-10 flex items-center gap-2">
                Start a conversation <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Link>
            <Link to="/learning" className="btn-ghost w-full sm:w-auto text-base px-8 py-3">
              Explore the Learning Hub
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
