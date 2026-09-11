import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";

export function TalkToAgentConsole({ className = "" }: { className?: string }) {
  return (
    <div className={`flex justify-center ${className}`}>
      <Link
        to="/chat"
        className="group inline-flex items-center gap-3 bg-[#fffaea] text-[#0e0e13] px-8 py-3.5 rounded-full font-mono text-[13px] font-medium tracking-console uppercase hover:bg-white transition-all shadow-sm"
      >
        <Sparkles className="w-4 h-4 text-[#e96b34]" />
        <span>INTERROGATE AGENT PROTOCOL</span>
        <div className="flex items-center gap-1 ml-1 text-[#71717a] group-hover:text-[#0e0e13] transition-colors">
          <div className="w-1 h-1 rounded-full bg-current" />
          <div className="w-1 h-1 rounded-full bg-current" />
          <div className="w-1 h-1 rounded-full bg-current" />
          <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </div>
      </Link>
    </div>
  );
}
