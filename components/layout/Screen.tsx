import React from 'react';
import { ScrollView, StatusBar, View, ViewStyle } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/constants/theme';

export type ScreenProps = {
  scroll?: boolean;
  background?: string;
  paddingHorizontal?: number;
  edges?: Array<'top' | 'bottom' | 'left' | 'right'>;
  contentStyle?: ViewStyle;
  children: React.ReactNode;
};

export function Screen({
  scroll = false,
  background = colors.bg,
  paddingHorizontal = 20,
  edges = ['top', 'bottom', 'left', 'right'],
  contentStyle,
  children,
}: ScreenProps) {
  const Container = scroll ? ScrollView : View;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: background }} edges={edges}>
      <StatusBar barStyle="dark-content" />
      <Container
        style={[{ flex: 1 }, scroll ? null : { paddingHorizontal }]}
        contentContainerStyle={
          scroll
            ? [{ paddingHorizontal, paddingBottom: 32, flexGrow: 1 }, contentStyle]
            : undefined
        }
        showsVerticalScrollIndicator={false}
      >
        {children}
      </Container>
    </SafeAreaView>
  );
}

export function useScreenInsets() {
  return useSafeAreaInsets();
}
