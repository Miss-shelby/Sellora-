import { useEffect, useState } from "react";

const colors = [
  "#4dcafa", // Spectrogram Blue
  "#de94e2", // Pink
  "#ffdd03", // Yellow
  "#9977ff", // Violet
  "#62f6b5", // Mint
  "#e96b34", // Ember Orange
];

export function SpectrogramWaveform({ className = "" }: { className?: string }) {
  const [bars, setBars] = useState<{ height: number; color: string }[]>([]);

  useEffect(() => {
    // Generate 48 bars with harmonious wave heights and cycle through the 6 colors
    const totalBars = 54;
    const initialBars = Array.from({ length: totalBars }, (_, i) => {
      // Natural audio spectrogram envelope: bell curve with harmonic ripples
      const normalized = i / (totalBars - 1);
      const envelope = Math.sin(normalized * Math.PI);
      const ripple = Math.sin(normalized * Math.PI * 6) * 0.25;
      const baseHeight = Math.max(12, Math.min(76, (envelope + ripple + 0.3) * 52));
      return {
        height: baseHeight,
        color: colors[i % colors.length],
      };
    });
    setBars(initialBars);

    // Subtle ambient animation
    const interval = setInterval(() => {
      setBars((prev) =>
        prev.map((bar, i) => {
          const jitter = (Math.random() - 0.5) * 8;
          const newHeight = Math.max(10, Math.min(84, bar.height + jitter));
          return { ...bar, height: newHeight };
        })
      );
    }, 180);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`w-full overflow-hidden flex items-end justify-center gap-1.5 py-6 select-none ${className}`}
      aria-hidden="true"
    >
      {bars.map((bar, i) => (
        <div
          key={i}
          className="w-1.5 sm:w-2 transition-all duration-300 ease-out"
          style={{
            height: `${bar.height}px`,
            backgroundColor: bar.color,
            borderRadius: "5.6px",
            opacity: 0.88,
          }}
        />
      ))}
    </div>
  );
}
