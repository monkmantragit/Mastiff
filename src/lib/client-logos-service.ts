export interface ClientLogo {
  id: number;
  client_name: string;
  Category: string;
  client_logo: string | null;
  status: string;
  sort: number;
}

export interface ClientLogosResponse {
  data: ClientLogo[];
  meta?: {
    total_count?: number;
    filter_count?: number;
  };
}

export interface IndustryCount {
  Category: string;
  count: {
    Category: string;
  };
}

export class ClientLogosService {
  private static readonly BASE_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL;
  private static readonly TOKEN = process.env.NEXT_PUBLIC_DIRECTUS_TOKEN;

  private static getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.TOKEN}`
    };
  }

  /**
   * Get all client logos (both published and draft)
   */
  static async getAllClientLogos(): Promise<ClientLogo[]> {
    try {
      const response = await fetch(
        `${this.BASE_URL}/items/client_logos?fields=id,client_name,Category,client_logo,status,sort&sort=sort`,
        {
          headers: this.getHeaders(),
          next: { revalidate: 3600 } // Cache for 1 hour
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ClientLogosResponse = await response.json();
      return result.data || [];
    } catch (error) {
      console.error('Error fetching client logos:', error);
      return [];
    }
  }

  /**
   * Get client logos filtered by industry
   */
  static async getClientLogosByIndustry(industry: string): Promise<ClientLogo[]> {
    try {
      const response = await fetch(
        `${this.BASE_URL}/items/client_logos?fields=id,client_name,Category,client_logo,status,sort&filter[Category][_eq]=${encodeURIComponent(industry)}&sort=sort`,
        {
          headers: this.getHeaders(),
          next: { revalidate: 3600 } // Cache for 1 hour
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ClientLogosResponse = await response.json();
      return result.data || [];
    } catch (error) {
      console.error('Error fetching client logos by industry:', error);
      return [];
    }
  }

  /**
   * Get all industry categories with client counts
   */
  static async getIndustryCategories(): Promise<Array<{ category: string; count: number }>> {
    try {
      const response = await fetch(
        `${this.BASE_URL}/items/client_logos?aggregate[count]=Category&groupBy=Category&sort=Category`,
        {
          headers: this.getHeaders(),
          next: { revalidate: 3600 } // Cache for 1 hour
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: { data: IndustryCount[] } = await response.json();
      return (result.data || []).map(item => ({
        category: item.Category,
        count: parseInt(item.count.Category)
      }));
    } catch (error) {
      console.error('Error fetching industry categories:', error);
      return [];
    }
  }

  /**
   * Get client logo image URL
   */
  static getClientLogoUrl(logoId: string | null): string | null {
    if (!logoId) return null;
    return `${this.BASE_URL}/assets/${logoId}?access_token=${this.TOKEN}`;
  }

  /**
   * Get total client count
   */
  static async getTotalClientCount(): Promise<number> {
    try {
      const response = await fetch(
        `${this.BASE_URL}/items/client_logos?aggregate[count]=id`,
        {
          headers: this.getHeaders(),
          next: { revalidate: 3600 } // Cache for 1 hour
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return parseInt(result.data?.[0]?.count?.id || '0');
    } catch (error) {
      console.error('Error fetching total client count:', error);
      return 0;
    }
  }

  /**
   * Search clients by name
   */
  static async searchClients(searchTerm: string): Promise<ClientLogo[]> {
    try {
      const response = await fetch(
        `${this.BASE_URL}/items/client_logos?fields=id,client_name,Category,client_logo,status,sort&filter[client_name][_icontains]=${encodeURIComponent(searchTerm)}&sort=sort`,
        {
          headers: this.getHeaders(),
          next: { revalidate: 3600 } // Cache for 1 hour
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ClientLogosResponse = await response.json();
      return result.data || [];
    } catch (error) {
      console.error('Error searching clients:', error);
      return [];
    }
  }

  /**
   * Get fallback logo URL for clients without Directus logos
   * Maps client names to Supabase URLs as fallback
   */
  static getFallbackLogoUrl(clientName: string): string | null {
    // Create a mapping for known clients to their Supabase URLs
    const fallbackLogos: Record<string, string> = {
      'Microsoft': 'https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/clients/Microsoft.webp',
      'Amazon Web Services': 'https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/clients/Amazon-Web-services.webp',
      'GSK': 'https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/clients/GSK-1.png',
      'Coca-Cola': 'https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/clients/Coca-cola-1.png',
      'Ericsson': 'https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/clients/Ericsson.webp',
      'Hitachi': 'https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/clients/Hitachi.png',
      'TVS': 'https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/clients/TVS.png',
      'The New York Times': 'https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/clients/The-new-york-times-1.png',
      'KLM': 'https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/clients/KLM-1.png',
      'ABB': 'https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/clients/ABB.png',
      'EMC': 'https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/clients/EMC.webp',
      'NetApp': 'https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/clients/Netapp.webp',
      'Envestnet Yodlee': 'https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/clients/Envestnet-Yodlee.webp',
      'Microchip': 'https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/clients/Microchip.webp',
      'Tekion': 'https://qkzwdwhnbzrlyijluxdg.supabase.co/storage/v1/object/public/massif/clients/Tekion.png'
    };

    return fallbackLogos[clientName] || null;
  }

  /**
   * Get the best available logo URL (Directus first, then fallback)
   */
  static getBestLogoUrl(client: ClientLogo): string | null {
    // First try Directus logo
    if (client.client_logo) {
      return this.getClientLogoUrl(client.client_logo);
    }
    
    // Fallback to Supabase URL for known clients
    return this.getFallbackLogoUrl(client.client_name);
  }
}