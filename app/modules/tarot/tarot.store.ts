import { create } from 'zustand';
import { tarotServiceCreate, tarotServiceIndex } from './tarot.service';
import { CardEntity } from '@/shared/entities/card.entity';
import { cardsRandom } from './helpers/cards.helper';
import { MessageHeaderType, TarotReponseWithUrlItem } from './tarot.types';
import {
  initTarotLocalStorageService,
  saveTarotData,
} from './tarot-local-store.service';

interface State {
  isLoading: boolean;
  readingResult: TarotReponseWithUrlItem[];
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
  clearSelection: () => void;
}

export const useTarotStore = create<State & Actions>((set) => {
  return {
    isLoading: false,
    readingResult: [],
    messageHeader: {
      name: null,
      birthday: null,
      question: 31,
      token: null,
      thoughts: null,
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
    clearSelection: () => {
      set((state) => {
        const originalCards = [...state.seletedCards, ...state.cards];

        return {
          cards: originalCards,
          seletedCards: [],
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
    editMessageHeader: async (messageHeader: MessageHeaderType) => {
      await saveTarotData({ ...messageHeader });
      set((state) => ({
        messageHeader: { ...state.messageHeader, ...messageHeader },
      }));
    },
    getReadingTarot: async (token: string) => {
      set(() => ({
        isLoading: true,
      }));

      const [head, result] = await Promise.all([
        initTarotLocalStorageService(),
        tarotServiceIndex(token),
      ]);

      if (result.ok) {
        set(() => ({
          readingResult: result.data,
        }));
      }

      set(() => ({
        isLoading: false,
        messageHeader: { ...head, token },
      }));
    },
    createReadingTarot: async (
      seletedCards: CardEntity[],
      messageHeader: MessageHeaderType,
    ) => {
      set(() => ({
        isLoading: true,
      }));

      const result = await tarotServiceCreate(seletedCards, messageHeader);

      if (result.ok) {
        set(() => ({
          readingResult: result.data,
        }));
      }

      set(() => ({
        isLoading: false,
      }));
    },
  };
});
