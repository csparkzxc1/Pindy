export type BadgeId =
  // collection (5)
  | 'city-collector'
  | 'explorer'
  | 'country-hunter'
  | 'korea-master'
  | 'border-crosser'
  // photo (2)
  | 'photographer'
  | 'memory-keeper'
  // frequency (11)
  | 'weekend-traveler'
  | 'monthly-traveler'
  | 'spring-traveler'
  | 'summer-traveler'
  | 'autumn-traveler'
  | 'winter-traveler'
  | 'weekday-warrior'
  | 'long-trip'
  | 'quick-getaway'
  | 'consecutive-month'
  | 'four-seasons'
  // special (5)
  | 'foodie'
  | 'solo-explorer'
  | 'couple-getaway'
  | 'first-trip'
  | 'milestone-100';

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
