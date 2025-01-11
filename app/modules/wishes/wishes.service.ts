import { wishesUrl } from '@/app/shared/constants/urls.constans';
import { fetchSigned } from '@/app/shared/services/fetch-api.service';
import { Wish } from './wish.interface';

export const getWishes = async () => {
  const response = await fetchSigned({ url: wishesUrl, method: 'GET' });

  if (!response.ok) {
    throw Error('Error getting wishses');
  }

  const result = (await response.json()) as Wish[];

  return result;
};

export const createWish = async (wish: Partial<Wish>) => {
  const response = await fetchSigned<Partial<Wish>>({
    url: wishesUrl,
    method: 'POST',
    body: wish,
  });

  if (!response.ok) {
    throw Error('Error getting wishses');
  }
};
