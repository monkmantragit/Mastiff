/**
 * Utility functions for Directus asset handling
 */

/**
 * Get the full URL for a Directus asset
 * Handles both string IDs and object with id property
 */
export function getDirectusAssetUrl(asset: string | { id: string } | null | undefined): string | undefined {
  if (!asset) return undefined;
  
  const baseUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL;
  const token = process.env.NEXT_PUBLIC_DIRECTUS_TOKEN;
  
  if (!baseUrl) {
    console.error('NEXT_PUBLIC_DIRECTUS_URL is not defined');
    return undefined;
  }
  
  // Extract the ID from the asset
  const assetId = typeof asset === 'string' ? asset : asset.id;
  
  if (!assetId) return undefined;
  
  // If the asset already starts with http, return as is
  if (assetId.startsWith('http://') || assetId.startsWith('https://')) {
    return assetId;
  }
  
  // If the asset starts with /assets, remove it to avoid duplication
  const cleanId = assetId.startsWith('/assets/') 
    ? assetId.replace('/assets/', '') 
    : assetId;
  
  // Construct the full URL with access token if available
  const url = `${baseUrl}/assets/${cleanId}`;
  
  return token ? `${url}?access_token=${token}` : url;
}

/**
 * Transform an array of assets to full URLs
 */
export function getDirectusAssetUrls(assets: (string | { id: string })[] | undefined): string[] {
  if (!assets || !Array.isArray(assets)) return [];
  
  return assets
    .map(asset => getDirectusAssetUrl(asset))
    .filter((url): url is string => url !== undefined);
}