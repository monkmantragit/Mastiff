import { getDirectusAssetUrl } from './directus-utils';

/** Client logo shape and helpers. Client-safe: no data fetching (see client-logos-service.ts). */
export interface ClientLogo {
  id: number;
  client_name: string;
  Category: string;
  client_logo: string | null;
  status: string;
  sort: number;
}

// Local copies for known clients whose logo is missing in the CMS.
const FALLBACK_LOGOS: Record<string, string> = {
  'Microsoft': '/assets/images/clients/Microsoft.webp',
  'Amazon Web Services': '/assets/images/clients/Amazon-Web-services.webp',
  'GSK': '/assets/images/clients/GSK-1.png',
  'Coca-Cola': '/assets/images/clients/Coca-cola-1.png',
  'Ericsson': '/assets/images/clients/Ericsson.webp',
  'Hitachi': '/assets/images/clients/Hitachi.png',
  'TVS': '/assets/images/clients/TVS.png',
  'The New York Times': '/assets/images/clients/The-new-york-times-1.png',
  'KLM': '/assets/images/clients/KLM-1.png',
  'ABB': '/assets/images/clients/ABB.png',
  'EMC': '/assets/images/clients/EMC.webp',
  'NetApp': '/assets/images/clients/Netapp.webp',
  'Envestnet Yodlee': '/assets/images/clients/Envestnet-Yodlee.webp',
  'Microchip': '/assets/images/clients/Microchip.webp',
  'Tekion': '/assets/images/clients/Tekion.png',
};

/** Directus logo first, then the local fallback for known clients. */
export function getBestLogoUrl(client: ClientLogo): string | null {
  if (client.client_logo) return getDirectusAssetUrl(client.client_logo) || null;
  return FALLBACK_LOGOS[client.client_name] || null;
}

/** Industry list with counts, derived from the logos already loaded. */
export function getIndustryCategories(logos: ClientLogo[]): Array<{ category: string; count: number }> {
  const counts = new Map<string, number>();
  for (const logo of logos) {
    if (!logo.Category) continue;
    counts.set(logo.Category, (counts.get(logo.Category) || 0) + 1);
  }
  return [...counts.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([category, count]) => ({ category, count }));
}
