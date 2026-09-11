import React, { useEffect, useRef } from "react";
import { AlertCircle, CheckCircle, Loader2, X } from "lucide-react";
import { TransactionStatus } from "./TransactionProvider";

interface StatusBannerProps {
  status: TransactionStatus;
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
}

export const StatusBanner: React.FC<StatusBannerProps> = ({
  status,
  message,
  onRetry,
  onDismiss,
}) => {
  const retryButtonRef = useRef<HTMLButtonElement>(null);

  // Accessibility: Focus management on error recovery
  useEffect(() => {
    if (status === "error" && retryButtonRef.current) {
      retryButtonRef.current.focus();
    }
  }, [status]);

  if (status === "idle") return null;

  const baseClasses =
    "rounded-[5.6px] p-3.5 flex items-center gap-3 w-full shadow-2xl border backdrop-blur-md transition-all font-mono text-xs";
  const statusClasses = {
    pending: "bg-[#09090b]/95 border-[#27272a] text-[#fffaea]",
    success: "bg-[#09090b]/95 border-[#62f6b5]/40 text-[#62f6b5]",
    error: "bg-[#09090b]/95 border-[#e96b34]/40 text-[#fffaea]",
  };

  const icons = {
    pending: <Loader2 className="animate-spin h-4 w-4 text-[#62f6b5] shrink-0" />,
    success: <CheckCircle className="h-4 w-4 text-[#62f6b5] shrink-0" />,
    error: <AlertCircle className="h-4 w-4 text-[#e96b34] shrink-0" />,
  };

  return (
    <div
      className={`${baseClasses} ${statusClasses[status]}`}
      role="alert"
      aria-live="polite"
    >
      {icons[status]}
      <span className="flex-1 leading-snug">{message}</span>
      {status === "error" && onRetry && (
        <button
          ref={retryButtonRef}
          onClick={onRetry}
          className="retry-btn ml-auto px-2.5 py-1 text-xs font-medium rounded-full bg-[#e96b34] hover:bg-[#ff7a45] text-black transition-colors outline-none tracking-console uppercase"
        >
          Retry
        </button>
      )}
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="p-1 rounded-full text-[#71717a] hover:text-[#fffaea] hover:bg-[#18181b] transition-colors ml-1 shrink-0"
          aria-label="Dismiss alert"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
};