import React, { forwardRef } from 'react';
import { View, type ViewStyle } from 'react-native';
import ViewShot from 'react-native-view-shot';

export type ShareableCardProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

/**
 * Wraps a snapshot target in `react-native-view-shot`. The parent gets a ref
 * with a `.capture()` method (see features/share/captureView.ts).
 */
export const ShareableCard = forwardRef<ViewShot, ShareableCardProps>(
  function ShareableCard({ children, style }, ref) {
    return (
      <ViewShot
        ref={ref}
        options={{ format: 'png', quality: 1, result: 'tmpfile' }}
      >
        <View style={style}>{children}</View>
      </ViewShot>
    );
  },
);
