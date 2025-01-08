import { removeAccents } from '../helpers/string.helper';
import { errorMessage } from '../constants/strings.constants';
import { config } from '@/app/config';
import { ZodiacSign } from '../entities/zodiac-sign.entity';

type ResponseSchema = {
  date: string;
  formatedDate: string;
  signs: Record<string, Record<string, string>>;
};

type HoroscopeResponse = {
  data: ZodiacSign[];
  formatedData: string;
};
export const getHoroscope = async (): Promise<HoroscopeResponse | string> => {
  const order: Record<string, number> = {
    libra: 0,
    virgo: 1,
    leo: 2,
    cancer: 3,
    geminis: 4,
    tauro: 5,
    aries: 6,
    piscis: 7,
    acuario: 8,
    capricornio: 9,
    sagitario: 10,
    escorpio: 11,
  };
  const apiUrl = config.baseApiUrl;

  try {
    const response = await fetch(`${apiUrl}/horoscope`, {
      method: 'GET',
      headers: {
        'user-agent': 'mobile/horoscope',
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: config.apiKey as string,
      },
    });

    if (!response.ok) {
      throw new Error('Error fetching data');
    }

    const responseData: ResponseSchema = await response.json();

    const tempArray = Array<Record<string, string>>(12);

    for (let key in responseData.signs) {
      const cleanedKey = removeAccents(key).toLocaleLowerCase();
      const position: number = order[cleanedKey];

      tempArray.splice(position, 1, { sign: key, ...responseData.signs[key] });
    }

    return {
      data: tempArray.map((value) => new ZodiacSign(value)),
      formatedData: responseData.formatedDate,
    };
  } catch (err: unknown) {
    console.log(err);
    return errorMessage;
  }
};
