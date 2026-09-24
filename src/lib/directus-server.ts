import 'server-only';

/**
 * Server-only access to Directus.
 *
 * The Directus token must never reach the browser. It used to be read from
 * NEXT_PUBLIC_DIRECTUS_TOKEN inside modules that client components imported, which made
 * Next.js inline it into the public JavaScript bundles and into ?access_token= asset URLs.
 *
 * Every Directus request now goes through this module. `import 'server-only'` makes the
 * build fail if a client component ever imports it again.
 *
 * Token lookup order: DIRECTUS_TOKEN (preferred), then NEXT_PUBLIC_DIRECTUS_TOKEN as a
 * temporary fallback so the current Railway deployment keeps working until the variable
 * is renamed. Reading the NEXT_PUBLIC_ name here is safe because this file is never
 * bundled for the client, but rename it anyway and delete the old variable.
 */

const DEFAULT_TIMEOUT_MS = 8000;

let warnedAboutLegacyToken = false;

export function getDirectusConfig(): { url: string; token: string } | null {
  const url = (process.env.DIRECTUS_URL || process.env.NEXT_PUBLIC_DIRECTUS_URL || '').replace(/\/+$/, '');
  let token = process.env.DIRECTUS_TOKEN || '';

  if (!token && process.env.NEXT_PUBLIC_DIRECTUS_TOKEN) {
    token = process.env.NEXT_PUBLIC_DIRECTUS_TOKEN;
    if (!warnedAboutLegacyToken) {
      warnedAboutLegacyToken = true;
      console.warn(
        '[directus] Using NEXT_PUBLIC_DIRECTUS_TOKEN. Rename it to DIRECTUS_TOKEN in the deployment environment.'
      );
    }
  }

  if (!url || !token) return null;
  return { url, token };
}

type QueryValue = string | number | boolean | object | undefined;

function buildQuery(params: Record<string, QueryValue>): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue;
    search.set(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
  }
  const qs = search.toString();
  return qs ? `?${qs}` : '';
}

export interface DirectusRequestOptions {
  method?: 'GET' | 'POST';
  body?: unknown;
  /** Seconds to cache GET responses in the Next.js data cache. Ignored for POST. */
  revalidate?: number | false;
  timeoutMs?: number;
}

/**
 * Low-level request. Throws on configuration errors, non-2xx responses and timeouts.
 * `path` is relative to the Directus base URL, e.g. `/items/blog`.
 */
export async function directusRequest<T = unknown>(
  path: string,
  params: Record<string, QueryValue> = {},
  options: DirectusRequestOptions = {}
): Promise<T> {
  const config = getDirectusConfig();
  if (!config) {
    throw new Error('Directus is not configured (DIRECTUS_URL / DIRECTUS_TOKEN)');
  }

  const method = options.method || 'GET';
  const init: RequestInit & { next?: { revalidate?: number | false } } = {
    method,
    headers: {
      Authorization: `Bearer ${config.token}`,
      'Content-Type': 'application/json',
    },
    signal: AbortSignal.timeout(options.timeoutMs ?? DEFAULT_TIMEOUT_MS),
  };

  if (method === 'POST' || options.revalidate === 0) {
    // POSTs and reads that must be fresh (e.g. duplicate checks) bypass the data cache.
    // Note: revalidate `false` would mean "cache forever", never use it for those.
    if (method === 'POST') init.body = JSON.stringify(options.body ?? {});
    init.cache = 'no-store';
  } else if (options.revalidate !== undefined) {
    init.next = { revalidate: options.revalidate };
  }

  const response = await fetch(`${config.url}${path}${buildQuery(params)}`, init);

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new Error(`Directus ${method} ${path} failed: ${response.status} ${detail.slice(0, 300)}`);
  }

  return (await response.json()) as T;
}

const isBuildPhase = () => process.env.NEXT_PHASE === 'phase-production-build';

/**
 * Fetch a list of items from a collection.
 *
 * On failure:
 * - during `next build` it returns [] so a CMS outage cannot block a deploy (the page
 *   is rebuilt on the next hourly revalidation);
 * - at runtime it throws, so ISR keeps serving the last good page instead of caching
 *   an empty team/clients/portfolio page or a sitemap with no blog URLs for an hour.
 */
export async function directusItems<T>(
  collection: string,
  params: Record<string, QueryValue> = {},
  revalidate: number | false = 3600
): Promise<T[]> {
  try {
    const result = await directusRequest<{ data?: T[] }>(`/items/${collection}`, params, { revalidate });
    return Array.isArray(result?.data) ? result.data : [];
  } catch (error) {
    console.error(`[directus] Failed to load ${collection}:`, error instanceof Error ? error.message : error);
    if (isBuildPhase()) return [];
    throw error;
  }
}

/**
 * Like directusItems, but throws when Directus cannot be reached instead of returning [].
 * Use for single-page lookups (blog post, service, landing page): an empty result there
 * means "404", and during a CMS outage a cached page must not be revalidated into a 404.
 * Throwing during ISR revalidation keeps serving the last good version.
 */
export async function directusItemsStrict<T>(
  collection: string,
  params: Record<string, QueryValue> = {},
  revalidate: number | false = 3600
): Promise<T[]> {
  const result = await directusRequest<{ data?: T[] }>(`/items/${collection}`, params, { revalidate });
  return Array.isArray(result?.data) ? result.data : [];
}

/** Create an item. Throws on failure so callers can decide how to recover. */
export async function directusCreate<T = unknown>(collection: string, data: unknown): Promise<T> {
  return directusRequest<T>(`/items/${collection}`, {}, { method: 'POST', body: data });
}
