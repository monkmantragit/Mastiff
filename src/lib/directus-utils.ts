/**
 * Directus asset URLs.
 *
 * Assets are served through this site's own /api/assets/<id> route, which adds the
 * Directus token on the server. URLs never carry ?access_token=, so the token cannot
 * leak through page HTML, image requests or the browser's network tab.
 *
 * Safe to import from client components: it reads no secrets.
 */

export type DirectusAsset = string | { id: string } | null | undefined;

/** Query params the asset proxy forwards to Directus (image transforms). */
export type AssetTransform = {
  width?: number;
  height?: number;
  quality?: number;
  fit?: 'cover' | 'contain' | 'inside' | 'outside';
  format?: 'jpg' | 'png' | 'webp' | 'avif';
  key?: string;
};

export function getAssetId(asset: DirectusAsset): string | undefined {
  if (!asset) return undefined;
  const raw = typeof asset === 'string' ? asset : asset.id;
  if (!raw) return undefined;
  return raw.replace(/^\/?assets\//, '');
}

/**
 * Relative URL for a Directus asset, e.g. `/api/assets/<uuid>?width=600`.
 * Absolute http(s) values are returned unchanged.
 */
export function getDirectusAssetUrl(asset: DirectusAsset, transform?: AssetTransform): string | undefined {
  const id = getAssetId(asset);
  if (!id) return undefined;
  if (/^https?:\/\//.test(id)) return id;

  const params = new URLSearchParams();
  if (transform) {
    for (const [key, value] of Object.entries(transform)) {
      if (value !== undefined && value !== null) params.set(key, String(value));
    }
  }
  const qs = params.toString();
  return `/api/assets/${encodeURIComponent(id)}${qs ? `?${qs}` : ''}`;
}

/** Absolute asset URL, for metadata and structured data that require one. */
export function getAbsoluteAssetUrl(asset: DirectusAsset, siteUrl: string, transform?: AssetTransform): string | undefined {
  const url = getDirectusAssetUrl(asset, transform);
  if (!url) return undefined;
  return /^https?:\/\//.test(url) ? url : `${siteUrl.replace(/\/+$/, '')}${url}`;
}

/** Transform an array of assets to URLs. */
export function getDirectusAssetUrls(assets: DirectusAsset[] | undefined, transform?: AssetTransform): string[] {
  if (!assets || !Array.isArray(assets)) return [];
  return assets
    .map(asset => getDirectusAssetUrl(asset, transform))
    .filter((url): url is string => url !== undefined);
}
