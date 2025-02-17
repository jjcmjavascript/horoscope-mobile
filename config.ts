import Constants from 'expo-constants';
import { TestIds } from 'react-native-google-mobile-ads';

const inProduction = process.env.NODE_ENV === 'production';

const localUri =
  'http://' +
  (Constants.expoConfig?.hostUri || '')
    .replace(/:\d+/, ':')
    .concat((process.env.EXPO_PUBLIC_LOCAL_PORT as string) || '3001');

const baseApiUrl = inProduction ? process.env.EXPO_PUBLIC_API_URL : localUri;

export const config = {
  inProduction,
  baseApiUrl,
  apiKey: process.env.EXPO_PUBLIC_MOBILE_KEY,
  imageUrl: process.env.EXPO_PUBLIC_IMAGE_URL,
  googleAdUnitId: __DEV__
    ? TestIds.ADAPTIVE_BANNER
    : (process.env.EXPO_PUBLIC_AD_BANNER as string),
  googleAdUnitIdInterstial: __DEV__
    ? TestIds.INTERSTITIAL
    : (process.env.EXPO_PUBLIC_AD_INTERSTICIAL as string),
};
