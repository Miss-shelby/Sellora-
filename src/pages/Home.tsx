import { Link } from "react-router-dom";
import {
  ArrowRight,
  Shield,
  Zap,
  Cpu,
  LockKeyhole,
  CheckCircle2,
  Terminal,
} from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { FeaturedPrompts } from "@/components/featured-prompts";
import { FeaturedCreators } from "@/components/FeaturedCreators";
import { MarketplaceAnalyticsCards } from "@/components/analytics/MarketplaceAnalyticsCards";
import { usePageMeta } from "@/lib/seo/usePageMeta";
import FaqSection from "@/components/faq-section";
import { OnboardingTour } from "@/components/OnboardingTour";
import { MarketplaceActivityFeed } from "@/components/MarketplaceActivityFeed";
import { SpectrogramWaveform } from "@/components/vapi/SpectrogramWaveform";
import { TalkToAgentConsole } from "@/components/vapi/TalkToAgentConsole";

const features = [
  {
    title: "Zero-Knowledge Browser Encryption",
    description:
      "All prompts and workflow payloads are encrypted in the browser using AES-GCM-256 before interacting with the Stellar network. Centralized servers never see unencrypted payload data.",
    code: `const cipher = await encryptPrompt(payload, key);
await stellar.publish({ hash: cipher.hash });`,
  },
  {
    title: "Sub-Second Soroban Settlement",
    description:
      "Smart contracts govern ownership and license generation. Payments in XLM settle in ~1.2 seconds with micro-fee efficiency, enabling high-throughput autonomous agent transactions.",
    code: `soroban.invoke('purchase_license', {
  buyer: wallet.address,
  prompt_id: 104n
});`,
  },
  {
    title: "Programmatic Wallet Authentication",
    description:
      "SEP-43 cryptographic challenge signatures allow autonomous AI agents and users to verify license rights and decrypt runtime instructions in automated production environments.",
    code: `const challenge = await auth.requestChallenge();
const signature = await agent.sign(challenge);
const plaintext = await unlock(signature);`,
  },
];

export default function Home() {
  usePageMeta({
    title: "Marketplace",
    description:
      "Developer-facing marketplace for autonomous AI agent workflows and encrypted system prompts on Stellar.",
  });

  return (
    <div className="min-h-screen bg-[#0e0e13] text-[#fffaea] selection:bg-[#e96b34] selection:text-[#fffaea]">
      <Navigation />

      <main>
        {/* Vapi Hero Section: Side-by-Side Modern Grid Layout */}
        <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-20 px-6 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headline, Subtitle, Binary Action Pair */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#27272a] bg-[#09090b] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#62f6b5]" />
                <span className="font-mono text-[11px] uppercase tracking-console text-[#71717a]">
                  STELLAR SOROBAN // VOICE &amp; PROMPT PROTOCOL
                </span>
              </div>

              <h1 className="font-sans font-light text-4xl sm:text-6xl lg:text-[68px] leading-[1.05] tracking-tight-hero text-[#fffaea] max-w-2xl">
                Developer platform for autonomous AI agent prompts.
              </h1>

              <p className="mt-6 text-base sm:text-lg font-normal text-[#a1a1aa] max-w-xl leading-relaxed">
                Client-encrypted system instructions, multi-agent workflows, and license rights settled instantly on Stellar with sub-second cryptographic finality.
              </p>

              {/* Binary CTA Pair (Ember + Mint) */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/browse"
                  className="inline-flex items-center gap-2 bg-[#e96b34] text-[#fffaea] font-mono text-[12px] font-medium tracking-console uppercase px-7 py-3 rounded-full hover:bg-[#d95d28] transition-colors"
                >
                  EXPLORE CATALOG →
                </Link>
                <Link
                  to="/sell"
                  className="inline-flex items-center gap-2 bg-[#62f6b5] text-[#0e0e13] font-mono text-[12px] font-medium tracking-console uppercase px-7 py-3 rounded-full hover:bg-[#4fe29f] transition-colors"
                >
                  PUBLISH PROMPT
                </Link>
              </div>

              {/* Console Interrogate Trigger */}
              <div className="mt-8 pt-6 border-t border-[#27272a] w-full max-w-xl">
                <TalkToAgentConsole className="!justify-start" />
              </div>
            </div>

            {/* Right Column: Live Interactive Architecture / Terminal HUD (5.6px Carbon Surface) */}
            <div className="lg:col-span-5">
              <div className="rounded-[5.6px] border border-[#27272a] bg-[#09090b] p-6 shadow-none">
                {/* Console header */}
                <div className="flex items-center justify-between pb-4 border-b border-[#27272a] mb-5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#e96b34]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffdd03]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#62f6b5]" />
                    <span className="ml-2 font-mono text-[11px] uppercase tracking-console text-[#71717a]">
                      NODE // RUNTIME_HUD
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[#62f6b5] bg-[#18181b] px-2 py-0.5 rounded-[5.6px] border border-[#27272a]">
                    LIVE SYNC
                  </span>
                </div>

                {/* Console Code & Execution Feed */}
                <div className="space-y-4 font-mono text-xs">
                  <div className="rounded-[5.6px] bg-[#0e0e13] border border-[#27272a] p-3.5 space-y-2">
                    <div className="flex items-center justify-between text-[#71717a] text-[10px]">
                      <span>SYSTEM_PAYLOAD // SOROBAN</span>
                      <span className="text-[#62f6b5]">ENCRYPTED_AES256</span>
                    </div>
                    <p className="text-[#4dcafa] leading-relaxed break-all">
                      $ sellora.invoke_contract(&quot;decrypt_license&quot;, &#123; buyer: &quot;G...9JW&quot;, proof: &quot;0x8f2a...&quot; &#125;)
                    </p>
                    <div className="text-[#71717a] text-[11px] pt-1">
                      → Decryption verified via SEP-43 keypair auth
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="rounded-[5.6px] bg-[#18181b] border border-[#27272a] p-3">
                      <div className="text-[10px] text-[#71717a] uppercase tracking-console">SETTLEMENT TIME</div>
                      <div className="text-[#fffaea] font-mono text-base font-medium mt-1">1,240 ms</div>
                      <div className="text-[10px] text-[#62f6b5] mt-0.5">Stellar Sub-second</div>
                    </div>
                    <div className="rounded-[5.6px] bg-[#18181b] border border-[#27272a] p-3">
                      <div className="text-[10px] text-[#71717a] uppercase tracking-console">NETWORK FEE</div>
                      <div className="text-[#fffaea] font-mono text-base font-medium mt-1">0.00001 XLM</div>
                      <div className="text-[10px] text-[#71717a] mt-0.5">Micro-transaction</div>
                    </div>
                  </div>

                  <div className="rounded-[5.6px] border border-[#27272a] bg-[#18181b]/60 p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#62f6b5] animate-pulse" />
                      <span className="text-[#a1a1aa] text-[11px]">Consensus Validator 04</span>
                    </div>
                    <span className="font-mono text-[10px] text-[#71717a]">LEDGER #49,201</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brand-Defining Spectrogram Waveform Graphic */}
        <section className="w-full border-t border-b border-[#27272a] bg-[#09090b]/40 py-4">
          <SpectrogramWaveform />
        </section>

        {/* Developer Proof Strip */}
        <section className="border-b border-[#27272a] py-8 px-6">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-10 sm:gap-16 font-mono text-[12px] uppercase tracking-console text-[#71717a]">
            <span>STELLAR SOROBAN</span>
            <span>AES-GCM-256</span>
            <span>SEP-43 VERIFIED</span>
            <span>SUB-SECOND FINALITY</span>
            <span>IPFS STORAGE</span>
          </div>
        </section>

        {/* Feature List Cards (5.6px radius, Carbon Surface, Iron Border) */}
        <section className="py-24 max-w-7xl mx-auto px-6 space-y-16">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-console text-[#71717a] mb-2">
              ARCHITECTURE OVERVIEW
            </p>
            <h2 className="font-sans font-light text-4xl sm:text-5xl text-[#fffaea] tracking-tight-hero">
              Engineered for autonomous runtime execution.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="rounded-[5.6px] border border-[#27272a] bg-[#09090b] p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-console text-[#62f6b5] mb-3">
                    MODULE 0{i + 1}
                  </div>
                  <h3 className="font-sans text-xl font-medium text-[#fffaea] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-[14px] text-[#71717a] leading-relaxed mb-6 font-sans">
                    {feature.description}
                  </p>
                </div>
                <div className="rounded-[5.6px] border border-[#27272a] bg-[#0e0e13] p-4 font-mono text-[11px] text-[#4dcafa] overflow-x-auto">
                  <pre className="whitespace-pre-wrap">{feature.code}</pre>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Hairline Divider */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-[1px] bg-[#27272a] w-full" />
        </div>

        {/* Marketplace Analytics & On-Chain Feed */}
        <section className="py-20 max-w-7xl mx-auto px-6">
          <div className="rounded-[5.6px] border border-[#27272a] bg-[#09090b] p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b border-[#27272a]">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-console text-[#71717a]">
                  CONSENSUS TELEMETRY
                </p>
                <h2 className="font-sans font-light text-3xl text-[#fffaea] mt-1 tracking-tight-hero">
                  Real-time Marketplace Activity
                </h2>
              </div>
              <div className="font-mono text-[11px] text-[#62f6b5] tracking-console uppercase">
                RPC STATUS: ACTIVE // ~1.2s LATENCY
              </div>
            </div>

            <MarketplaceAnalyticsCards />

            <div className="mt-8 pt-8 border-t border-[#27272a]">
              <div className="font-mono text-[11px] uppercase tracking-console text-[#71717a] mb-4">
                RECENT ON-CHAIN SETTLEMENTS
              </div>
              <MarketplaceActivityFeed limit={5} />
            </div>
          </div>
        </section>

        {/* Featured Prompts */}
        <section className="py-16 max-w-7xl mx-auto px-6">
          <FeaturedPrompts />
        </section>

        <section className="py-16 max-w-7xl mx-auto px-6">
          <FeaturedCreators />
        </section>

        {/* Developer CTA Section */}
        <section className="py-20 max-w-7xl mx-auto px-6">
          <div className="rounded-[5.6px] border border-[#27272a] bg-[#09090b] p-12 sm:p-16 text-center space-y-6">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-console text-[#e96b34]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e96b34]" />
              INSTANT SETTLEMENT
            </div>
            <h2 className="font-sans font-light text-4xl sm:text-5xl text-[#fffaea] max-w-2xl mx-auto tracking-tight-hero">
              Monetize agent workflows and system prompts on Stellar.
            </h2>
            <p className="text-[15px] text-[#71717a] max-w-lg mx-auto leading-relaxed">
              Create encrypted prompt licenses, configure revenue splits in stroops, and distribute to thousands of autonomous agents.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link
                to="/sell"
                className="inline-flex items-center gap-2 bg-[#e96b34] text-[#fffaea] font-mono text-[12px] font-medium tracking-console uppercase px-7 py-3 rounded-full hover:bg-[#d95d28] transition-colors"
              >
                PUBLISH PROMPT →
              </Link>
              <Link
                to="/browse"
                className="inline-flex items-center gap-2 bg-[#62f6b5] text-[#0e0e13] font-mono text-[12px] font-medium tracking-console uppercase px-7 py-3 rounded-full hover:bg-[#4fe29f] transition-colors"
              >
                BROWSE CATALOG
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 max-w-7xl mx-auto px-6">
          <FaqSection />
        </section>
      </main>

      <Footer />
      <OnboardingTour />
    </div>
  );
}
