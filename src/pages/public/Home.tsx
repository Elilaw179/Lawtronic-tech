import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Bot, CircuitBoard, GraduationCap, Zap, Code, Brain, ChevronRight, CheckCircle2, Factory, HeartPulse, Leaf, Building2, Layers, Compass } from 'lucide-react';
import SectionHeader from '../../components/ui/SectionHeader';
import StatusBadge from '../../components/ui/StatusBadge';
import { COLLECTIONS, listDocs, getDocById } from '../../firebase/firestore';
import { mockProjects, mockPosts } from '../../data/mockData';
import type { Project, Post, HeroSettings } from '../../types';

const WHAT_WE_DO = [
  {
    icon: Bot,
    title: 'Robotics & Autonomous Systems',
    description: 'Design and development of robotic systems, autonomous machines, educational robots, and intelligent mechanical systems.',
  },
  {
    icon: CircuitBoard,
    title: 'Embedded Systems & Electronics',
    description: 'Development of microcontroller-based systems, sensors, electronic control systems, IoT devices, and intelligent hardware.',
  },
  {
    icon: Brain,
    title: 'Artificial Intelligence',
    description: 'Exploring and developing AI-powered systems that enable machines and software to understand information, make decisions, and automate tasks.',
  },
  {
    icon: Code,
    title: 'Software Engineering',
    description: 'Development of software applications, web platforms, digital tools, and systems that connect users, businesses, and intelligent hardware.',
  },
  {
    icon: Zap,
    title: 'Automation & Intelligent Systems',
    description: 'Development of technology solutions that automate repetitive processes and improve efficiency across different sectors.',
  },
  {
    icon: GraduationCap,
    title: 'Technology Education & Research',
    description: 'Practical training, workshops, bootcamps, research, mentorship, and technology development focused on robotics, AI, electronics, embedded systems, and software.',
  },
];

const INDUSTRIES = [
  { icon: GraduationCap, name: 'Education', detail: 'Smart learning systems and educational robotics.' },
  { icon: Leaf, name: 'Agriculture', detail: 'Automation, sensing, monitoring, and intelligent agricultural systems.' },
  { icon: Factory, name: 'Manufacturing', detail: 'Automation, monitoring, control, and intelligent production systems.' },
  { icon: HeartPulse, name: 'Healthcare', detail: 'Technology-assisted systems and intelligent solutions.' },
  { icon: Compass, name: 'Environment', detail: 'Monitoring and technology solutions for environmental challenges.' },
  { icon: Building2, name: 'Smart Infrastructure', detail: 'Connected and intelligent systems for emerging communities.' },
];

const WHY_LAWTRONIC = [
  { title: 'African Perspective', detail: 'We build with the realities and challenges of African environments in mind.' },
  { title: 'Engineering-First Approach', detail: 'We combine hardware, software, electronics, and intelligent systems.' },
  { title: 'Practical Innovation', detail: 'We focus on solving real problems rather than technology for technologyΓÇÖs sake.' },
  { title: 'Education + Industry', detail: 'We connect practical technology education with real-world engineering.' },
  { title: 'Scalable Vision', detail: 'We aim to develop solutions that can grow from local applications to international markets.' },
];

const IMPACT_STATS = [
  { value: '100%', label: 'Hands-On Engineering' },
  { value: '2WD', label: 'Autonomous Robot Prototype' },
  { value: '2026', label: 'Summer Bootcamp Delivered' },
  { value: 'Calabar', label: 'Cross River State, Nigeria' },
];

/** Animated circuit emblem */
function HeroCircuit() {
  return (
    <div className="relative h-[270px] w-[270px] sm:h-[340px] sm:w-[340px] md:h-[440px] md:w-[440px] flex items-center justify-center pointer-events-none select-none">
      <div className="absolute h-56 w-56 sm:h-72 sm:w-72 rounded-full bg-circuit/10 blur-3xl animate-pulse" />
      <div className="absolute h-[290px] w-[290px] sm:h-[360px] sm:w-[360px] md:h-[390px] md:w-[390px] rounded-full border border-dashed border-circuit/15 animate-[spin_80s_linear_infinite]" />
      <div className="absolute h-[320px] w-[320px] sm:h-[400px] sm:w-[400px] md:h-[430px] md:w-[430px] rounded-full border border-circuit/5 animate-[spin_50s_linear_infinite_reverse]" />
      
      <div className="absolute top-0 left-0 w-4 h-4 sm:w-5 sm:h-5 border-t border-l border-circuit/20" />
      <div className="absolute top-0 right-0 w-4 h-4 sm:w-5 sm:h-5 border-t border-r border-circuit/20" />
      <div className="absolute bottom-0 left-0 w-4 h-4 sm:w-5 sm:h-5 border-b border-l border-circuit/20" />
      <div className="absolute bottom-0 right-0 w-4 h-4 sm:w-5 sm:h-5 border-b border-r border-circuit/20" />

      <div className="absolute inset-0 rounded-full bg-logo-glow blur-2xl opacity-50" />
      <svg className="relative h-[250px] w-[250px] sm:h-[320px] sm:w-[320px] md:h-[400px] md:w-[400px] animate-float" viewBox="0 0 420 420" fill="none" aria-hidden>
        <circle cx="210" cy="210" r="150" stroke="url(#ringGrad)" strokeWidth="2" strokeDasharray="942" className="animate-draw-ring" opacity="0.75" />
        <path d="M80 210 A130 130 0 0 1 210 80" stroke="#00D4FF" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="400" className="animate-trace" opacity="0.9" />
        <path d="M340 210 A130 130 0 0 1 210 340" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" strokeDasharray="400" className="animate-trace" style={{ animationDelay: '0.35s' }} opacity="0.6" />
        <path d="M30 180 L90 180 L110 160 L150 160" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="200" className="animate-trace" style={{ animationDelay: '0.15s' }} />
        <path d="M30 210 L100 210 L120 230 L160 230" stroke="#5CDDFF" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="200" className="animate-trace" style={{ animationDelay: '0.3s' }} />
        <path d="M30 240 L85 240 L105 260 L145 260" stroke="#FF6B00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="180" className="animate-trace" style={{ animationDelay: '0.45s' }} opacity="0.85" />
        {[[30, 180], [90, 180], [150, 160], [30, 210], [100, 210], [160, 230]].map(([cx, cy], i) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" fill="#00D4FF" className="animate-glow" style={{ animationDelay: `${i * 0.2}s` }} />
        ))}
        {[[30, 240], [145, 260]].map(([cx, cy], i) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" fill="#FCA311" className="animate-glow" style={{ animationDelay: `${(i + 6) * 0.2}s` }} />
        ))}
        <text x="210" y="225" textAnchor="middle" fill="url(#ltGrad)" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="72" opacity="0.95">LT</text>
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00D4FF" /><stop offset="50%" stopColor="#5CDDFF" /><stop offset="100%" stopColor="#CCCCCC" />
          </linearGradient>
          <linearGradient id="ltGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E6E6E6" /><stop offset="45%" stopColor="#CCCCCC" /><stop offset="100%" stopColor="#00D4FF" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [heroSettings, setHeroSettings] = useState<HeroSettings | null>(null);

  useEffect(() => {
    listDocs<Project>(COLLECTIONS.projects)
      .then((docs) => docs.length && setProjects(docs))
      .catch(() => {});
    listDocs<Post>(COLLECTIONS.posts)
      .then((docs) => docs.length && setPosts(docs))
      .catch(() => {});
    getDocById<HeroSettings>(COLLECTIONS.settings, 'hero')
      .then((setting) => {
        if (setting && setting.bgImage !== undefined) {
          setHeroSettings(setting);
        } else {
          listDocs<HeroSettings>(COLLECTIONS.settings).then((docs) => {
            if (docs && docs.length > 0) {
              setHeroSettings(docs[0]);
            }
          });
        }
      })
      .catch(() => {});
  }, []);

  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <div>
      {/* ── HERO SECTION ────────────────────────────────────────── */}
      <section className="grid-bg relative overflow-hidden border-b border-line bg-void">
        {/* Ambient floating particles */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-70">
          <div className="particle absolute top-1/4 left-1/6 h-2 w-2 rounded-full bg-circuit/40 blur-[1px]" style={{ '--particle-dur': '7s', '--particle-delay': '0s' } as React.CSSProperties} />
          <div className="particle absolute top-2/3 left-1/3 h-1.5 w-1.5 rounded-full bg-circuit-bright/60 blur-[1px]" style={{ '--particle-dur': '9s', '--particle-delay': '1.5s' } as React.CSSProperties} />
          <div className="particle absolute top-1/3 right-1/4 h-2 w-2 rounded-full bg-accent/40 blur-[1px]" style={{ '--particle-dur': '8s', '--particle-delay': '2.5s' } as React.CSSProperties} />
          <div className="particle absolute bottom-1/4 right-1/6 h-1 w-1 rounded-full bg-circuit/50" style={{ '--particle-dur': '6s', '--particle-delay': '1s' } as React.CSSProperties} />
        </div>

        {/* Dynamic Background Image from Admin Panel */}
        {heroSettings?.bgImage && (
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img
              src={heroSettings.bgImage}
              alt=""
              className="h-full w-full object-cover object-center transition-opacity duration-700"
            />
            {/* Custom dark overlay with configurable opacity (neutral deep dark tint, independent of theme mode) */}
            <div
              className="absolute inset-0 bg-[#0A192F] transition-opacity duration-300"
              style={{ opacity: heroSettings.overlayOpacity ?? 0.65 }}
            />
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-hero-glow z-0" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 py-20 sm:py-28 md:py-36 md:px-6">
          <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-16">
            {/* Text — colors controlled from admin panel */}
            <div className="flex-1 text-center lg:text-left">
              <p
                className="mb-4 animate-fade-up sm:mb-5 font-mono text-[0.725rem] uppercase tracking-[0.2em]"
                style={{
                  animationDelay: '0ms',
                  animationFillMode: 'forwards',
                  color: heroSettings?.eyebrowColor || '#00D4FF',
                }}
              >
                {heroSettings?.eyebrow ?? 'LAWTRONIC TECHNOLOGIES LTD • Innovate • Automate • Elevate'}
              </p>
              <h1
                className="font-display text-3xl font-semibold leading-[1.08] tracking-tight animate-fade-up sm:text-4xl md:text-5xl lg:text-[3.4rem]"
                style={{
                  animationDelay: '100ms',
                  animationFillMode: 'forwards',
                  color: heroSettings?.headlineColor || '#ffffff',
                }}
              >
                <span
                  className={!heroSettings?.headlineColor || heroSettings.headlineColor.toUpperCase() === '#FFFFFF' ? "text-blue-chrome-animated" : undefined}
                  style={heroSettings?.headlineColor ? { color: heroSettings.headlineColor } : undefined}
                >
                  {heroSettings?.headline ?? 'Building Intelligent Technology for Africa and Beyond'}
                </span>
              </h1>
              <p
                className="mt-5 text-base leading-relaxed animate-fade-up sm:text-lg md:max-w-2xl mx-auto lg:mx-0"
                style={{
                  animationDelay: '220ms',
                  animationFillMode: 'forwards',
                  color: heroSettings?.subheadingColor || 'rgba(240, 244, 248, 0.9)',
                }}
              >
                {heroSettings?.subheading ?? 'Lawtronic Technologies develops robotics, embedded systems, artificial intelligence, software, and innovative technology solutions designed to solve real-world problems and expand access to advanced technology.'}
              </p>
              <div
                className="mt-8 flex flex-col sm:flex-row justify-center gap-3.5 animate-fade-up lg:justify-start"
                style={{ animationDelay: '340ms', animationFillMode: 'forwards' }}
              >
                <Link to="/projects" className="btn-primary w-full sm:w-auto">
                  {heroSettings?.primaryBtnLabel ?? 'Explore Our Work'} <ArrowRight size={16} />
                </Link>
                <Link to="/contact" className="btn-accent w-full sm:w-auto">
                  {heroSettings?.secondaryBtnLabel ?? 'Work With Us'}
                </Link>
              </div>
            </div>

            {/* Circuit visual */}
            <div className="flex shrink-0 items-center justify-center animate-fade-up" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
              <HeroCircuit />
            </div>
          </div>
        </div>
      </section>

      {/* ── IMPACT HIGHLIGHTS ────────────────────────────────────────── */}
      <section className="relative border-b border-line bg-gradient-to-b from-panel/30 to-panel/10 py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-5 md:px-6">
          <div className="relative rounded-2xl border border-line bg-panel2/30 p-8 md:p-10 backdrop-blur-md overflow-hidden shadow-elevated">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-circuit/40 to-transparent shadow-[0_0_10px_rgba(0,212,255,0.4)]" />
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 stagger relative z-10">
              {IMPACT_STATS.map((stat) => (
                <div key={stat.label} className="text-center group">
                  <p className="font-display text-3xl font-extrabold text-circuit sm:text-4xl tracking-tight transition-transform duration-300 group-hover:scale-110 group-hover:text-circuit-bright">
                    {stat.value}
                    <span className="relative ml-1 inline-flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-circuit opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-circuit-bright"></span>
                    </span>
                  </p>
                  <div className="mt-2 mx-auto w-8 h-[2px] bg-line group-hover:bg-circuit group-hover:w-12 transition-all duration-300" />
                  <p className="mt-2 text-[10px] font-mono uppercase tracking-wider text-ink-muted sm:text-xs">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT LAWTRONIC ────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-6 md:py-24">
        <div className="grid gap-8 md:grid-cols-2 md:gap-16 items-center">
          <div>
            <p className="eyebrow mb-3">About Lawtronic</p>
            <h2 className="font-display text-2xl font-semibold leading-snug text-ink md:text-3xl">
              <span className="text-blue-chrome-animated">Engineering the Future Through Innovation</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-dim">
              Lawtronic Technologies Ltd is a Nigerian technology and deep-tech company focused on robotics, embedded systems, artificial intelligence, software engineering, technology education, research, and intelligent automation.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink-dim">
              We combine engineering, software, research, and practical education to develop technology solutions that address real-world challenges.
            </p>
          </div>
          <div className="card p-8 bg-panel2/30 border-line space-y-5">
            <h3 className="font-display text-lg font-semibold text-circuit">Our Long-Term Ambition</h3>
            <p className="text-sm leading-relaxed text-ink-dim">
              To develop locally relevant technologies that can compete beyond Africa while helping build the engineering talent required to support the continent&apos;s technological growth.
            </p>
            <div className="pt-2">
              <Link to="/about" className="inline-flex items-center gap-1.5 text-xs font-semibold text-circuit hover:text-circuit-bright">
                Read full profile <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="circuit-divider" />

      {/* ── WHAT WE DO (6 CARDS) ────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-6 md:py-24">
        <SectionHeader
          eyebrow="What We Do"
          title=<span className="text-blue-chrome-animated">Engineering &amp; Innovation Disciplines</span>
          description="Six core technology areas driving our hardware, software, and research."
        />
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 stagger">
          {WHAT_WE_DO.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="tech-card card-spotlight p-6 relative overflow-hidden group">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-circuit/10 text-circuit transition-all duration-300 group-hover:bg-circuit group-hover:text-void group-hover:shadow-glow">
                  <Icon size={22} strokeWidth={1.75} />
                </div>
                <h3 className="font-display text-base font-semibold text-ink sm:text-lg group-hover:text-circuit-bright transition-colors duration-300">{item.title}</h3>
                <p className="mt-2 text-sm text-ink-dim leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <div className="circuit-divider" />

      {/* ── CURRENT DEVELOPMENT: FROM PROTOTYPE TO PRODUCT ────────── */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-6 md:py-24">
        <SectionHeader
          eyebrow="Our Current Development"
          title=<span className="text-blue-chrome-animated">From Prototype to Product</span>
          description="Lawtronic is currently developing and validating technology concepts that can evolve into commercially viable products."
        />

        <div className="tech-card p-8 md:p-12 bg-gradient-to-br from-panel2/40 to-panel/60 border-circuit/40 relative overflow-hidden group shadow-elevated">
          <div className="scan-line" />
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center relative z-10">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-circuit/30 bg-circuit/10 px-3 py-1 text-xs font-mono font-semibold text-circuit">
                <StatusBadge status="Prototype" />
                Featured Development
              </div>
              <h3 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                2WD Autonomous Obstacle-Avoiding Robot
              </h3>
              <p className="mt-4 text-base leading-relaxed text-ink-dim">
                Our recent engineering work includes a 2WD autonomous obstacle-avoiding robot combining Arduino, motor control, ultrasonic sensing, servo-based scanning, and embedded programming.
              </p>
              <div className="mt-6 space-y-2">
                <p className="font-mono text-xs uppercase tracking-wider text-circuit font-semibold flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-circuit tech-pulse-dot" />
                  Integrates System Pipeline:
                </p>
                <p className="text-sm font-medium text-ink-dim">
                  Hardware + Embedded Software + Sensors + Control Logic + Autonomous Decision-Making
                </p>
              </div>
            </div>

            <div className="space-y-4 rounded-xl border border-line bg-panel2/60 p-6 relative overflow-hidden">
              <h4 className="font-display text-sm font-semibold text-ink uppercase tracking-wider">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  'Arduino Uno',
                  'L298N Motor Driver',
                  'TT Geared Motors',
                  'HC-SR04 Ultrasonic Sensor',
                  'SG90 Servo',
                  'Embedded C/C++',
                  'Motor Control',
                  'Autonomous Navigation Logic',
                ].map((tech) => (
                  <span key={tech} className="rounded-md border border-line bg-panel px-2.5 py-1 text-xs font-mono text-ink-dim hover:border-circuit/40 hover:text-circuit transition-colors duration-200">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="pt-4 border-t border-line/60">
                <p className="font-display text-xs font-semibold text-circuit uppercase tracking-wider mb-1">Why this matters</p>
                <p className="text-xs text-ink-muted leading-relaxed">
                  The prototype is part of our broader effort to develop the engineering capabilities and product-development processes required to create useful, locally relevant technology solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="circuit-divider" />

      {/* ΓöÇΓöÇ EDUCATION SECTION ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-6 md:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow mb-3">Technology Education</p>
            <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
              <span className="text-blue-chrome-animated">Building the Next Generation of African Innovators</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-dim">
              Lawtronic also works to expand practical technology education. We organize practical learning experiences where participants learn by building, testing, troubleshooting, and solving problems.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                'Robotics',
                'Embedded Systems',
                'Electronics',
                'Artificial Intelligence',
                'Software Engineering',
                'Programming & STEM',
                'Engineering Thinking',
                'Bootcamps & Workshops',
              ].map((topic) => (
                <div key={topic} className="flex items-center gap-2 text-sm text-ink">
                  <CheckCircle2 size={16} className="text-circuit shrink-0" />
                  <span>{topic}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link to="/learning" className="btn-primary text-sm">
                Explore Learning Hub <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="card p-8 border-line bg-panel2/20">
            <span className="eyebrow text-amber mb-2 block">Tangible Impact</span>
            <h3 className="font-display text-xl font-bold text-ink">2026 Summer Bootcamp</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-dim">
              At our 2026 Summer Bootcamp in Calabar, participants built, programmed, and field-tested the 2WD autonomous obstacle-avoiding robot hands-on.
            </p>
            <div className="mt-6 pt-4 border-t border-line">
              <Link to="/blog/2026-summer-bootcamp-2wd-robot" className="inline-flex items-center gap-1.5 text-xs font-semibold text-circuit hover:text-circuit-bright">
                Read Bootcamp Story &amp; Photos <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="circuit-divider" />

      {/* ΓöÇΓöÇ INDUSTRIES WE AIM TO SERVE ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-6 md:py-24">
        <SectionHeader
          eyebrow="Industries We Aim to Serve"
          title=<span className="text-blue-chrome-animated">Where Technology Can Make a Difference</span>
          description="Developing intelligent hardware and software applications tailored to critical economic sectors."
        />
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 stagger">
          {INDUSTRIES.map((ind) => {
            const Icon = ind.icon;
            return (
              <div key={ind.name} className="card-interactive p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-circuit/10 text-circuit">
                  <Icon size={20} />
                </div>
                <h3 className="font-display text-base font-semibold text-ink">{ind.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-dim">{ind.detail}</p>
              </div>
            );
          })}
        </div>
      </section>

      <div className="circuit-divider" />

      {/* ΓöÇΓöÇ WHY LAWTRONIC? ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-6 md:py-24">
        <SectionHeader
          eyebrow="Why Choose Lawtronic?"
          title=<span className="text-blue-chrome-animated">Engineered for Relevance and Scale</span>
        />
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 stagger">
          {WHY_LAWTRONIC.map((pillar) => (
            <div key={pillar.title} className="card p-6 border-line hover:border-circuit/40 transition-colors">
              <h3 className="font-display text-lg font-semibold text-ink">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-dim">{pillar.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="circuit-divider" />

      {/* ΓöÇΓöÇ PARTNERSHIPS CTA ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-6 md:py-20">
        <div className="card p-8 md:p-12 text-center bg-gradient-to-br from-panel via-panel2 to-panel text-ink">
          <p className="eyebrow mb-3">Let&apos;s Build Together</p>
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            Have a problem worth solving?
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-base text-ink-dim">
            Lawtronic welcomes collaboration with universities, schools, research institutions, tech companies, startups, manufacturers, and innovation hubs.
          </p>
          <div className="mt-8">
            <Link to="/contact" className="btn-accent">
              Partner With Us <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
