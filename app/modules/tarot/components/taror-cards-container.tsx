import { View } from 'react-native';
import { TarotCardsSelector } from './tarot-cards-selector';
import { TarotCardsSelected } from './tarot-selected-cards';
import { useTarotStore } from '../tarot.store';

export const TarotCardContainer = () => {
  const state = useTarotStore();

  return (
    <View>
      <TarotCardsSelector data={state.cards} onPress={state.selectOne} />

      <TarotCardsSelected data={state.seletedCards} />
    </View>
  );
};
