import type { StoryTemplate, StoryTemplateCategory } from '@/types/story';

export const storyTemplates: StoryTemplate[] = [
  {
    id: 'paris-classic',
    name: '클래식',
    category: 'recommended',
    thumbnail: { from: '#FECDD3', to: '#FB7185' },
    layout: {
      photoSlots: [{ x: 10, y: 15, width: 80, height: 50 }],
      textSlots: [
        { x: 10, y: 70, fontSize: 36, color: '#FFFFFF', placeholder: '여행 제목' },
        { x: 10, y: 80, fontSize: 14, color: '#FFFFFF', placeholder: '날짜' },
      ],
      background: { type: 'gradient', from: '#FB7185', to: '#E11D48' },
    },
  },
  {
    id: 'collage-3',
    name: '콜라주 3장',
    category: 'recommended',
    thumbnail: { from: '#A7F3D0', to: '#34D399' },
    layout: {
      photoSlots: [
        { x: 8, y: 10, width: 50, height: 38, rotation: -5 },
        { x: 45, y: 30, width: 48, height: 38, rotation: 6 },
        { x: 20, y: 55, width: 55, height: 35, rotation: -3 },
      ],
      textSlots: [{ x: 10, y: 92, fontSize: 18, color: '#1F2937', placeholder: '한 줄 메모' }],
      background: { type: 'solid', color: '#FAF7F2' },
    },
  },
  {
    id: 'polaroid-stack',
    name: '폴라로이드',
    category: 'recommended',
    thumbnail: { from: '#FEF3C7', to: '#FCD34D' },
    layout: {
      photoSlots: [{ x: 15, y: 20, width: 70, height: 50, rotation: -8 }],
      textSlots: [{ x: 20, y: 75, fontSize: 16, color: '#1F2937', placeholder: '날짜 / 장소' }],
      background: { type: 'pattern' },
    },
  },
  {
    id: 'soft-watercolor',
    name: '수채화',
    category: '감성',
    thumbnail: { from: '#FCE7F3', to: '#F9A8D4' },
    layout: {
      photoSlots: [{ x: 15, y: 25, width: 70, height: 45 }],
      textSlots: [{ x: 15, y: 78, fontSize: 24, color: '#1F2937', placeholder: '여행은 색으로' }],
      background: { type: 'gradient', from: '#FFF1F2', to: '#FCE7F3' },
    },
  },
  {
    id: 'minimal-quote',
    name: '미니멀 글귀',
    category: '감성',
    thumbnail: { from: '#FFFFFF', to: '#F3F4F6' },
    layout: {
      photoSlots: [{ x: 0, y: 0, width: 100, height: 60 }],
      textSlots: [{ x: 10, y: 70, fontSize: 28, color: '#1F2937', placeholder: '한 줄' }],
      background: { type: 'solid', color: '#FFFFFF' },
    },
  },
  {
    id: 'simple-grid',
    name: '단순 그리드',
    category: '심플',
    thumbnail: { from: '#E5E7EB', to: '#9CA3AF' },
    layout: {
      photoSlots: [
        { x: 5, y: 10, width: 42, height: 35 },
        { x: 53, y: 10, width: 42, height: 35 },
        { x: 5, y: 50, width: 42, height: 35 },
        { x: 53, y: 50, width: 42, height: 35 },
      ],
      textSlots: [{ x: 10, y: 90, fontSize: 14, color: '#1F2937', placeholder: '제목' }],
      background: { type: 'solid', color: '#FFFFFF' },
    },
  },
  {
    id: 'centered-square',
    name: '중앙 정사각',
    category: '심플',
    thumbnail: { from: '#FAF7F2', to: '#E5E7EB' },
    layout: {
      photoSlots: [{ x: 15, y: 25, width: 70, height: 50 }],
      textSlots: [{ x: 15, y: 80, fontSize: 16, color: '#1F2937', placeholder: '제목' }],
      background: { type: 'solid', color: '#FAF7F2' },
    },
  },
  {
    id: 'map-overlay',
    name: '지도 위에',
    category: '여행',
    thumbnail: { from: '#A7F3D0', to: '#10B981' },
    layout: {
      photoSlots: [{ x: 10, y: 30, width: 80, height: 40, rotation: 4 }],
      textSlots: [{ x: 10, y: 80, fontSize: 22, color: '#1F2937', placeholder: '도시명' }],
      background: { type: 'gradient', from: '#ECFDF5', to: '#D1FAE5' },
    },
  },
  {
    id: 'stamp-style',
    name: '스탬프',
    category: '여행',
    thumbnail: { from: '#FED7AA', to: '#FB923C' },
    layout: {
      photoSlots: [{ x: 15, y: 20, width: 70, height: 55 }],
      textSlots: [{ x: 10, y: 80, fontSize: 12, color: '#1F2937', placeholder: 'PARIS · 2024' }],
      background: { type: 'pattern' },
    },
  },
  {
    id: 'mood-board',
    name: '무드보드',
    category: '일상',
    thumbnail: { from: '#FEF3C7', to: '#FB7185' },
    layout: {
      photoSlots: [
        { x: 5, y: 5, width: 45, height: 30, rotation: -3 },
        { x: 50, y: 8, width: 45, height: 28, rotation: 5 },
        { x: 10, y: 40, width: 50, height: 35, rotation: -5 },
        { x: 55, y: 50, width: 40, height: 30, rotation: 8 },
      ],
      textSlots: [{ x: 10, y: 88, fontSize: 16, color: '#1F2937', placeholder: 'Good vibes only' }],
      background: { type: 'solid', color: '#FAF7F2' },
    },
  },
  {
    id: 'diary-page',
    name: '다이어리',
    category: '일상',
    thumbnail: { from: '#FFF1F2', to: '#FECDD3' },
    layout: {
      photoSlots: [{ x: 20, y: 15, width: 60, height: 40 }],
      textSlots: [{ x: 15, y: 65, fontSize: 13, color: '#1F2937', placeholder: '오늘의 기록' }],
      background: { type: 'solid', color: '#FFF1F2' },
    },
  },
];

export function getStoryTemplatesByCategory(cat: StoryTemplateCategory): StoryTemplate[] {
  return storyTemplates.filter((t) => t.category === cat);
}

export function getStoryTemplateById(id: string): StoryTemplate | undefined {
  return storyTemplates.find((t) => t.id === id);
}

export const TEMPLATE_CATEGORIES: StoryTemplateCategory[] = [
  'recommended',
  '감성',
  '심플',
  '여행',
  '일상',
];

export const TEMPLATE_CATEGORY_LABELS: Record<StoryTemplateCategory, string> = {
  recommended: '추천',
  감성: '감성',
  심플: '심플',
  여행: '여행',
  일상: '일상',
};
