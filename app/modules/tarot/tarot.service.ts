import { fetchWithKey } from '@/shared/services/fetch-api.service';
import { CardEntity } from '@/shared/entities/card.entity';
import { getCardUrl, tarotSelectOptions } from './helpers/cards.helper';
import { TarotReponseItem, TarotReponseWithUrlItem } from './tarot.types';
import { tarotUrl } from '@/shared/constants/urls.constans';
import { getAllWishes } from '../wishes/wishes.service';

export const tarotServiceIndex = async (token: string) => {
  try {
    const response = await fetchWithKey({
      url: `${tarotUrl}?token=${token}`,
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }

    const responseJson: TarotReponseItem[] = await response.json();

    const formatedData: TarotReponseWithUrlItem[] = responseJson.map((item) => {
      return {
        ...item,
        cardUrls: item.cards.map((card) => getCardUrl(card)),
      };
    });

    return {
      ok: true,
      data: formatedData,
    };
  } catch (err: unknown) {
    console.log(err);
    return {
      ok: false,
      errors: ['Error fetching data'],
    };
  }
};

export const tarotServiceCreate = async (
  seletedCards: CardEntity[],
  messageHeader: {
    question?: number | null;
    name?: string | null;
    birthday?: string | null;
    token?: string | null;
    thoughts?: string | null;
  },
) => {
  try {
    const formated = seletedCards.map((c, i) => ({
      order: i,
      name: c.values.name,
      orientation: c.values.orientation,
    }));

    const question = messageHeader.question
      ? tarotSelectOptions.find((q) => q.id === messageHeader.question)?.label
      : tarotSelectOptions[0].label;

    const wishes = await getAllWishes();
    const wishesTruncated = wishes.map((wish) =>
      wish.description.slice(0, 150),
    );
    const response = await fetchWithKey({
      url: tarotUrl,
      method: 'POST',
      body: {
        name: messageHeader?.name || '',
        question: question,
        thoughts: messageHeader.thoughts?.slice(0, 200) || '',
        birthday: messageHeader.birthday || '',
        token: messageHeader.token,
        cards: formated,
        goals: wishesTruncated,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }
    const responseJson: TarotReponseItem[] = await response.json();

    const formatedData: TarotReponseWithUrlItem[] = responseJson.map((item) => {
      return {
        ...item,
        cardUrls: item.cards.map((card) => getCardUrl(card)),
      };
    });

    return {
      ok: true,
      data: formatedData,
    };
  } catch (err: unknown) {
    console.log(err);
    return {
      ok: false,
      errors: ['Error fetching data'],
    };
  }
};
