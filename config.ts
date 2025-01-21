import Constants from 'expo-constants';

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
};
