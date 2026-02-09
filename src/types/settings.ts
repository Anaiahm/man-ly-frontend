export type CareTeamCategory =
  | 'MENTAL_HEALTH'
  | 'MENTORSHIP_FINANCIAL'
  | 'MENTORSHIP_CAREER'
  | 'MENTORSHIP_FAMILY'
  | 'MENTORSHIP_PERSONAL';

export type UserSettings = {
  selectedCategories: CareTeamCategory[];
  profilePhotoUrl: string;
  name: string;
  username: string;
  email: string;
};