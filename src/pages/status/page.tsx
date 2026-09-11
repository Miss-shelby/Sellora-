import { useEffect, useState } from "react";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  RefreshCw,
  ServerCrash,
  Wifi,
  XCircle,
} from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type ServiceStatus = "up" | "degraded" | "down";

interface ServiceCheck {
  name: string;
  status: ServiceStatus;
  latencyMs: number | null;
  error?: string;
}

interface ProbeResult {
  name: string;
  status: "healthy" | "degraded" | "down";
  latencyMs: number;
  error?: string;
  details?: Record<string, unknown>;
  timestamp: string;
}

interface StatusResponse {
  status: ServiceStatus;
  timestamp: string;
  uptime: number;
  services: ServiceCheck[];
  probes?: ProbeResult[];
  indexer?: {
    lastIndexedLedger: number;
    status: string;
  };
}

function overallColor(status: ServiceStatus) {
  if (status === "up") return "emerald";
  if (status === "degraded") return "amber";
  return "rose";
}

function StatusIcon({ status }: { status: ServiceStatus }) {
  if (status === "up") return <CheckCircle2 className="h-5 w-5 text-emerald-400" />;
  if (status === "degraded") return <AlertTriangle className="h-5 w-5 text-amber-400" />;
  return <XCircle className="h-5 w-5 text-rose-400" />;
}

function LatencyBar({ latencyMs }: { latencyMs: number | null }) {
  if (latencyMs === null) return <span className="text-xs text-slate-500">—</span>;
  const color = latencyMs < 300 ? "bg-emerald-400" : latencyMs < 1000 ? "bg-amber-400" : "bg-rose-400";
  const width = Math.min(100, (latencyMs / 2000) * 100);
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-24 rounded-full bg-white/10 overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${width}%` }} />
      </div>
      <span className="text-xs tabular-nums text-slate-400">{latencyMs} ms</span>
    </div>
  );
}

function ProbeRow({ probe }: { probe: ProbeResult }) {
  const status: ServiceStatus = probe.status === "healthy" ? "up" : probe.status === "degraded" ? "degraded" : "down";

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-[5.6px] border border-[#27272a] bg-[#09090b] px-5 py-4">
      <StatusIcon status={status} />
      <div className="flex-1 min-w-0">
        <p className="font-mono text-sm font-medium text-[#fffaea] capitalize">{probe.name.replace(/_/g, " ")}</p>
        {probe.error && (
          <p className="mt-0.5 text-xs text-[#e96b34] truncate">{probe.error}</p>
        )}
        {probe.details && Object.keys(probe.details).length > 0 && (
          <details className="mt-2">
            <summary className="cursor-pointer font-mono text-xs text-[#71717a] hover:text-[#fffaea]">
              View details
            </summary>
            <pre className="mt-2 rounded-[5.6px] bg-[#18181b] p-3 font-mono text-xs text-[#a1a1aa] overflow-x-auto border border-[#27272a]">
              {JSON.stringify(probe.details, null, 2)}
            </pre>
          </details>
        )}
      </div>
      <LatencyBar latencyMs={probe.latencyMs} />
      <span
        className={`rounded-full px-2.5 py-0.5 text-[11px] font-mono uppercase tracking-[0.08em] ${
          status === "up"
            ? "border border-[#62f6b5]/30 bg-[#62f6b5]/10 text-[#62f6b5]"
            : status === "degraded"
              ? "border border-[#ffdd03]/30 bg-[#ffdd03]/10 text-[#ffdd03]"
              : "border border-[#e96b34]/30 bg-[#e96b34]/10 text-[#e96b34]"
        }`}
      >
        {probe.status}
      </span>
    </div>
  );
}

function ServiceRow({ service }: { service: ServiceCheck }) {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-[5.6px] border border-[#27272a] bg-[#09090b] px-5 py-4">
      <StatusIcon status={service.status} />
      <div className="flex-1 min-w-0">
        <p className="font-mono text-sm font-medium text-[#fffaea]">{service.name}</p>
        {service.error && (
          <p className="mt-0.5 text-xs text-[#e96b34] truncate">{service.error}</p>
        )}
      </div>
      <LatencyBar latencyMs={service.latencyMs} />
      <span
        className={`rounded-full px-2.5 py-0.5 text-[11px] font-mono uppercase tracking-[0.08em] ${
          service.status === "up"
            ? "border border-[#62f6b5]/30 bg-[#62f6b5]/10 text-[#62f6b5]"
            : service.status === "degraded"
              ? "border border-[#ffdd03]/30 bg-[#ffdd03]/10 text-[#ffdd03]"
              : "border border-[#e96b34]/30 bg-[#e96b34]/10 text-[#e96b34]"
        }`}
      >
        {service.status}
      </span>
    </div>
  );
}

function UptimeStat({ seconds }: { seconds: number }) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return (
    <span className="tabular-nums font-mono">
      {h > 0 ? `${h}h ` : ""}
      {m > 0 ? `${m}m ` : ""}
      {s}s
    </span>
  );
}

export default function StatusPage() {
  const [data, setData] = useState<StatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/status");
      if (res.ok) {
        const json = (await res.json()) as StatusResponse;
        setData(json);
      }
    } finally {
      setLoading(false);
      setLastChecked(new Date());
    }
  };

  useEffect(() => {
    void fetchStatus();
    const interval = setInterval(() => void fetchStatus(), 30_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0e0e13] text-[#fffaea]">
      <Navigation />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-[5.6px] border border-[#27272a] bg-[#09090b] text-[#62f6b5]">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-sans text-2xl font-light tracking-[-0.64px] text-[#fffaea]">System Status</h1>
            <p className="font-mono text-xs text-[#71717a] uppercase tracking-[0.08em]">Stellar RPC · Horizon · Unlock Engine</p>
          </div>
        </div>

        {/* Overall banner */}
        {data && (
          <div
            className={`mt-6 flex items-center gap-4 rounded-[5.6px] border px-6 py-5 ${data.status === "up"
                ? "border-[#62f6b5]/30 bg-[#09090b]"
                : data.status === "degraded"
                  ? "border-[#ffdd03]/30 bg-[#09090b]"
                  : "border-[#e96b34]/30 bg-[#09090b]"
              }`}
          >
            {data.status === "up" ? (
              <CheckCircle2 className="h-7 w-7 shrink-0 text-[#62f6b5]" />
            ) : data.status === "degraded" ? (
              <AlertTriangle className="h-7 w-7 shrink-0 text-[#ffdd03]" />
            ) : (
              <ServerCrash className="h-7 w-7 shrink-0 text-[#e96b34]" />
            )}
            <div>
              <p className={`font-sans text-base font-medium ${data.status === "up" ? "text-[#fffaea]" : data.status === "degraded" ? "text-[#ffdd03]" : "text-[#e96b34]"
                }`}>
                {data.status === "up"
                  ? "All systems operational"
                  : data.status === "degraded"
                    ? "Some systems are degraded"
                    : "Outage detected"}
              </p>
              <p className="font-mono text-xs text-[#71717a]">
                Last checked: {lastChecked?.toLocaleTimeString() ?? "—"}
              </p>
            </div>
            <button
              className="ml-auto h-9 rounded-full border border-[#27272a] bg-[#18181b] px-4 font-mono text-xs uppercase tracking-[0.08em] text-[#fffaea] hover:bg-[#27272a] transition-colors flex items-center gap-2"
              onClick={() => void fetchStatus()}
              disabled={loading}
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        )}

        {/* Service list */}
        <section className="mt-8 space-y-3">
          <h2 className="font-mono text-xs uppercase tracking-[0.08em] text-[#71717a]">External Services</h2>
          {loading && !data ? (
            <div className="flex items-center gap-3 py-10 font-mono text-xs text-[#71717a]">
              <RefreshCw className="h-4 w-4 animate-spin text-[#62f6b5]" />
              Checking service health…
            </div>
          ) : data ? (
            data.services.map((service) => (
              <ServiceRow key={service.name} service={service} />
            ))
          ) : (
            <p className="font-mono text-xs text-[#71717a]">Could not load status.</p>
          )}
        </section>

        {/* Health Probes */}
        {data?.probes && data.probes.length > 0 && (
          <section className="mt-10 space-y-3">
            <div className="flex items-center gap-2">
              <h2 className="font-mono text-xs uppercase tracking-[0.08em] text-[#71717a]">Health Probes</h2>
              <span className="rounded-full border border-[#27272a] bg-[#18181b] px-2 py-0.5 font-mono text-[10px] text-[#62f6b5]">
                Synthetic
              </span>
            </div>
            <p className="font-mono text-xs text-[#71717a] mb-3">
              Read-only checks exercising core marketplace workflows without mutating state
            </p>
            {data.probes.map((probe) => (
              <ProbeRow key={probe.name} probe={probe} />
            ))}
          </section>
        )}

        {/* Indexer Status */}
        {data?.indexer && (
          <section className="mt-10">
            <h2 className="font-mono text-xs uppercase tracking-[0.08em] text-[#71717a] mb-3">Indexer</h2>
            <div className="rounded-[5.6px] border border-[#27272a] bg-[#09090b] px-5 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono text-sm font-medium text-[#fffaea]">Event Indexer</p>
                  <p className="mt-1 font-mono text-xs text-[#71717a]">
                    Last indexed ledger: {data.indexer.lastIndexedLedger.toLocaleString()}
                  </p>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-[0.08em] ${
                  data.indexer.status === "active"
                    ? "border border-[#62f6b5]/30 bg-[#62f6b5]/10 text-[#62f6b5]"
                    : "border border-[#27272a] bg-[#18181b] text-[#71717a]"
                }`}>
                  {data.indexer.status}
                </span>
              </div>
            </div>
          </section>
        )}

        {/* Meta */}
        {data && (
          <div className="mt-8 flex flex-wrap gap-6 rounded-[5.6px] border border-[#27272a] bg-[#09090b] px-5 py-4 font-mono text-xs text-[#71717a]">
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-[#62f6b5]" />
              Uptime: <span className="text-[#fffaea]"><UptimeStat seconds={data.uptime} /></span>
            </div>
            <div className="flex items-center gap-2">
              <Wifi className="h-3.5 w-3.5 text-[#62f6b5]" />
              Auto-refreshes every 30 s
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
