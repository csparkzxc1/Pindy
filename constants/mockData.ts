import type {
  Region,
  Trip,
  TravelStats,
  TravelStyle,
  PopularDestination,
} from '@/types/travel';

export const travelStats: TravelStats = {
  visitedSigungu: 12,
  totalSigungu: 250,
  visitedProvinces: 8,
  totalProvinces: 1200,
  progress: (12 + 8) / (250 + 1200),
};

export const travelStyle: TravelStyle = {
  휴양: 0.55,
  문화역사: 0.85,
  자연: 0.65,
  미식: 0.75,
  도시: 0.6,
};

export const visitedSigungu: Region[] = [
  {
    id: 'kr-gangwon-sokcho',
    unit: {
      type: 'domestic',
      sigunguCode: '4221',
      sigunguName: '속초시',
      provinceName: '강원특별자치도',
      country: 'KR',
    },
    visited: true,
    visitCount: 3,
    firstVisitDate: '2024-05-12',
    color: '#FB7185',
  },
  {
    id: 'kr-jeju-jeju',
    unit: {
      type: 'domestic',
      sigunguCode: '5011',
      sigunguName: '제주시',
      provinceName: '제주특별자치도',
      country: 'KR',
    },
    visited: true,
    visitCount: 2,
    firstVisitDate: '2024-02-03',
    color: '#34D399',
  },
  {
    id: 'kr-jeolla-yeosu',
    unit: {
      type: 'domestic',
      sigunguCode: '4615',
      sigunguName: '여수시',
      provinceName: '전라남도',
      country: 'KR',
    },
    visited: true,
    visitCount: 1,
    firstVisitDate: '2023-09-10',
    color: '#FCD34D',
  },
];

export const visitedProvinces: Region[] = [
  {
    id: 'fr-iledefrance',
    unit: {
      type: 'overseas',
      provinceCode: 'FR-IDF',
      provinceName: 'Île-de-France',
      countryCode: 'FR',
      countryName: '프랑스',
      flag: '🇫🇷',
    },
    visited: true,
    visitCount: 1,
    firstVisitDate: '2024-05-12',
    color: '#FB7185',
  },
  {
    id: 'es-catalonia',
    unit: {
      type: 'overseas',
      provinceCode: 'ES-CT',
      provinceName: 'Catalonia',
      countryCode: 'ES',
      countryName: '스페인',
      flag: '🇪🇸',
    },
    visited: true,
    visitCount: 1,
    firstVisitDate: '2024-05-15',
    color: '#34D399',
  },
  {
    id: 'jp-tokyo',
    unit: {
      type: 'overseas',
      provinceCode: 'JP-13',
      provinceName: '도쿄도',
      countryCode: 'JP',
      countryName: '일본',
      flag: '🇯🇵',
    },
    visited: true,
    visitCount: 2,
    firstVisitDate: '2024-02-03',
    color: '#FCD34D',
  },
  {
    id: 'jp-osaka',
    unit: {
      type: 'overseas',
      provinceCode: 'JP-27',
      provinceName: '오사카부',
      countryCode: 'JP',
      countryName: '일본',
      flag: '🇯🇵',
    },
    visited: true,
    visitCount: 1,
    firstVisitDate: '2024-02-05',
    color: '#F9A8D4',
  },
];

export const trips: Trip[] = [
  {
    id: 'europe-2024',
    title: '유럽 여행',
    location: '프랑스, 스페인',
    type: 'overseas',
    startDate: '2024-05-12',
    endDate: '2024-05-18',
    monthLabel: 'MAY',
    dateRangeLabel: '12-18',
    fullDateLabel: '2024.05.12 - 05.18',
    photoCount: 79,
    regionIds: ['fr-iledefrance', 'es-catalonia'],
    cityCount: 4,
    coverColor: '#FB7185',
    coverColorDark: '#E11D48',
    photos: [
      { id: 'p1', from: '#FECDD3', to: '#FB7185' },
      { id: 'p2', from: '#A7F3D0', to: '#34D399' },
      { id: 'p3', from: '#FEF3C7', to: '#FCD34D' },
      { id: 'p4', from: '#FCE7F3', to: '#F9A8D4' },
    ],
  },
  {
    id: 'japan-2024',
    title: '일본 여행',
    location: '도쿄, 오사카',
    type: 'overseas',
    startDate: '2024-02-03',
    endDate: '2024-02-07',
    monthLabel: 'FEB',
    dateRangeLabel: '3-7',
    fullDateLabel: '2024.02.03 - 02.07',
    photoCount: 35,
    regionIds: ['jp-tokyo', 'jp-osaka'],
    cityCount: 2,
    coverColor: '#34D399',
    coverColorDark: '#10B981',
    photos: [
      { id: 'p1', from: '#FCD34D', to: '#F59E0B' },
      { id: 'p2', from: '#FB7185', to: '#E11D48' },
      { id: 'p3', from: '#A7F3D0', to: '#34D399' },
      { id: 'p4', from: '#FED7AA', to: '#FB923C' },
    ],
  },
  {
    id: 'sokcho-2024',
    title: '속초 여행',
    location: '강원도 속초',
    type: 'domestic',
    startDate: '2024-05-12',
    endDate: '2024-05-13',
    monthLabel: 'MAY',
    dateRangeLabel: '12-13',
    fullDateLabel: '2024.05.12 - 05.13',
    photoCount: 22,
    regionIds: ['kr-gangwon-sokcho'],
    cityCount: 1,
    coverColor: '#FCD34D',
    coverColorDark: '#D97706',
    photos: [
      { id: 'p1', from: '#A7F3D0', to: '#34D399' },
      { id: 'p2', from: '#FECDD3', to: '#FB7185' },
      { id: 'p3', from: '#FEF3C7', to: '#FCD34D' },
      { id: 'p4', from: '#A7F3D0', to: '#34D399' },
    ],
  },
];

export const popularDestinations: PopularDestination[] = [
  { id: 'paris', name: '파리', subtitle: 'Île-de-France, 프랑스', from: '#FECDD3', to: '#FB7185' },
  { id: 'barcelona', name: '바르셀로나', subtitle: 'Catalonia, 스페인', from: '#A7F3D0', to: '#34D399' },
  { id: 'tokyo', name: '도쿄', subtitle: '도쿄도, 일본', from: '#FEF3C7', to: '#FCD34D' },
];

export function getAllRegions(): Region[] {
  return [...visitedSigungu, ...visitedProvinces];
}

export function getRegionById(id: string): Region | undefined {
  return getAllRegions().find((r) => r.id === id);
}
