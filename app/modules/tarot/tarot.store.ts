import { create } from 'zustand';
import { tarotServiceCreate, tarotServiceIndex } from './tarot.service';
import { CardEntity } from '@/shared/entities/card.entity';
import { cardsRandom } from './helpers/cards.helper';

type MessageHeaderType = {
  name?: string | null;
  question?: number | null;
  token?: string | null;
};

interface State {
  readingResult: string | undefined;
  messageHeader: MessageHeaderType;
  seletedCards: CardEntity[];
  cards: CardEntity[];
}

interface Actions {
  selectOne: (name: string) => void;
  shuffle: () => void;
  ramdonSelect: () => void;
  editMessageHeader: (messageHeader: MessageHeaderType) => void;
  getReadingTarot: (token: string) => void;
  createReadingTarot: (
    seletedCards: CardEntity[],
    messageHeader: MessageHeaderType,
  ) => void;
}

export const useTarotStore = create<State & Actions>((set) => {
  return {
    readingResult: undefined,
    messageHeader: {
      name: null,
      question: null,
    },
    seletedCards: [],
    cards: [...cardsRandom],
    selectOne: (name: string) => {
      set((state) => {
        const card = state.cards.find(
          (c) => c.values.name === name,
        ) as CardEntity;

        const filteredCards = state.cards.filter((c) => c.values.name !== name);

        return {
          cards: [...filteredCards],
          seletedCards: [...state.seletedCards, card],
        };
      });
    },
    shuffle: () => {
      set((state) => ({
        cards: state.cards.sort(() => Math.random() - 0.5),
      }));
    },
    ramdonSelect: () => {
      set((state) => {
        const originalCards = [...state.seletedCards, ...state.cards];

        const seletedCards = originalCards
          .sort(() => Math.random() - 0.5)
          .slice(0, 7);

        const filteredCards: CardEntity[] = originalCards.filter(
          (c) => !seletedCards.some((s) => s.values.name === c.values.name),
        );

        return {
          cards: filteredCards,
          seletedCards: [...seletedCards],
        };
      });
    },
    editMessageHeader: (messageHeader: MessageHeaderType) => {
      set((state) => ({
        messageHeader: { ...state.messageHeader, ...messageHeader },
      }));
    },
    getReadingTarot: async (token: string) => {
      const result = await tarotServiceIndex(token);

      if (result.ok) {
        set(() => ({
          readingResult: result.data,
        }));
      }
    },
    createReadingTarot: async (
      seletedCards: CardEntity[],
      messageHeader: MessageHeaderType,
    ) => {
      const result = await tarotServiceCreate(seletedCards, messageHeader);

      if (result.ok) {
        set(() => ({
          readingResult: result.data,
        }));
      }
    },
  };
});
