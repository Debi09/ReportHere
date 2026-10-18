import { FlaskConical, Play } from "lucide-react";

export function AppHeader({ onDemo, busy }: { onDemo: () => void; busy: boolean }) {
  return (
    <header className="relative overflow-hidden border-b-[3px] border-black">
      <div aria-hidden className="pointer-events-none absolute -right-10 top-0 hidden h-full w-[46%] md:block">
        <div className="slide-in absolute right-24 top-8 h-56 w-56 rounded-full bg-[#E6392F]" />
        <div className="slide-in absolute right-4 top-24 h-48 w-24 bg-[#1D4ED8]" style={{ animationDelay: ".1s" }} />
        <div className="slide-in absolute right-52 top-40 h-0 w-0 border-x-[70px] border-b-[120px] border-x-transparent border-b-[#FACC15]" style={{ animationDelay: ".2s" }} />
        <div className="absolute -left-10 bottom-10 h-2 w-[130%] origin-left -rotate-[18deg] bg-black" />
      </div>
      <div className="relative mx-auto flex max-w-[1440px] flex-col gap-6 px-5 py-10 md:px-10 md:py-16">
        <span className="inline-flex w-fit items-center gap-2 border-2 border-black bg-[#FACC15] px-3 py-1 text-sm font-bold">
          <FlaskConical size={16} aria-hidden /> Python + Pandas Engine
        </span>
        <h1 className="display relative w-fit text-[48px] md:text-[72px]">
          <span aria-hidden className="absolute -bottom-1 -left-3 -z-10 h-5 w-[105%] -skew-x-12 bg-[#E6392F]" />
          Report<span className="text-[#1D4ED8]">Here</span>
        </h1>
        <p className="display text-2xl text-[#374151] md:text-3xl">Upload. Validate. Report.</p>
        <button className="btn w-fit bg-black text-white" onClick={onDemo} disabled={busy}>
          <Play size={18} aria-hidden /> Load Demo Data
        </button>
      </div>
    </header>
  );
}
