export type BadgeId =
  | 'city-collector'
  | 'explorer'
  | 'photographer'
  | 'early-bird'
  | 'weekend-traveler'
  | 'foodie';

export type BadgeLevel = 0 | 1 | 2 | 3 | 4 | 5;

export type BadgeCategory = 'collection' | 'frequency' | 'photo' | 'special';

export type Badge = {
  id: BadgeId;
  name: string;
  nameKo: string;
  description: string;
  icon: string;
  color: string;

  level: BadgeLevel;
  progress: number;
  nextThreshold: number;
  thresholds: number[];

  unlockedAt?: string;
  category: BadgeCategory;
};

export type BadgeProgress = {
  badgeId: BadgeId;
  current: number;
  delta?: number;
};
