import { create } from 'zustand';
import { cards } from './helpers/cards.helper';
import { config } from '@/config';
import { Card } from './tarot.types';

const formatName = (name: string) =>
  name.trim().toLowerCase().replace(/\s/g, '-').concat('.png');

const cardsRandom = cards
  .sort(() => Math.random() - 0.5)
  .map((card, i) => ({
    index: i + 1,
    cardName: card,
    backUrl: `${config.imageUrl}/back.png`,
    cardUrl: `${config.imageUrl}/${formatName(card)}`,
    inverted: Math.random() > 0.5,
  }));

interface State {
  seletedCards: Card[];
  cards: Card[];
}

interface Actions {
  selectOne: (cardName: string) => void;
  shuffle: () => void;
  ramdonSelect: () => void;
}

export const useTarotStore = create<State & Actions>((set) => {
  return {
    seletedCards: [],
    cards: [...cardsRandom],
    selectOne: (cardName: string) => {
      set((state) => {
        const card = state.cards.find((c) => c.cardName === cardName) as Card;
        const filteredCards = state.cards.filter(
          (c) => c.cardName !== cardName,
        );

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

        const filteredCards: Card[] = originalCards.filter(
          (c) => !seletedCards.some((s) => s.cardName === c.cardName),
        );

        return {
          cards: filteredCards,
          seletedCards: [...seletedCards],
        };
      });
    },
  };
});
