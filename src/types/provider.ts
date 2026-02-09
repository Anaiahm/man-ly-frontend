export type ProviderCategory =
  | 'MENTAL_HEALTH'
  | 'MENTORSHIP_FINANCIAL'
  | 'MENTORSHIP_CAREER'
  | 'MENTORSHIP_FAMILY'
  | 'MENTORSHIP_PERSONAL';

export type Provider = {
  id: number;
  name: string;
  title: string;
  bio: string;
  category: ProviderCategory;
};