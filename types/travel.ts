export type RegionUnit =
  | {
      type: 'domestic';
      sigunguCode: string;
      sigunguName: string;
      provinceName: string;
      country: 'KR';
    }
  | {
      type: 'overseas';
      provinceCode: string;
      provinceName: string;
      countryCode: string;
      countryName: string;
      flag: string;
    };

export type Region = {
  id: string;
  unit: RegionUnit;
  visited: boolean;
  visitCount?: number;
  firstVisitDate?: string;
  color?: string;
};

export type PhotoPlaceholder = {
  id: string;
  from: string;
  to: string;
};

export type TripMember = {
  id: string;
  nameInitial: string;
  color: string;
};

export type Trip = {
  id: string;
  title: string;
  location: string;
  type: 'domestic' | 'overseas';
  startDate: string;
  endDate: string;
  monthLabel: string;
  dateRangeLabel: string;
  fullDateLabel: string;
  photoCount: number;
  regionIds: string[];
  cityCount: number;
  coverColor: string;
  coverColorDark: string;
  photos: PhotoPlaceholder[];

  // v4 신규 (optional, 기존 mock 호환)
  hashtags?: string[];
  members?: TripMember[];
  isPublic?: boolean;
};

export type TravelStats = {
  visitedSigungu: number;
  totalSigungu: number;
  visitedProvinces: number;
  totalProvinces: number;
  progress: number;
};

export type TravelStyle = {
  휴양: number;
  문화역사: number;
  자연: number;
  미식: number;
  도시: number;
};

export type PopularDestination = {
  id: string;
  name: string;
  subtitle: string;
  from: string;
  to: string;
};
