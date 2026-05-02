export type BadgeId =
  // existing
  | 'city-collector'
  | 'explorer'
  | 'photographer'
  | 'early-bird'
  | 'weekend-traveler'
  | 'foodie'
  // collection (extra)
  | 'country-hunter'
  | 'continent-walker'
  | 'korea-master'
  | 'asia-explorer'
  | 'europe-explorer'
  | 'americas-explorer'
  | 'africa-explorer'
  | 'oceania-explorer'
  | 'island-hopper'
  | 'coastal-traveler'
  | 'mountain-climber'
  | 'capital-collector'
  | 'unesco-seeker'
  | 'small-town-lover'
  | 'metropolis-fan'
  | 'border-crosser'
  // photo
  | 'golden-hour'
  | 'blue-hour'
  | 'portrait-pro'
  | 'landscape-master'
  | 'food-blogger'
  | 'street-shooter'
  | 'memory-keeper'
  // frequency
  | 'monthly-traveler'
  | 'spring-traveler'
  | 'summer-traveler'
  | 'autumn-traveler'
  | 'winter-traveler'
  | 'weekday-warrior'
  | 'holiday-hunter'
  | 'long-trip'
  | 'quick-getaway'
  | 'consecutive-month'
  | 'four-seasons'
  // special
  | 'night-owl'
  | 'coffee-lover'
  | 'dessert-hunter'
  | 'wine-traveler'
  | 'festival-goer'
  | 'solo-explorer'
  | 'family-tripper'
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
