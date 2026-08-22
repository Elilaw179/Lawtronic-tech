import { useState, type FormEvent } from 'react';
import { Mail, MapPin, Navigation, ExternalLink } from 'lucide-react';
import { createDoc, COLLECTIONS } from '../../firebase/firestore';

// Google Maps embed using free iframe embed — no API key required
const MAPS_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63652.30019756487!2d8.28745!3d4.9741667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1067741e7b64ec81%3A0xbfafb1ae41e6f71e!2sCalabar%2C%20Cross%20River!5e0!3m2!1sen!2sng!4v1692000000000!5m2!1sen!2sng';

const MAPS_LINK =
  'https://www.google.com/maps/place/Calabar,+Cross+River+State,+Nigeria/@4.9741667,8.28745,13z';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general' as 'general' | 'collaboration',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      await createDoc(COLLECTIONS.contacts, { ...form, read: false });
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '', type: 'general' });
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-20 md:px-6 md:py-24">
      <div className="grid gap-14 md:grid-cols-2 md:gap-16">
        <div>
          <p className="eyebrow mb-3">Get in touch</p>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">
            <span className="text-blue-chrome-animated"> Let&apos;s build something.</span>
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink-dim">
            Whether it&apos;s a partnership, a research collaboration, or a general question — this
            reaches our team directly.
          </p>

          <div className="mt-10 space-y-4 text-sm text-ink-dim">
            <p className="flex items-center gap-2.5">
              <Mail size={16} className="text-circuit" /> lawtronictechnologiesltd@gmail.com
            </p>
            {/* Clickable location that opens Google Maps */}
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 hover:text-circuit transition-colors group"
            >
              <MapPin size={16} className="text-circuit group-hover:animate-bounce" />
              <span>Calabar, Cross River State, Nigeria</span>
              <ExternalLink size={12} className="ml-1 opacity-50 group-hover:opacity-100" />
            </a>
          </div>

          {/* Social media links */}
          <div className="mt-8 border-t border-line/60 pt-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted mb-3">
              Connect with us
            </p>
            <div className="flex items-center gap-3">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/lawtronics-technologies/"
                target="_blank"
                rel="noreferrer"
                aria-label="Lawtronic on LinkedIn"
                className="group flex h-9 w-9 items-center justify-center rounded-lg border border-line/60 bg-panel2/40 text-ink-muted transition-all duration-300 hover:border-[#0A66C2]/60 hover:bg-[#0A66C2]/10 hover:text-[#0A66C2] hover:shadow-[0_0_12px_rgba(10,102,194,0.25)]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/profile.php?id=61591897973302"
                target="_blank"
                rel="noreferrer"
                aria-label="Lawtronic on Facebook"
                className="group flex h-9 w-9 items-center justify-center rounded-lg border border-line/60 bg-panel2/40 text-ink-muted transition-all duration-300 hover:border-[#1877F2]/60 hover:bg-[#1877F2]/10 hover:text-[#1877F2] hover:shadow-[0_0_12px_rgba(24,119,242,0.25)]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/lawtronictechnologiesltd?igsi=bDlza3d3ZzdhdjFz"
                target="_blank"
                rel="noreferrer"
                aria-label="Lawtronic on Instagram"
                className="group flex h-9 w-9 items-center justify-center rounded-lg border border-line/60 bg-panel2/40 text-ink-muted transition-all duration-300 hover:border-[#E1306C]/60 hover:bg-[#E1306C]/10 hover:text-[#E1306C] hover:shadow-[0_0_12px_rgba(225,48,108,0.25)]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com/@elishasunday179?si=nL9ydI3Supv1vle4"
                target="_blank"
                rel="noreferrer"
                aria-label="Lawtronic on YouTube"
                className="group flex h-9 w-9 items-center justify-center rounded-lg border border-line/60 bg-panel2/40 text-ink-muted transition-all duration-300 hover:border-[#FF0000]/60 hover:bg-[#FF0000]/10 hover:text-[#FF0000] hover:shadow-[0_0_12px_rgba(255,0,0,0.25)]"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="tech-card card-spotlight space-y-5 p-7 md:p-8">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setForm((f) => ({ ...f, type: 'general' }))}
              className={`flex-1 rounded-lg border px-3 py-2.5 text-sm transition-colors ${form.type === 'general'
                  ? 'border-circuit/50 bg-circuit/10 text-circuit font-semibold shadow-glow-sm'
                  : 'border-line text-ink-dim hover:border-line-bright'
                }`}
            >
              General inquiry
            </button>
            <button
              type="button"
              onClick={() => setForm((f) => ({ ...f, type: 'collaboration' }))}
              className={`flex-1 rounded-lg border px-3 py-2.5 text-sm transition-colors ${form.type === 'collaboration'
                  ? 'border-circuit/50 bg-circuit/10 text-circuit font-semibold shadow-glow-sm'
                  : 'border-line text-ink-dim hover:border-line-bright'
                }`}
            >
              Collaboration
            </button>
          </div>

          <input
            required
            placeholder="Full name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="input-field focus:border-circuit focus:ring-1 focus:ring-circuit transition-all"
          />
          <input
            required
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="input-field focus:border-circuit focus:ring-1 focus:ring-circuit transition-all"
          />
          <input
            required
            placeholder="Subject"
            value={form.subject}
            onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
            className="input-field focus:border-circuit focus:ring-1 focus:ring-circuit transition-all"
          />
          <textarea
            required
            rows={5}
            placeholder="Message"
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            className="input-field resize-none focus:border-circuit focus:ring-1 focus:ring-circuit transition-all"
          />

          <button type="submit" disabled={status === 'sending'} className="btn-primary w-full text-sm">
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>

          {status === 'sent' && (
            <p className="rounded-lg border border-signal/30 bg-signal/5 px-3 py-2 text-sm text-signal animate-fade-in">
              Message sent. We&apos;ll reply soon.
            </p>
          )}
          {status === 'error' && (
            <p className="rounded-lg border border-alert/30 bg-alert/5 px-3 py-2 text-sm text-alert animate-fade-in">
              Something went wrong. Please try again — or email us directly.
            </p>
          )}
        </form>
      </div>

      {/* ── GOOGLE MAPS SECTION ───────────────────────────────────── */}
      <div className="mt-20">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-1 inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-circuit tech-pulse-dot" />
              <p className="eyebrow">Find Us</p>
            </div>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
              Our Location
            </h2>
            <p className="mt-1.5 text-sm text-ink-dim flex items-center gap-1.5">
              <MapPin size={14} className="text-circuit shrink-0" />
              Calabar, Cross River State, Nigeria
            </p>
          </div>
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost text-sm flex items-center gap-2 self-start sm:self-auto hover:text-circuit"
          >
            <Navigation size={15} />
            Get Directions
          </a>
        </div>

        {/* Interactive Google Maps embed */}
        <div className="relative overflow-hidden rounded-2xl border border-line shadow-elevated group">
          <div className="scan-line pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
          {/* Decorative top border glow */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-circuit/50 to-transparent z-10 pointer-events-none" />
          
          <iframe
            title="Lawtronic Technologies Location — Calabar, Nigeria"
            src={MAPS_EMBED_URL}
            width="100%"
            height="420"
            style={{ border: 0, display: 'block', filter: 'hue-rotate(185deg) saturate(0.9) brightness(0.85)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />

          {/* Overlay: bottom gradient for seamless blend */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-panel/20 to-transparent z-10" />
        </div>

        {/* Quick info cards below map */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3 stagger">
          <div className="tech-card card-spotlight p-4 flex items-start gap-3 group">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-circuit/10 text-circuit group-hover:bg-circuit group-hover:text-void transition-colors duration-300">
              <MapPin size={16} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-dim mb-0.5">Address</p>
              <p className="text-sm text-ink font-medium">Calabar, Cross River State, Nigeria</p>
            </div>
          </div>

          <div className="tech-card card-spotlight p-4 flex items-start gap-3 group">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-circuit/10 text-circuit group-hover:bg-circuit group-hover:text-void transition-colors duration-300">
              <Mail size={16} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-dim mb-0.5">Email</p>
              <a
                href="mailto:lawtronictechnologiesltd@gmail.com"
                className="text-sm text-ink hover:text-circuit transition-colors break-all font-medium"
              >
                lawtronictechnologiesltd@gmail.com
              </a>
            </div>
          </div>

          <div className="tech-card card-spotlight p-4 flex items-start gap-3 group">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-circuit/10 text-circuit group-hover:bg-circuit group-hover:text-void transition-colors duration-300">
              <Navigation size={16} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-dim mb-0.5">Directions</p>
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-circuit hover:text-circuit-bright transition-colors flex items-center gap-1 font-semibold"
              >
                Open in Google Maps <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


