import { Link } from 'react-router-dom';
import { ArrowRight, Bot, Cpu, Code, Brain, Wrench, GraduationCap, Compass, Share2 } from 'lucide-react';
import SectionHeader from '../../components/ui/SectionHeader';

const DOMAINS = [
  { icon: Bot, name: 'Robotics & Hardware' },
  { icon: Cpu, name: 'Embedded Systems & Electronics' },
  { icon: Brain, name: 'Artificial Intelligence' },
  { icon: Code, name: 'Software Engineering' },
  { icon: Compass, name: 'Research & Technical Writing' },
  { icon: Wrench, name: 'Design & Visual Media' },
  { icon: Share2, name: 'Marketing & Brand Strategy' },
  { icon: GraduationCap, name: 'Technology Education & Mentorship' },
];

export default function Careers() {
  return (
    <div>
      {/* Hero */}
      <section className="grid-bg border-b border-line px-5 py-20 md:px-6 md:py-28 text-center">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow mb-4">Careers</p>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl">
            <span className="text-blue-chrome-animated">Join the Team</span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-ink-dim">
            We&apos;re building a multidisciplinary technology company in Africa and welcome passionate builders, researchers, and innovators who want to shape the future of deep tech.
          </p>
        </div>
      </section>

      {/* Core Disciplines */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-6 md:py-24">
        <SectionHeader
          eyebrow="Multidisciplinary Team"
          title=<span className="text-blue-chrome-animated">Who We Look For</span>
          description="We welcome innovators and problem solvers across diverse technical and creative fields."
        />

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 stagger">
          {DOMAINS.map((d) => {
            const Icon = d.icon;
            return (
              <div key={d.name} className="card-interactive p-6 flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-circuit/10 text-circuit">
                  <Icon size={20} />
                </div>
                <span className="font-display text-sm font-semibold text-ink">{d.name}</span>
              </div>
            );
          })}
        </div>
      </section>

      <div className="circuit-divider" />

      {/* Culture & CTA */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-6 md:py-24">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="eyebrow mb-3">Why Join Lawtronic?</p>
            <h2 className="font-display text-3xl font-semibold text-ink">
              Engineers, researchers, and educators building together.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-dim">
              At Lawtronic, you won&apos;t just write code or draw schematics on paper. You will build working prototypes, participate in real-world field validation, mentor students in practical bootcamps, and create technology designed to compete globally.
            </p>
            <div className="mt-8">
              <Link to="/contact" className="btn-accent">
                Work With Lawtronic <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div className="card p-8 bg-panel2/30 border-line space-y-6">
            <h3 className="font-display text-xl font-semibold text-circuit">General Talent Application</h3>
            <p className="text-sm text-ink-dim leading-relaxed">
              Don&apos;t see a specific open position? We are always interested in connecting with extraordinary talent across engineering, research, design, and operations.
            </p>
            <p className="text-xs text-ink-muted">
              Send your portfolio or CV to: <span className="text-circuit font-mono">lawtronictechnologiesltd@gmail.com</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
