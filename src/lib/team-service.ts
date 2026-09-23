import 'server-only';
import { directusItems } from './directus-server';
import type { OrganizedTeam, TeamMember, TeamStats } from './team-utils';

export type { TeamMember, OrganizedTeam, TeamStats } from './team-utils';

// Leadership shown first, in this order.
const LEADERSHIP_NAMES = ['Prakash A Vaswani', 'Pehal Kukreja', 'Vinay Kukreja'];

export class TeamService {
  static async getAllTeamMembers(): Promise<TeamMember[]> {
    return directusItems<TeamMember>('team_members', {
      fields: '*',
      filter: { status: { _eq: 'active' } },
      sort: 'name',
    });
  }

  static organize(allMembers: TeamMember[]): OrganizedTeam {
    return {
      leadership: LEADERSHIP_NAMES
        .map(name => allMembers.find(member => member.name === name))
        .filter((member): member is TeamMember => member !== undefined),
      creative: allMembers.filter(member => member.department === 'Creative'),
      clientServices: allMembers.filter(member => member.department === 'Client Services'),
      production: allMembers.filter(member => member.department === 'Production'),
      operations: allMembers.filter(member => member.department === 'Operations'),
      strategy: allMembers.filter(member => member.department === 'Strategy'),
    };
  }

  static stats(allMembers: TeamMember[]): TeamStats {
    const departmentCounts = allMembers.reduce((acc, member) => {
      acc[member.department] = (acc[member.department] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const withExperience = allMembers.filter(member => member.years_experience !== null);
    const averageExperience = withExperience.length > 0
      ? withExperience.reduce((sum, member) => sum + (member.years_experience || 0), 0) / withExperience.length
      : 0;

    return {
      totalMembers: allMembers.length,
      departmentCounts,
      averageExperience: Math.round(averageExperience),
    };
  }
}
