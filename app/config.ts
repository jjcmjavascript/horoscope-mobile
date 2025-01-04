import Constants from 'expo-constants';

const inProduction = process.env.NODE_ENV === 'production';
const localUri =
  'http://' + (Constants.expoConfig?.hostUri || '').replace(/:\d+/, '');

const baseApiUrlPort = process.env.EXPO_PUBLIC_API_PORT;

const baseApiUrl =
  `${inProduction ? process.env.EXPO_PUBLIC_API_URL : localUri}`.concat(
    baseApiUrlPort ? `:${baseApiUrlPort}` : '',
  );

export const config = {
  inProduction,
  baseApiUrl,
};
