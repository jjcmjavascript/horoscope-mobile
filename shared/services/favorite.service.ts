import AsyncStorage from '@react-native-async-storage/async-storage';
import { ZodiacSignEnum } from '../types/common.enums';

export const createFavorite = async (sign: ZodiacSignEnum) => {
  try {
    await AsyncStorage.setItem('sign', sign);
  } catch (error) {
    console.error('Error saving data', error);
  }
};

export const deleteFavorite = async () => {
  try {
    await AsyncStorage.removeItem('sign');
  } catch (error) {
    console.error('Error saving data', error);
  }
};

export const loadFavorite = async () => {
  try {
    const value = await AsyncStorage.getItem('sign');
    const result = value ? (value as ZodiacSignEnum) : undefined;

    return result;
  } catch (error) {
    console.error('Error reading data', error);
  }
};

export const toggleFavorite = async (sign: ZodiacSignEnum) => {
  const existingFavorite = await loadFavorite();

  if (existingFavorite === sign) {
    await deleteFavorite();

    return null;
  } else {
    await createFavorite(sign);

    return sign;
  }
};
