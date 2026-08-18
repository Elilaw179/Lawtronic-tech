import { Link } from 'react-router-dom';
import { Bot, Cpu, Brain, Code, Zap, GraduationCap, Wrench, Lightbulb, ArrowRight } from 'lucide-react';
import SectionHeader from '../../components/ui/SectionHeader';

const SERVICES = [
  {
    icon: Wrench,
    title: 'Technology Development',
    description: 'Custom technology and engineering projects designed from concept to working systems.',
  },
  {
    icon: Bot,
    title: 'Robotics Development',
    description: 'Robotic prototypes, educational robots, mobile platforms, and autonomous systems.',
  },
  {
    icon: Cpu,
    title: 'Embedded Systems',
    description: 'Microcontroller-based hardware, sensor integration, PCBs, and custom control systems.',
  },
  {
    icon: Code,
    title: 'Software Development',
    description: 'Web applications, digital platforms, hardware-linked tools, and custom software solutions.',
  },
  {
    icon: Brain,
    title: 'AI Solutions',
    description: 'AI-powered applications, machine intelligence, computer vision, and smart systems.',
  },
  {
    icon: Zap,
    title: 'Automation',
    description: 'Technology-driven automation solutions to optimize processes and boost efficiency.',
  },
  {
    icon: GraduationCap,
    title: 'Technology Training',
    description: 'Corporate training, practical workshops, bootcamps, and hands-on STEM programmes.',
  },
  {
    icon: Lightbulb,
    title: 'Technical Consulting',
    description: 'Technology research, engineering project development, and specialized technical advisory.',
  },
];

export default function Services() {
  return (
    <div>
      {/* Header */}
      <section className="grid-bg border-b border-line px-5 py-20 md:px-6 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow mb-4">Engineering Capabilities</p>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl text-balance">
            <span className="text-blue-chrome-animated">Our Services</span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-ink-dim">
            We combine engineering, software, research, and practical education to develop custom technology solutions that address real-world challenges.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-6 md:py-24">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 stagger">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="card-interactive p-6 flex flex-col justify-between group">
                <div>
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-circuit/10 text-circuit transition-all duration-300 group-hover:bg-circuit group-hover:text-void group-hover:shadow-glow-sm">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-ink group-hover:text-circuit-bright transition-colors">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-dim">
                    {s.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-line/50">
                  <Link to="/contact" className="inline-flex items-center gap-1.5 text-xs font-semibold text-circuit hover:text-circuit-bright transition-colors">
                    Inquire service <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="circuit-divider" />

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-6 md:py-20">
        <div className="card p-8 md:p-12 text-center relative overflow-hidden bg-gradient-to-br from-panel to-panel2">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
              Have a problem worth solving?
            </h2>
            <p className="mt-4 text-base text-ink-dim">
              Let&apos;s explore how custom engineering, software, robotics, and intelligent automation can transform your operations.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link to="/contact" className="btn-accent">
                Work With Us <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
