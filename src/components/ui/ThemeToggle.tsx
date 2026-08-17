import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
  });

  useEffect(() => {
    const handleThemeChange = (e: CustomEvent<{ theme: 'dark' | 'light' }>) => {
      setTheme(e.detail.theme);
    };
    
    window.addEventListener('theme-changed' as any, handleThemeChange);
    return () => {
      window.removeEventListener('theme-changed' as any, handleThemeChange);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);

    if (nextTheme === 'light') {
      document.documentElement.classList.add('light-mode');
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#F8FAFC');
    } else {
      document.documentElement.classList.remove('light-mode');
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#050B16');
    }
    localStorage.setItem('theme', nextTheme);

    // Broadcast the update to all other toggle buttons
    window.dispatchEvent(new CustomEvent('theme-changed', { detail: { theme: nextTheme } }));
  };

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="group relative flex h-9 w-9 items-center justify-center rounded-xl border border-line/60 bg-panel text-ink transition-all duration-300 hover:border-circuit/60 hover:bg-panel2 hover:text-circuit-bright hover:shadow-glow-sm active:scale-90"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <span className="relative flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
        {theme === 'light' ? (
          <Moon className="h-4 w-4 text-circuit transition-all duration-300 group-hover:scale-110" />
        ) : (
          <Sun className="h-4 w-4 text-amber-400 transition-all duration-300 group-hover:scale-110" />
        )}
      </span>
    </button>
  );
}

