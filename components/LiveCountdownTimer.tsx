'use client';

import React, { useState, useEffect } from 'react';

interface LiveCountdownTimerProps {
  targetDate?: string | null;
  label?: string;
  className?: string;
}

export default function LiveCountdownTimer({ targetDate, label = 'Hold Window', className = '' }: LiveCountdownTimerProps) {
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

  useEffect(() => {
    if (!targetDate) return;

    const calculateRemaining = () => {
      const targetTime = new Date(targetDate).getTime();
      const now = Date.now();
      const diff = Math.max(0, Math.floor((targetTime - now) / 1000));
      setSecondsLeft(diff);
    };

    calculateRemaining();
    const interval = setInterval(calculateRemaining, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!targetDate || secondsLeft === null) {
    return (
      <div className={`text-emerald-400 font-mono font-black text-sm ${className}`}>
        ⏱️ 2 Hours Hold Active
      </div>
    );
  }

  if (secondsLeft <= 0) {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-950/80 border border-red-500/50 text-red-300 rounded-xl text-xs font-mono font-black animate-pulse">
        ⚠️ Hold Window Expired
      </div>
    );
  }

  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className={`inline-flex flex-col items-center md:items-end ${className}`}>
      <span className="text-[10px] text-emerald-300 uppercase font-extrabold tracking-wider">{label}</span>
      <div className="flex items-center gap-1.5 mt-0.5">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        <span className="text-xl md:text-2xl font-mono font-black text-emerald-400 tracking-wider">
          ⏱️ {hours > 0 ? `${pad(hours)}:` : ''}{pad(minutes)}:{pad(seconds)}
        </span>
      </div>
      <span className="text-[10px] text-slate-300 font-medium">
        Target: {new Date(targetDate).toLocaleTimeString()}
      </span>
    </div>
  );
}
