import type { RefObject } from 'react';
import type ViewShot from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';

export type CaptureShareOptions = {
  mimeType?: string;
  dialogTitle?: string;
};

export class SharingUnavailableError extends Error {
  constructor() {
    super('Sharing is not available on this device');
  }
}

/**
 * Capture a ViewShot ref to a temp file then trigger the system share sheet.
 *
 * - iOS: shows the system share sheet.
 * - Android: opens the OS share intent. Some OEMs may behave differently;
 *   `Sharing.isAvailableAsync()` is checked first to fail loudly.
 */
export async function captureAndShare(
  ref: RefObject<ViewShot>,
  options: CaptureShareOptions = {},
): Promise<void> {
  if (!ref.current?.capture) {
    throw new Error('ViewShot ref not ready');
  }

  const uri = await ref.current.capture();

  const isAvailable = await Sharing.isAvailableAsync();
  if (!isAvailable) {
    throw new SharingUnavailableError();
  }

  await Sharing.shareAsync(uri, {
    mimeType: options.mimeType ?? 'image/png',
    dialogTitle: options.dialogTitle ?? 'Pindy 스토리 공유',
  });
}

/**
 * Capture only — returns the file URI without sharing. Useful when caller
 * wants to handle persistence or upload separately.
 */
export async function captureOnly(ref: RefObject<ViewShot>): Promise<string> {
  if (!ref.current?.capture) {
    throw new Error('ViewShot ref not ready');
  }
  return ref.current.capture();
}
