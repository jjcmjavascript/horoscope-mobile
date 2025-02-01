import { Text, TouchableOpacity, View } from 'react-native';
import { TarotCardsSelector } from './tarot-cards-selector';
import { TarotReadButton } from './tarot-read-button';
import { useTarotStore } from '../tarot.store';
import { colorsLight } from '@/shared/constants/colors.contants';
import { useDisabledAddTarotCard } from '../tarot-store.hook';
import { TarotForm } from './tarot-form';
import { tarotReadingMessage } from '@/shared/constants/strings.constants';

export const TarotCardContainer = () => {
  const state = useTarotStore();

  const disabledButton = useDisabledAddTarotCard();

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text
        style={{
          padding: 10,
          fontSize: 20,
          fontWeight: 'bold',
          marginTop: 20,
          color: colorsLight.colors.textActive,
          textAlign: 'center',
        }}
      >
        {tarotReadingMessage}
      </Text>
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

      <TarotForm />

      <TarotReadButton />
    </View>
  );
};
