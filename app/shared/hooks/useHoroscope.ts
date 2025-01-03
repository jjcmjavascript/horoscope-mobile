import { useEffect, useState } from 'react';
import { removeAccents } from '../helpers/string.helper';
import { errorMessage } from '../constants/strings.constants';
import { config } from '@/app/config';
import { ZodiacSign } from '../entities/zodiac-sign.entity';

type ResponseSchema = {
  date: string;
  formatedDate: string;
  signs: Record<string, Record<string, string>>;
};

export const useHoroscope = () => {
  const [formatedDate, setFormatedDate] = useState<string>('');
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
  const [data, setData] = useState<ZodiacSign[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string[]>([]);

  useEffect(() => {
    setLoading(true);

    fetch(apiUrl)
      .then((response) => response.json())
      .then((response: ResponseSchema) => {
        setFormatedDate(response.formatedDate);

        const tempArray = Array<Record<string, string>>(12);

        for (let key in response.signs) {
          const cleanedKey = removeAccents(key).toLocaleLowerCase();
          const position: number = order[cleanedKey];

          tempArray.splice(position, 1, { sign: key, ...response.signs[key] });
        }

        setData(tempArray.map((value) => new ZodiacSign(value)));
      })
      .catch((err: Error) => {
        setError([errorMessage]);
      })
      .finally(() => setLoading(false));
  }, []);

  return { formatedDate, data, isLoading, error, setError };
};
