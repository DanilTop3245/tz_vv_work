interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = "h-9 w-auto", showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0 shadow-xs shadow-blue-500/20">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 6L8.5 18L12 9L15.5 18L20 6" />
        </svg>
      </div>
      {showText && (
        <div className="flex flex-col justify-center select-none">
          <span className="text-xl font-extrabold tracking-tight leading-none text-slate-900 dark:text-white transition-colors duration-200">
            VV <span className="text-blue-600 dark:text-blue-400">WORK</span>
          </span>
          <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-slate-500 dark:text-slate-400 leading-none mt-1 transition-colors duration-200">
            European Jobs
          </span>
        </div>
      )}
    </div>
  );
}
