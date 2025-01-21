import { create } from 'zustand';
import { cards } from './helpers/cards.helper';
import { config } from '@/config';

interface Card {
  cardName: string;
  backUrl: string;
  cardUrl: string;
  inverted: boolean;
}

const formatName = (name: string) =>
  name.trim().toLowerCase().replace(/\s/g, '-').concat('.png');

const cardsRandom = cards
  .sort(() => Math.random() - 0.5)
  .map((card) => ({
    cardName: card,
    backUrl: `${config.imageUrl}/back.png`,
    cardUrl: `${config.imageUrl}/${formatName(card)}`,
    inverted: false,
  }));

interface State {
  seletedCards: Card[];
  cards: Card[];
}

interface Actions {
  selectOne: (cardName: string) => void;
  shuffle: () => void;
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
  };
});
