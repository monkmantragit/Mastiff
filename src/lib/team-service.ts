export interface TeamMember {
  id: number;
  name: string;
  position: string;
  department: string;
  bio: string | null;
  team_member_image: string | null;
  email: string | null;
  linkedin: string | null;
  years_experience: number | null;
  status: string;
}

export interface TeamResponse {
  data: TeamMember[];
}

export class TeamService {
  private static readonly BASE_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL;
  private static readonly TOKEN = process.env.NEXT_PUBLIC_DIRECTUS_TOKEN;

  private static getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.TOKEN}`
    };
  }

  /**
   * Get all active team members organized by department hierarchy
   */
  static async getAllTeamMembers(): Promise<TeamMember[]> {
    try {
      const response = await fetch(
        `${this.BASE_URL}/items/team_members?fields=*&filter[status][_eq]=active&sort=name`,
        {
          headers: this.getHeaders(),
          next: { revalidate: 3600 } // Cache for 1 hour
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: TeamResponse = await response.json();
      return result.data || [];
    } catch (error) {
      console.error('Error fetching team members:', error);
      return [];
    }
  }

  /**
   * Get leadership team (directors and heads)
   */
  static async getLeadershipTeam(): Promise<TeamMember[]> {
    const allMembers = await this.getAllTeamMembers();
    
    // Get specific leadership members in order: Prakash, Pehal, Vinay
    const leadershipNames = ['Prakash A Vaswani', 'Pehal Kukreja', 'Vinay Kukreja'];
    
    return leadershipNames
      .map(name => allMembers.find(member => member.name === name))
      .filter((member): member is TeamMember => member !== undefined);
  }

  /**
   * Get team members by department
   */
  static async getTeamByDepartment(department: string): Promise<TeamMember[]> {
    const allMembers = await this.getAllTeamMembers();
    return allMembers.filter(member => member.department === department);
  }

  /**
   * Get organized team structure in the specified order
   */
  static async getOrganizedTeamStructure(): Promise<{
    leadership: TeamMember[];
    creative: TeamMember[];
    clientServices: TeamMember[];
    production: TeamMember[];
    operations: TeamMember[];
    strategy: TeamMember[];
  }> {
    const allMembers = await this.getAllTeamMembers();
    
    return {
      leadership: await this.getLeadershipTeam(),
      creative: allMembers.filter(member => member.department === 'Creative'),
      clientServices: allMembers.filter(member => member.department === 'Client Services'),
      production: allMembers.filter(member => member.department === 'Production'),
      operations: allMembers.filter(member => member.department === 'Operations'),
      strategy: allMembers.filter(member => member.department === 'Strategy')
    };
  }

  /**
   * Get team member image URL
   */
  static getTeamMemberImageUrl(imageId: string | null): string | null {
    if (!imageId) return null;
    return `${this.BASE_URL}/assets/${imageId}?access_token=${this.TOKEN}&key=system-large-cover`;
  }

  /**
   * Get team statistics
   */
  static async getTeamStats(): Promise<{
    totalMembers: number;
    departmentCounts: Record<string, number>;
    averageExperience: number;
  }> {
    const allMembers = await this.getAllTeamMembers();
    
    const departmentCounts = allMembers.reduce((acc, member) => {
      acc[member.department] = (acc[member.department] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const membersWithExperience = allMembers.filter(member => member.years_experience !== null);
    const averageExperience = membersWithExperience.length > 0
      ? membersWithExperience.reduce((sum, member) => sum + (member.years_experience || 0), 0) / membersWithExperience.length
      : 0;

    return {
      totalMembers: allMembers.length,
      departmentCounts,
      averageExperience: Math.round(averageExperience)
    };
  }
}