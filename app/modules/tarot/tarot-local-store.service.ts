import AsyncStorage from '@react-native-async-storage/async-storage';
import { MessageHeaderType } from './tarot.types';

export const loadTarotData = async () => {
  try {
    const value = await AsyncStorage.getItem('tarot');

    const result = value ? JSON.parse(value) : null;

    return result;
  } catch (error) {
    console.error('Error reading data', error);
  }
};

export const initTarotLocalStorageService = async () => {
  let result = await loadTarotData();

  if (!result) {
    result = {
      name: null,
      birthday: null,
      question: null,
      token: null,
    };

    await AsyncStorage.setItem('tarot', JSON.stringify(result));
  }

  return result as MessageHeaderType;
};

export const saveTarotData = async (value: Partial<MessageHeaderType>) => {
  try {
    const existingData = await loadTarotData();

    await AsyncStorage.setItem(
      'tarot',
      JSON.stringify({ ...existingData, ...value }),
    );
  } catch (error) {
    console.error('Error saving data', error);
  }
};

export const clearTarotItem = async (key: keyof MessageHeaderType) => {
  try {
    const existingData = await loadTarotData();

    existingData[key] = null;

    await AsyncStorage.setItem('tarot', JSON.stringify(existingData));
  } catch (error) {
    console.error('Error saving data', error);
  }
};
