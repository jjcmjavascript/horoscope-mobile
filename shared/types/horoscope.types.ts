import { ZodiacSign } from '../entities/zodiac-sign.entity';

export type ResponseSchema = {
  date: string;
  formatedDate: string;
  signs: Record<string, Record<string, string>>;
};

export type HoroscopeResponse = {
  data: ZodiacSign[];
  formatedData: string;
};
