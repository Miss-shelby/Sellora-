import { useState } from "react";
import { PlusCircle, LayoutList, BarChart3 } from "lucide-react";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { CreatePromptForm } from "./CreatePromptForm";
import MyPrompts from "./MyPrompts";
import { SellerAnalyticsWidget } from "@/components/analytics/SellerAnalyticsWidget";
import { useWallet } from "@/hooks/useWallet";
import { usePageMeta } from "@/lib/seo/usePageMeta";

type View = "create" | "manage" | "analytics";

export default function SellPage() {
  usePageMeta({
    title: "Sell Prompts",
    description: "List your AI prompts on the Stellar blockchain. Set your price, encrypt your content, and earn XLM.",
  });

  const [view, setView] = useState<View>("create");
  const { address } = useWallet();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12),_transparent_35%),linear-gradient(180deg,_#020617,_#0f172a_45%,_#020617)] text-white">
      <Navigation />

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        {/* Hero */}
        <section className="mb-8 rounded-[5.6px] border border-[#27272a] bg-[#09090b] px-6 py-8 sm:mb-10 sm:px-8 sm:py-10">
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-[#62f6b5]">
            CREATOR STUDIO
          </p>
          <h1 className="mt-3 font-sans text-3xl font-light tracking-[-0.64px] text-[#fffaea] sm:text-4xl">
            Sell encrypted prompt licenses
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#71717a] sm:leading-7">
            Your full prompt is encrypted in the browser before anything touches the
            blockchain. Buyers only see plaintext after an on-chain access check and
            wallet-authenticated unlock — you keep creative control.
          </p>

          {/* How it works pills */}
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { step: "1", label: "Write & encrypt" },
              { step: "2", label: "Set price on-chain" },
              { step: "3", label: "Buyers unlock with wallet" },
            ].map(({ step, label }) => (
              <div
                key={step}
                className="flex items-center gap-2 rounded-full border border-[#27272a] bg-[#18181b] px-3.5 py-1 text-xs font-mono text-[#f4f4f5]"
              >
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#62f6b5]/20 text-[10px] font-bold text-[#62f6b5]">
                  {step}
                </span>
                {label}
              </div>
            ))}
          </div>
        </section>

        {/* View switcher */}
        <div className="mb-8 flex gap-2 rounded-[5.6px] border border-[#27272a] bg-[#09090b] p-1.5">
          <button
            onClick={() => setView("create")}
            aria-pressed={view === "create"}
            className={`min-h-11 flex flex-1 items-center justify-center gap-2 rounded-[5.6px] px-3 py-2 text-xs font-mono uppercase tracking-[0.08em] transition-all sm:px-4 ${view === "create"
                ? "bg-[#fffaea] text-[#0e0e13] font-medium"
                : "text-[#71717a] hover:text-[#fffaea]"
              }`}
          >
            <PlusCircle className="h-3.5 w-3.5" />
            CREATE LISTING
          </button>
          <button
            onClick={() => setView("manage")}
            aria-pressed={view === "manage"}
            className={`min-h-11 flex flex-1 items-center justify-center gap-2 rounded-[5.6px] px-3 py-2 text-xs font-mono uppercase tracking-[0.08em] transition-all sm:px-4 ${view === "manage"
                ? "bg-[#fffaea] text-[#0e0e13] font-medium"
                : "text-[#71717a] hover:text-[#fffaea]"
              }`}
          >
            <LayoutList className="h-3.5 w-3.5" />
            MY PROMPTS
          </button>
          <button
            onClick={() => setView("analytics")}
            aria-pressed={view === "analytics"}
            className={`min-h-11 flex flex-1 items-center justify-center gap-2 rounded-[5.6px] px-3 py-2 text-xs font-mono uppercase tracking-[0.08em] transition-all sm:px-4 ${view === "analytics"
                ? "bg-[#fffaea] text-[#0e0e13] font-medium"
                : "text-[#71717a] hover:text-[#fffaea]"
              }`}
          >
            <BarChart3 className="h-3.5 w-3.5" />
            ANALYTICS
          </button>
        </div>

        {view === "create" && (
          <CreatePromptForm onCreated={() => setView("manage")} />
        )}
        {view === "manage" && (
          <MyPrompts onCreateNew={() => setView("create")} />
        )}
        {view === "analytics" && (
          <section className="space-y-6">
            <div className="rounded-[5.6px] border border-[#27272a] bg-[#09090b] p-6 sm:p-7">
              <p className="font-mono text-xs uppercase tracking-[0.08em] text-[#62f6b5]">
                CREATOR ANALYTICS
              </p>
              <h2 className="mt-2 font-sans text-2xl font-light tracking-[-0.64px] text-[#fffaea]">
                Conversion &amp; support performance
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#71717a]">
                See how buyers discover, purchase, and successfully unlock your
                prompts — with buyer identities redacted to protect privacy.
              </p>
            </div>
            {address ? (
              <SellerAnalyticsWidget walletAddress={address} />
            ) : (
              <div className="rounded-[5.6px] border border-dashed border-[#27272a] bg-[#09090b] p-8 text-center text-sm text-[#71717a]">
                Connect your wallet to view privacy-safe seller analytics.
              </div>
            )}
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
