import AsyncStorage from '@react-native-async-storage/async-storage';
import * as crypto from 'expo-crypto';

import { Wish } from './wish.interface';

// Guardar un dato
export const createWishes = async (value: Wish) => {
  try {
    const uuid = crypto.randomUUID();
    await AsyncStorage.setItem(uuid, JSON.stringify({ id: uuid, ...value }));
    return { id: uuid, ...value };
  } catch (error) {
    console.error('Error saving data', error);
  }
};

export const deleteWish = async (value: string) => {
  try {
    await AsyncStorage.removeItem(value);
  } catch (error) {
    console.error('Error saving data', error);
  }
};

export const loadWishes = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Error reading data', error);
  }
};

export const getAllWishes = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();

    if (!keys.length) return [];

    const keyValuePairs = await AsyncStorage.multiGet(keys);
    const result: Wish[] = [];

    keyValuePairs.forEach(([key, value]) => {
      if (value) {
        result.push(JSON.parse(value) as Wish);
      }
    });

    return result;
  } catch (error) {
    console.error('Error al obtener todos los datos:', error);
    return [];
  }
};
