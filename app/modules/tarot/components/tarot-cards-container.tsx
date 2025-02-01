import { Text, TouchableOpacity, View } from 'react-native';
import { TarotCardsSelector } from './tarot-cards-selector';
import { TarotCardsSelected } from './tarot-selected-cards';
import { useTarotStore } from '../tarot.store';
import { colorsLight } from '@/shared/constants/colors.contants';
import { useDisabledAddTarotCard } from '../tarot-store.hook';
import { TarotOptions } from './tarot-options';

export const TarotCardContainer = () => {
  const state = useTarotStore();

  const disabledButton = useDisabledAddTarotCard();

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <TarotCardsSelector
        data={state.cards}
        onPress={state.selectOne}
        disabled={disabledButton}
      />

      <TouchableOpacity
        disabled={disabledButton}
        onPress={state.ramdonSelect}
        style={{
          borderColor: colorsLight.colors.gray,
          backgroundColor: colorsLight.colors.darkPurple,
          padding: 10,
          width: '30%',
          borderRadius: 10,
          marginLeft: 10,
          elevation: 5,
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            color: colorsLight.colors.textActive,
          }}
        >
          Elegir al azar
        </Text>
      </TouchableOpacity>

      <TarotOptions />

      <TarotCardsSelected data={state.seletedCards} />
    </View>
  );
};
