import { getDirectusAssetUrl } from './directus-utils';

/** Team member shape. Client-safe: no data fetching here (see team-service.ts). */
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

export interface OrganizedTeam {
  leadership: TeamMember[];
  creative: TeamMember[];
  clientServices: TeamMember[];
  production: TeamMember[];
  operations: TeamMember[];
  strategy: TeamMember[];
}

export interface TeamStats {
  totalMembers: number;
  departmentCounts: Record<string, number>;
  averageExperience: number;
}

export function getTeamMemberImageUrl(imageId: string | null): string | null {
  return getDirectusAssetUrl(imageId, { key: 'system-large-cover' }) || null;
}
