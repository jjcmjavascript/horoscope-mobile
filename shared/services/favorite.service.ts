import AsyncStorage from '@react-native-async-storage/async-storage';
import { ZodiacSignEnum } from '../types/common.enums';

export const createFavorite = async (sign: ZodiacSignEnum) => {
  try {
    await AsyncStorage.setItem(sign, '1');
  } catch (error) {
    console.error('Error saving data', error);
  }
};

export const deleteFavorite = async (sign: ZodiacSignEnum) => {
  try {
    await AsyncStorage.removeItem(sign);
  } catch (error) {
    console.error('Error saving data', error);
  }
};

export const loadFavorite = async (sign: ZodiacSignEnum) => {
  try {
    const value = await AsyncStorage.getItem(sign);

    return parseInt(value || '0', 10);
  } catch (error) {
    console.error('Error reading data', error);
  }
};
