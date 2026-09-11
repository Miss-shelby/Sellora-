import { useState, useEffect } from "react";
import { Wallet, LogOut, Loader2, AlertCircle, X } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";
import { useWalletBalance } from "@/hooks/useWalletBalance";
import { shortenAddress } from "@/lib/utils";
import { Button } from "./ui/button";
import { UserAvatar } from "./UserAvatar";

const DisplayWallet = () => {
  const { address, status, error, connect, disconnect } = useWallet();
  const { xlm, isLoading } = useWalletBalance();
  const [showModal, setShowModal] = useState(false);
  const [dismissedError, setDismissedError] = useState<string | null>(null);

  useEffect(() => {
    if (status !== "error") {
      setDismissedError(null);
    }
  }, [status]);

  // Auto-dismiss the wallet error popup after 5 seconds so it doesn't linger on screen
  useEffect(() => {
    if (status === "error" && error && dismissedError !== error) {
      const timer = setTimeout(() => {
        setDismissedError(error);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status, error, dismissedError]);

  const handleConnect = async (id: string) => {
    setShowModal(false);
    setDismissedError(null);
    await connect(id);
  };

  return (
    <div className="relative inline-flex items-center gap-2">
      {status === "error" && error && dismissedError !== error && (
        <div className="absolute top-full mt-2 right-0 w-max max-w-xs bg-[#09090b] border border-[#e96b34]/40 text-[#fffaea] font-mono text-xs pl-3 pr-2 py-2.5 rounded-[5.6px] shadow-2xl whitespace-normal z-50 flex items-start gap-2 backdrop-blur-md">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#e96b34]" />
          <span className="flex-1 leading-snug">{error}</span>
          <button
            onClick={() => setDismissedError(error)}
            className="text-[#71717a] hover:text-[#fffaea] transition-colors ml-1 p-0.5"
            aria-label="Dismiss error"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {(status === "idle" || status === "error") && (
        <Button
          onClick={() => {
            setDismissedError(null);
            setShowModal(true);
          }}
          className="rounded-full border border-[#27272a] bg-[#62f6b5] text-[#0e0e13] hover:bg-[#4fe29f] font-mono text-[11px] font-medium tracking-console uppercase px-5 py-1.5 h-auto shadow-none min-w-[140px]"
        >
          <Wallet className="mr-2 h-3.5 w-3.5 shrink-0" />
          Connect wallet
        </Button>
      )}

      {(status === "connecting") && (
        <Button disabled className="rounded-full border border-[#27272a] bg-[#18181b] text-[#71717a] font-mono text-[11px] tracking-console uppercase px-5 py-1.5 h-auto cursor-not-allowed min-w-[140px]">
          <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin shrink-0 text-[#62f6b5]" />
          Connecting...
        </Button>
      )}

      {status === "reconnecting" && (
        <div className="flex items-center space-x-2 px-3 py-1.5 font-mono text-xs text-[#71717a] min-w-[140px] justify-center">
          <Loader2 className="h-3.5 w-3.5 animate-spin shrink-0 text-[#62f6b5]" />
          <span>Restoring Session...</span>
        </div>
      )}

      {status === "connected" && address && (
        <div className="flex items-center gap-2">
          <div className="hidden rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-slate-100 md:block">
            {isLoading ? "Loading balance..." : `${xlm} XLM`}
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/15 bg-slate-950/50 pl-1 pr-3 py-1 text-sm text-slate-100">
            <UserAvatar address={address} size={24} />
            <span>{shortenAddress(address)}</span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="border border-white/10 text-slate-100 hover:bg-white/10 shrink-0"
            onClick={disconnect}
            title="Disconnect wallet"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      )}

      {showModal && (status === "idle" || status === "error") && (
        <div className="fixed inset-0 bg-[#0e0e13]/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#09090b] border border-[#27272a] rounded-[5.6px] p-6 shadow-2xl max-w-sm w-full">
            <h3 className="font-sans text-lg font-medium mb-1 text-[#fffaea]">Select a Wallet</h3>
            <p className="font-mono text-xs text-[#71717a] mb-5 uppercase tracking-console">Stellar Key Management</p>
            <div className="flex flex-col space-y-2.5">
              <Button variant="outline" onClick={() => void handleConnect("freighter")} className="w-full justify-start rounded-[5.6px] border-[#27272a] bg-[#18181b] text-[#fffaea] hover:bg-[#27272a] hover:text-white font-mono text-xs">
                Freighter
              </Button>
              <Button variant="outline" onClick={() => void handleConnect("albedo")} className="w-full justify-start rounded-[5.6px] border-[#27272a] bg-[#18181b] text-[#fffaea] hover:bg-[#27272a] hover:text-white font-mono text-xs">
                Albedo
              </Button>
              <Button variant="outline" onClick={() => void handleConnect("xbull")} className="w-full justify-start rounded-[5.6px] border-[#27272a] bg-[#18181b] text-[#fffaea] hover:bg-[#27272a] hover:text-white font-mono text-xs">
                xBull
              </Button>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="mt-5 w-full rounded-full border border-[#27272a] py-2 font-mono text-xs uppercase tracking-console text-[#71717a] hover:text-[#fffaea] hover:bg-[#18181b] transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayWallet;
