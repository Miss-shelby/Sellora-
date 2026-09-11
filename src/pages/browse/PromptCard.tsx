import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Bookmark,
  BookmarkCheck,
  Check,
  LockKeyhole,
  Plus,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StarRating } from "@/components/prompts/StarRating";
import {
  CreatorReputationSummary,
  CreatorVerifiedBadge,
} from "@/components/reputation/CreatorReputationBadge";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ReviewClient } from "@/lib/reviews/reviewClient";
import {
  getCreatorDisplayName,
  getCreatorProfile,
} from "@/lib/profiles/creatorProfile";
import { buildCreatorReputation } from "@/lib/reputation/creatorReputation";
import { formatPriceLabel } from "@/lib/stellar/format";
import type { PromptRecord } from "@/lib/stellar/SelloraClient";
import { useQuery } from "@tanstack/react-query";

const shortenAddress = (address: string) =>
  address.length > 14 ? `${address.slice(0, 6)}...${address.slice(-4)}` : address;

export const PromptCard = ({
  prompt,
  hasAccess,
  openModal,
  isSaved,
  isSaving,
  onToggleSave,
  isCompared = false,
  onToggleCompare,
}: {
  prompt: PromptRecord;
  hasAccess: boolean;
  // eslint-disable-next-line no-unused-vars
  openModal: (_prompt: PromptRecord) => void;
  isSaved: boolean;
  isSaving: boolean;
  // eslint-disable-next-line no-unused-vars
  onToggleSave: (_prompt: PromptRecord) => void;
  isCompared?: boolean;
  // eslint-disable-next-line no-unused-vars
  onToggleCompare?: (_prompt: PromptRecord) => void;
}) => {
  const reducedMotion = useReducedMotion();
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const isBestSeller = prompt.salesCount >= 10;
  const creatorProfile = getCreatorProfile(prompt.creator);
  const creatorName = getCreatorDisplayName(prompt.creator, creatorProfile);
  const reputation = buildCreatorReputation(prompt.creator, [prompt]);

  const hoverProps = reducedMotion
    ? {}
    : {
        whileHover: { y: -3 },
        transition: { duration: 0.2 },
      };

  const { data: reviewStats } = useQuery({
    queryKey: ["review-stats", prompt.id.toString()],
    queryFn: () => ReviewClient.getReviewStats(prompt.id.toString()),
    staleTime: 60_000,
  });

  return (
    <motion.div {...hoverProps}>
      <Card
        className={`group relative flex flex-col cursor-pointer overflow-hidden rounded-[5.6px] border ${
          isCompared
            ? "border-[#e96b34] bg-[#09090b]"
            : "border-[#27272a] bg-[#09090b] hover:border-[#3f3f46]"
        } transition-colors`}
        onClick={() => openModal(prompt)}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openModal(prompt);
          }
        }}
        aria-label={`Open ${prompt.title}`}
      >
        {/* Visual Header */}
        <div className="relative aspect-[16/10] overflow-hidden bg-[#0e0e13] border-b border-[#27272a]">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#18181b] animate-pulse" />
          )}
          <img
            src={
              imageError
                ? "/images/codeguru.png"
                : prompt.imageUrl || "/images/codeguru.png"
            }
            alt={prompt.title}
            loading="lazy"
            decoding="async"
            width={400}
            height={250}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(true);
            }}
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent opacity-75" />

          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            <Badge className="rounded-[5.6px] border border-[#27272a] bg-[#09090b]/90 text-[#fffaea] font-mono text-[10px] uppercase tracking-console backdrop-blur-sm">
              {prompt.category || "General"}
            </Badge>
            {isBestSeller && (
              <Badge className="rounded-[5.6px] border-none bg-[#e96b34] text-[#fffaea] font-mono text-[10px] uppercase tracking-console font-medium">
                <TrendingUp className="mr-1 h-3 w-3" /> Popular
              </Badge>
            )}
            {reputation.verified && (
              <Badge className="rounded-[5.6px] border-none bg-[#62f6b5] text-[#0e0e13] font-mono text-[10px] uppercase tracking-console font-medium">
                <ShieldCheck className="mr-1 h-3 w-3" /> Verified
              </Badge>
            )}
          </div>

          <div className="absolute right-3 top-3 z-10 flex flex-col items-end gap-1.5">
            <Button
              size="sm"
              variant="secondary"
              className={`h-7 rounded-full border px-3 text-[11px] font-mono tracking-console uppercase transition-all ${
                isSaved
                  ? "border-[#e96b34] bg-[#e96b34] text-[#fffaea] font-medium"
                  : "border-[#27272a] bg-[#09090b]/90 text-[#fffaea] hover:bg-[#18181b]"
              }`}
              disabled={isSaving}
              onClick={(event) => {
                event.stopPropagation();
                onToggleSave(prompt);
              }}
            >
              {isSaved ? (
                <BookmarkCheck className="mr-1 h-3 w-3 text-[#fffaea]" />
              ) : (
                <Bookmark className="mr-1 h-3 w-3" />
              )}
              {isSaved ? "Saved" : "Save"}
            </Button>
            {onToggleCompare && (
              <Button
                size="sm"
                variant="secondary"
                className={`h-7 rounded-full border px-3 text-[11px] font-mono tracking-console uppercase ${
                  isCompared
                    ? "border-[#62f6b5] bg-[#62f6b5] text-[#0e0e13] font-medium"
                    : "border-[#27272a] bg-[#09090b]/90 text-[#fffaea] hover:bg-[#18181b]"
                }`}
                onClick={(event) => {
                  event.stopPropagation();
                  onToggleCompare(prompt);
                }}
              >
                {isCompared ? (
                  <Check className="mr-1 h-3 w-3" />
                ) : (
                  <Plus className="mr-1 h-3 w-3" />
                )}
                {isCompared ? "Selected" : "Compare"}
              </Button>
            )}
          </div>
        </div>

        <CardContent className="flex flex-1 flex-col p-5">
          {/* Status Row */}
          <div className="mb-3 flex flex-wrap gap-2">
            {prompt.active ? (
              <span
                className="inline-flex items-center gap-1.5 rounded-[5.6px] border border-[#27272a] bg-[#09090b] px-2.5 py-0.5 text-[11px] font-mono tracking-console text-[#62f6b5]"
                data-testid="badge-active"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#62f6b5]" />
                ACTIVE
              </span>
            ) : (
              <span
                className="inline-flex items-center gap-1.5 rounded-[5.6px] border border-[#27272a] bg-[#09090b] px-2.5 py-0.5 text-[11px] font-mono tracking-console text-[#71717a]"
                data-testid="badge-inactive"
              >
                ARCHIVED
              </span>
            )}

            {hasAccess ? (
              <span
                className="inline-flex items-center gap-1.5 rounded-[5.6px] border border-[#27272a] bg-[#09090b] px-2.5 py-0.5 text-[11px] font-mono tracking-console text-[#e96b34]"
                data-testid="badge-purchased"
              >
                LICENSED
              </span>
            ) : (
              <span
                className="inline-flex items-center gap-1.5 rounded-[5.6px] border border-[#27272a] bg-[#09090b] px-2.5 py-0.5 text-[11px] font-mono tracking-console text-[#a1a1aa]"
                data-testid="badge-unlockable"
              >
                AVAILABLE
              </span>
            )}

            {prompt.contentHash && (
              <span
                className="inline-flex items-center gap-1.5 rounded-[5.6px] border border-[#27272a] bg-[#09090b] px-2.5 py-0.5 text-[11px] font-mono tracking-console text-[#71717a]"
                data-testid="badge-verified"
                title="Integrity verified on Stellar"
              >
                <ShieldCheck className="h-3 w-3 text-[#62f6b5]" />
                ON-CHAIN
              </span>
            )}
          </div>

          <div className="flex-1 space-y-2.5">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-[17px] font-sans font-medium leading-snug text-[#fffaea] transition-colors group-hover:text-[#e96b34]">
                {prompt.title}
              </h3>
              <div className="shrink-0 text-right">
                <p
                  className="font-mono text-lg font-medium text-[#fffaea] tabular-nums"
                  aria-label={`Price: ${formatPriceLabel(prompt.priceStroops)}`}
                  data-testid="price-label"
                >
                  {formatPriceLabel(prompt.priceStroops)}
                </p>
                <p className="font-mono text-[9px] uppercase tracking-console text-[#71717a]">
                  LICENSE
                </p>
              </div>
            </div>

            <p className="line-clamp-2 text-[13px] font-normal leading-relaxed text-[#71717a]">
              {prompt.previewText || "Verified encrypted workflow payload."}
            </p>

            {/* Review Score Display */}
            <div className="pt-1">
              {reviewStats && reviewStats.total > 0 ? (
                <div className="flex items-center gap-2">
                  <StarRating
                    rating={reviewStats.averageRating}
                    readonly
                    size="sm"
                    showCount
                    reviewCount={reviewStats.total}
                  />
                  <span className="font-mono text-[11px] text-[#71717a]">
                    {reviewStats.averageRating.toFixed(1)}
                  </span>
                </div>
              ) : (
                <span className="font-mono text-[11px] text-[#71717a] uppercase tracking-console">
                  NEW LISTING
                </span>
              )}
            </div>
          </div>

          {/* Footer Info Row */}
          <div className="mt-5 space-y-2 border-t border-[#27272a] pt-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#62f6b5]" />
                <Link
                  to={`/sellers/${encodeURIComponent(prompt.creator)}`}
                  className="truncate font-mono text-[11px] text-[#71717a] transition-colors hover:text-[#fffaea]"
                  onClick={(event) => event.stopPropagation()}
                  aria-label={`View seller ${creatorName}`}
                  title={prompt.creator}
                >
                  {creatorName || shortenAddress(prompt.creator)}
                </Link>
                {hasAccess ? (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 rounded-full px-2 font-mono text-[10px] uppercase tracking-console text-[#62f6b5] hover:bg-[#18181b]"
                  >
                    Owned <ArrowUpRight className="ml-1 h-3 w-3" />
                  </Button>
                ) : (
                  <div className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-console text-[#71717a]">
                    <LockKeyhole className="h-3 w-3" /> Locked
                  </div>
                )}
              </div>
              <CreatorVerifiedBadge reputation={reputation} compact />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
