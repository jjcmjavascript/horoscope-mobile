import AsyncStorage from '@react-native-async-storage/async-storage';
import * as crypto from 'expo-crypto';
import { Wish } from './wish.interface';

export const createWishes = async (value: Wish) => {
  try {
    const uuid = crypto.randomUUID();
    const existingWishes = await getAllWishes();

    await AsyncStorage.setItem(
      'wish',
      JSON.stringify([...existingWishes, { id: uuid, ...value }]),
    );

    return { id: uuid, ...value };
  } catch (error) {
    console.error('Error saving data', error);
  }
};

export const deleteWish = async (value: string) => {
  try {
    const existingWishes = await getAllWishes();
    const newWishes = existingWishes.filter((wish: Wish) => wish.id !== value);

    await AsyncStorage.setItem('wish', JSON.stringify(newWishes));
  } catch (error) {
    console.error('Error saving data', error);
  }
};

export const getAllWishes = async () => {
  let result: Wish[] = [];

  try {
    const existingWishes = await AsyncStorage.getItem('wish');

    if (!existingWishes) {
      await AsyncStorage.setItem('wish', JSON.stringify([]));
    } else {
      result = JSON.parse(existingWishes) as Wish[];
    }
  } catch (error) {
    console.error('Error saving data', error);
  }
  return result;
};
