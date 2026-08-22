import { useEffect, useState, type FormEvent } from 'react';
import { Save, Image as ImageIcon, RotateCcw, CheckCircle2, Eye, Sparkles } from 'lucide-react';
import FileUploader from '../../components/ui/FileUploader';
import { COLLECTIONS, getDocById, setDocWithId } from '../../firebase/firestore';
import type { HeroSettings } from '../../types';

export default function ManageHero() {
  const [bgImage, setBgImage] = useState('');
  const [overlayOpacity, setOverlayOpacity] = useState(0.65);
  const [eyebrow, setEyebrow] = useState('');
  const [headline, setHeadline] = useState('');
  const [subheading, setSubheading] = useState('');
  const [primaryBtnLabel, setPrimaryBtnLabel] = useState('');
  const [secondaryBtnLabel, setSecondaryBtnLabel] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        const docData = await getDocById<HeroSettings>(COLLECTIONS.settings, 'hero');
        if (docData) {
          setBgImage(docData.bgImage || '');
          setOverlayOpacity(docData.overlayOpacity ?? 0.65);
          setEyebrow(docData.eyebrow ?? '');
          setHeadline(docData.headline ?? '');
          setSubheading(docData.subheading ?? '');
          setPrimaryBtnLabel(docData.primaryBtnLabel ?? '');
          setSecondaryBtnLabel(docData.secondaryBtnLabel ?? '');
        }
      } catch (err) {
        console.error('Failed to load hero settings:', err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      const payload = {
        bgImage,
        overlayOpacity,
        eyebrow,
        headline,
        subheading,
        primaryBtnLabel,
        secondaryBtnLabel,
        updatedAt: new Date().toISOString(),
      };

      await setDocWithId(COLLECTIONS.settings, 'hero', payload);

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err) {
      console.error('Error saving hero settings:', err);
      alert('Failed to save settings. Please check console.');
    } finally {
      setSaving(false);
    }
  }

  async function handleReset() {
    setBgImage('');
    setOverlayOpacity(0.65);
    setEyebrow('');
    setHeadline('');
    setSubheading('');
    setPrimaryBtnLabel('');
    setSecondaryBtnLabel('');
    try {
      await setDocWithId(COLLECTIONS.settings, 'hero', {
        bgImage: '',
        overlayOpacity: 0.65,
        eyebrow: '',
        headline: '',
        subheading: '',
        primaryBtnLabel: '',
        secondaryBtnLabel: '',
        updatedAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error('Error resetting hero settings:', err);
    }
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-circuit border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-8">
      <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <ImageIcon className="text-circuit" size={24} />
            <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">
              Hero Section Settings
            </h1>
          </div>
          <p className="mt-1 text-sm text-ink-dim">
            Manage the background image and all text content for the homepage Hero section.
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-2 rounded-lg border border-success/40 bg-success/10 px-4 py-2 text-xs font-semibold text-success animate-fade-in">
            <CheckCircle2 size={16} /> Hero background updated successfully!
          </div>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Form Controls */}
        <form onSubmit={handleSubmit} className="space-y-6 lg:col-span-6">
          <div className="card p-6 space-y-6">
            <h2 className="font-display text-base font-semibold text-ink flex items-center gap-2">
              <Sparkles size={16} className="text-circuit" /> Background Image & Overlay
            </h2>

            <FileUploader
              label="Hero Background Image"
              accept="image/*"
              storagePath="hero_bg"
              value={bgImage}
              onChange={(url) => setBgImage(url)}
              isImage={true}
            />

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold uppercase tracking-wider text-ink-dim">
                  Dark Overlay Tint: {Math.round(overlayOpacity * 100)}%
                </label>
                <span className="text-[10px] text-ink-muted">Increases text legibility</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="0.9"
                step="0.05"
                value={overlayOpacity}
                onChange={(e) => setOverlayOpacity(parseFloat(e.target.value))}
                className="w-full accent-circuit cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-ink-muted font-mono">
                <span>Lighter (10%)</span>
                <span>Balanced (65%)</span>
                <span>Darker (90%)</span>
              </div>
            </div>
          </div>

          {/* Text Content Card */}
          <div className="card p-6 space-y-5">
            <h2 className="font-display text-base font-semibold text-ink flex items-center gap-2">
              <Sparkles size={16} className="text-circuit" /> Hero Text Content
            </h2>
            <p className="text-xs text-ink-muted">Leave any field blank to use the default built-in text.</p>

            <div className="space-y-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink-dim">Eyebrow / Tagline</label>
              <input
                type="text"
                placeholder="e.g. LAWTRONIC TECHNOLOGIES LTD • Innovate • Automate • Elevate"
                value={eyebrow}
                onChange={(e) => setEyebrow(e.target.value)}
                className="admin-input text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink-dim">Main Headline</label>
              <textarea
                rows={2}
                placeholder="e.g. Building Intelligent Technology for Africa and Beyond"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="admin-input text-xs resize-none"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink-dim">Subheading / Description</label>
              <textarea
                rows={3}
                placeholder="e.g. Lawtronic Technologies develops robotics, embedded systems..." 
                value={subheading}
                onChange={(e) => setSubheading(e.target.value)}
                className="admin-input text-xs resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink-dim">Primary Button</label>
                <input
                  type="text"
                  placeholder="Explore Our Work"
                  value={primaryBtnLabel}
                  onChange={(e) => setPrimaryBtnLabel(e.target.value)}
                  className="admin-input text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink-dim">Secondary Button</label>
                <input
                  type="text"
                  placeholder="Work With Us"
                  value={secondaryBtnLabel}
                  onChange={(e) => setSecondaryBtnLabel(e.target.value)}
                  className="admin-input text-xs"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-line flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="btn-ghost text-xs px-3 py-2 flex items-center gap-1.5"
              >
                <RotateCcw size={14} /> Clear Image
              </button>

              <button
                type="submit"
                disabled={saving}
                className="btn-primary text-xs px-5 py-2.5 flex items-center gap-2"
              >
                {saving ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-void border-t-transparent" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={14} /> Save Hero Banner
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Live Preview */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-ink-dim flex items-center gap-2">
              <Eye size={14} className="text-circuit" /> Live Homepage Preview
            </h2>
            <span className="text-[11px] font-mono text-circuit">Real-time</span>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-line shadow-card bg-[#0a192f] h-[340px] flex items-center justify-center p-6 text-center select-none">
            {/* Background image preview */}
            {bgImage ? (
              <img
                src={bgImage}
                alt="Hero Background Preview"
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
              />
            ) : (
              <div className="grid-bg absolute inset-0 opacity-80" />
            )}

            {/* Dark overlay — always neutral dark regardless of theme */}
            <div
              className="absolute inset-0 bg-[#0A192F] pointer-events-none transition-opacity duration-300"
              style={{ opacity: overlayOpacity }}
            />

            {/* Circuit Glow Overlay */}
            <div className="pointer-events-none absolute inset-0 bg-hero-glow z-10" />

            {/* Live hero text preview — always white */}
            <div className="relative z-20 space-y-3 max-w-sm">
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] block" style={{ color: '#00D4FF' }}>
                {eyebrow || 'LAWTRONIC TECHNOLOGIES LTD • Innovate • Automate • Elevate'}
              </span>
              <h3 className="font-display text-base font-bold leading-snug" style={{ color: '#ffffff' }}>
                {headline || 'Building Intelligent Technology for Africa and Beyond'}
              </h3>
              <p className="text-[11px] line-clamp-2" style={{ color: 'rgba(240,244,248,0.85)' }}>
                {subheading || 'Lawtronic Technologies develops robotics, embedded systems, artificial intelligence, software...'}
              </p>
              <div className="pt-2 flex justify-center gap-2">
                <span className="btn-primary text-[10px] px-3 py-1.5">
                  {primaryBtnLabel || 'Explore Our Work'}
                </span>
                <span className="btn-accent text-[10px] px-3 py-1.5">
                  {secondaryBtnLabel || 'Work With Us'}
                </span>
              </div>
            </div>
          </div>

          <p className="text-xs text-ink-muted leading-relaxed">
            Note: The dark overlay ensures text remains clear and readable over light or detailed background images.
          </p>
        </div>
      </div>
    </div>
  );
}
