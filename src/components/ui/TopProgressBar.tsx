import { useEffect, useState } from 'react';

/**
 * TopProgressBar — Sleek, professional top progress bar for route transitions.
 * Displays a glowing cyan/sky-blue laser line along the top of the screen during module loading.
 */
export default function TopProgressBar() {
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const timer1 = setTimeout(() => setProgress(45), 100);
    const timer2 = setTimeout(() => setProgress(75), 300);
    const timer3 = setTimeout(() => setProgress(90), 600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] w-full bg-void pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-circuit via-circuit-bright to-sky-300 transition-all duration-300 ease-out shadow-[0_0_12px_rgba(56,189,248,0.8)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
