import { useTarotStore } from './tarot.store';

export const useDisabledAddTarotCard = () => {
  const length = useTarotStore((state) => state.seletedCards.length);

  return length >= 7;
};
