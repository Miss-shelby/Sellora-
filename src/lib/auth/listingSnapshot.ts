import { sha256 } from "js-sha256";

export interface ListingSnapshot {
  promptId: string;
  owner: string;
  priceStroops: string;
  asset: string;
  version: string;
  expiresAt: string;
}

/**
 * Deterministic SHA-256 hash of a listing snapshot.
 * Safe for both browser and Node.js environments.
 */
export function computeListingSnapshotHash(snapshot: ListingSnapshot): string {
  const normalize = (value: unknown): string =>
    value === undefined || value === null ? "" : String(value).trim();
  const parts = [
    normalize(snapshot.promptId),
    normalize(snapshot.owner).toLowerCase(),
    normalize(snapshot.priceStroops),
    normalize(snapshot.asset).toLowerCase(),
    normalize(snapshot.version),
    normalize(snapshot.expiresAt),
  ];
  const canonical = "listing|" + parts.join("|");
  return sha256(canonical);
}
