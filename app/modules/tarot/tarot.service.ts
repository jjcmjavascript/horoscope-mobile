import { fetchWithKey } from '@/shared/services/fetch-api.service';
import { CardEntity } from '@/shared/entities/card.entity';
import { tarotSelectOptions } from './helpers/cards.helper';

export const tarotServiceIndex = async (token: string) => {
  try {
    const response = await fetchWithKey({
      url: 'tarots?token=' + token,
      method: 'GET',
    });

    console.log(response);
    if (!response.ok) {
      throw new Error('Error fetching data');
    }
    const responseJson = await response.json();

    return {
      ok: true,
      data: responseJson,
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
    token?: string | null;
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

    const response = await fetchWithKey({
      url: 'tarots',
      method: 'POST',
      body: {
        name: messageHeader?.name || '',
        question: question,
        token: messageHeader.token,
        card_number: formated.length,
        cards: formated,
      },
    });

    if (!response.ok) {
      throw new Error('Error fetching data');
    }
    const responseJson = await response.json();

    console.log(responseJson);
    return {
      ok: true,
      data: responseJson,
    };
  } catch (err: unknown) {
    console.log(err);
    return {
      ok: false,
      errors: ['Error fetching data'],
    };
  }
};
