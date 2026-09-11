import { Link } from "react-router-dom";
import { ArrowUpRight, Star, Users } from "lucide-react";

interface FeaturedCreator {
  address: string;
  displayName: string;
  specialty: string;
  avatarUrl?: string;
  listingCount: number;
  totalSales: number;
  tagline: string;
}

const FEATURED_CREATORS: FeaturedCreator[] = [
  {
    address: "GAHJJJKMOKYE4RVPZEWZTKH5FVI4PA3VL7GK2LFNUBSGBV2KXPBDQJW",
    displayName: "CodeGuru",
    specialty: "Software Development",
    avatarUrl: "/images/codeguru.png",
    listingCount: 12,
    totalSales: 84,
    tagline: "Architecture reviews, code audits, and system design prompts for engineering teams.",
  },
  {
    address: "GBQNZKAQLWFAZS6RCQZFN2ESOVP4LJZULMZUOWXFTPKZXS6YXMMLDQJ",
    displayName: "MarketMind",
    specialty: "Marketing & Growth",
    avatarUrl: "/browse/campaign.png",
    listingCount: 8,
    totalSales: 61,
    tagline: "Campaign frameworks and multi-channel launch playbooks that convert.",
  },
  {
    address: "GD3DCFB4COYEELFNZPZM7TQXKCMFCNRNTBFHKJ4CWIQNZS7Q3BVQKC2",
    displayName: "FinanceCraft",
    specialty: "Finance & Analysis",
    avatarUrl: "/browse/finance.png",
    listingCount: 6,
    totalSales: 45,
    tagline: "Financial modeling, risk analysis, and investor communication templates.",
  },
];

function CreatorCard({ creator }: { creator: FeaturedCreator }) {
  return (
    <Link
      to={`/sellers/${encodeURIComponent(creator.address)}`}
      className="group flex flex-col rounded-[5.6px] border border-[#27272a] bg-[#09090b] p-5 transition-all duration-200 hover:border-[#3f3f46]"
    >
      {/* Avatar + name row */}
      <div className="flex items-center gap-3 mb-4">
        <div className="h-11 w-11 shrink-0 overflow-hidden rounded-[5.6px] border border-[#27272a] bg-[#18181b]">
          {creator.avatarUrl ? (
            <img
              src={creator.avatarUrl}
              alt={creator.displayName}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-mono text-sm font-bold text-[#fffaea]">
              {creator.displayName.slice(0, 1)}
            </div>
          )}
        </div>
        <div className="min-w-0">
          <p className="font-sans font-medium text-[#fffaea] group-hover:text-[#62f6b5] transition-colors truncate">
            {creator.displayName}
          </p>
          <p className="font-mono text-xs text-[#71717a] truncate">
            {creator.address.slice(0, 8)}…{creator.address.slice(-4)}
          </p>
        </div>
        <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-[#71717a] group-hover:text-[#62f6b5] transition-colors" />
      </div>

      {/* Specialty badge */}
      <span className="mb-3 inline-flex self-start rounded-full border border-[#27272a] bg-[#18181b] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-console text-[#62f6b5]">
        {creator.specialty}
      </span>

      {/* Tagline */}
      <p className="text-xs leading-relaxed text-[#71717a] flex-1 line-clamp-2">{creator.tagline}</p>

      {/* Stats row */}
      <div className="mt-4 flex items-center gap-4 border-t border-[#27272a] pt-3 font-mono text-[11px] text-[#71717a]">
        <span className="flex items-center gap-1.5">
          <Star className="h-3 w-3 text-[#e96b34]" />
          {creator.listingCount} listings
        </span>
        <span className="flex items-center gap-1.5">
          <Users className="h-3 w-3 text-[#62f6b5]" />
          {creator.totalSales} sales
        </span>
      </div>
    </Link>
  );
}

export function FeaturedCreators() {
  if (FEATURED_CREATORS.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-[5.6px] border border-[#27272a] bg-[#09090b] px-8 py-14 text-center">
          <Users className="mx-auto mb-4 h-8 w-8 text-[#71717a]" />
          <p className="font-sans text-base font-medium text-[#fffaea]">No featured creators yet</p>
          <p className="mt-1 font-mono text-xs text-[#71717a]">
            Check back soon as the community grows.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-console text-[#62f6b5] mb-1">
            CREATOR NETWORK
          </p>
          <h2 className="font-sans text-2xl font-light tracking-tight-hero text-[#fffaea] sm:text-3xl">Featured Authors</h2>
          <p className="mt-1 text-xs text-[#71717a]">
            Discover verified prompt architects and system instruction developers.
          </p>
        </div>
        <Link
          to="/browse"
          className="shrink-0 font-mono text-xs uppercase tracking-console text-[#71717a] hover:text-[#fffaea] transition-colors"
        >
          Browse all →
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURED_CREATORS.map((creator) => (
          <CreatorCard key={creator.address} creator={creator} />
        ))}
      </div>
    </section>
  );
}
