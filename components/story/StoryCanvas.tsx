import React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius } from '@/constants/theme';
import type { PhotoPlaceholder } from '@/types/travel';
import type { StoryTemplate } from '@/types/story';

export type StoryCanvasProps = {
  template: StoryTemplate;
  width: number;
  height: number;
  photos: (PhotoPlaceholder | undefined)[];
  texts: string[];
  watermark: boolean;
  onPickPhoto?: (slotIndex: number) => void;
  onChangeText?: (slotIndex: number, value: string) => void;
};

export function StoryCanvas({
  template,
  width,
  height,
  photos,
  texts,
  watermark,
  onPickPhoto,
  onChangeText,
}: StoryCanvasProps) {
  const bg = template.layout.background;

  return (
    <View
      style={{
        width,
        height,
        borderRadius: radius.lg,
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
      }}
    >
      {/* Background */}
      {bg.type === 'gradient' ? (
        <LinearGradient
          colors={[bg.from, bg.to]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        />
      ) : null}
      {bg.type === 'solid' ? (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: bg.color,
          }}
        />
      ) : null}
      {bg.type === 'pattern' ? (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#FFF7ED',
          }}
        />
      ) : null}

      {/* Photo slots */}
      {template.layout.photoSlots.map((slot, i) => {
        const photo = photos[i];
        const left = (slot.x / 100) * width;
        const top = (slot.y / 100) * height;
        const w = (slot.width / 100) * width;
        const h = (slot.height / 100) * height;
        return (
          <Pressable
            key={`photo-${i}`}
            onPress={() => onPickPhoto?.(i)}
            style={{
              position: 'absolute',
              left,
              top,
              width: w,
              height: h,
              borderRadius: radius.sm,
              overflow: 'hidden',
              transform: slot.rotation ? [{ rotate: `${slot.rotation}deg` }] : undefined,
            }}
          >
            {photo ? (
              <LinearGradient
                colors={[photo.from, photo.to]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ flex: 1 }}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#FFFFFF80',
                  borderWidth: 1.5,
                  borderColor: colors.line,
                  borderStyle: 'dashed',
                  borderRadius: radius.sm,
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 4,
                }}
              >
                <Ionicons name="image-outline" size={20} color={colors.muted} />
                <Text
                  style={{ fontSize: 11, color: colors.muted, fontWeight: '600' }}
                >
                  + 사진
                </Text>
              </View>
            )}
          </Pressable>
        );
      })}

      {/* Text slots */}
      {template.layout.textSlots.map((slot, i) => {
        const left = (slot.x / 100) * width;
        const top = (slot.y / 100) * height;
        return (
          <View
            key={`text-${i}`}
            style={{
              position: 'absolute',
              left,
              top,
              right: 8,
            }}
          >
            <TextInput
              value={texts[i] ?? ''}
              onChangeText={(v) => onChangeText?.(i, v)}
              placeholder={slot.placeholder}
              placeholderTextColor={`${slot.color}80`}
              multiline
              style={{
                fontSize: slot.fontSize,
                color: slot.color,
                fontWeight: slot.fontSize >= 24 ? '700' : '500',
                padding: 0,
              }}
            />
          </View>
        );
      })}

      {/* Watermark */}
      {watermark ? (
        <View
          style={{
            position: 'absolute',
            right: 12,
            bottom: 10,
            paddingHorizontal: 8,
            paddingVertical: 3,
            borderRadius: radius.full,
            backgroundColor: 'rgba(0,0,0,0.18)',
          }}
        >
          <Text
            style={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: 10,
              fontWeight: '700',
              letterSpacing: 0.5,
            }}
          >
            Pindy
          </Text>
        </View>
      ) : null}
    </View>
  );
}
