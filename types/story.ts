export type StoryTemplateId = string;

export type StoryTemplateCategory =
  | 'recommended'
  | '감성'
  | '심플'
  | '여행'
  | '일상';

export type PhotoSlot = {
  x: number;       // % 0..100
  y: number;       // %
  width: number;   // %
  height: number;  // %
  rotation?: number;
};

export type TextSlot = {
  x: number;
  y: number;
  fontSize: number;
  color: string;
  placeholder: string;
};

export type StoryBackground =
  | { type: 'gradient'; from: string; to: string }
  | { type: 'solid'; color: string }
  | { type: 'pattern' };

export type StoryLayout = {
  photoSlots: PhotoSlot[];
  textSlots: TextSlot[];
  background: StoryBackground;
};

export type StoryTemplate = {
  id: StoryTemplateId;
  name: string;
  category: StoryTemplateCategory;
  thumbnail: { from: string; to: string };
  layout: StoryLayout;
};

export type StoryDraft = {
  tripId: string;
  templateId: StoryTemplateId;
  photos: string[];
  texts: string[];
  watermark: boolean;
};
