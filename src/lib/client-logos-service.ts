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
   * Get all published client logos
   */
  static async getAllClientLogos(): Promise<ClientLogo[]> {
    try {
      const response = await fetch(
        `${this.BASE_URL}/items/client_logos?fields=id,client_name,Category,client_logo,status,sort&filter[status][_eq]=published&sort=sort`,
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
        `${this.BASE_URL}/items/client_logos?fields=id,client_name,Category,client_logo,status,sort&filter[status][_eq]=published&filter[Category][_eq]=${encodeURIComponent(industry)}&sort=sort`,
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
        `${this.BASE_URL}/items/client_logos?aggregate[count]=Category&groupBy=Category&filter[status][_eq]=published&sort=Category`,
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
        `${this.BASE_URL}/items/client_logos?aggregate[count]=id&filter[status][_eq]=published`,
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
        `${this.BASE_URL}/items/client_logos?fields=id,client_name,Category,client_logo,status,sort&filter[status][_eq]=published&filter[client_name][_icontains]=${encodeURIComponent(searchTerm)}&sort=sort`,
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
}