import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { TarotCardsSelector } from './tarot-cards-selector';
import { TarotReadButton } from './tarot-read-button';
import { useTarotStore } from '../tarot.store';
import { colorsLight } from '@/shared/constants/colors.contants';
import { useDisabledAddTarotCard } from '../tarot-store.hook';
import { TarotForm } from './tarot-form';
import {
  tarotButtonClearSelection,
  tarotButtonRadom,
  tarotReadingMessage,
  tarotSubtitleMessage,
} from '@/shared/constants/strings.constants';

export const TarotCardContainer = () => {
  const state = useTarotStore();

  const disabledButton = useDisabledAddTarotCard();

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ alignItems: 'center' }}
    >
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

      <Text
        style={{
          fontSize: 14,
          fontWeight: 'bold',
          color: colorsLight.colors.textWarning,
          textAlign: 'center',
        }}
      >
        {tarotSubtitleMessage}
      </Text>
      <TarotCardsSelector
        data={state.cards}
        onPress={state.selectOne}
        disabled={disabledButton}
      />

      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <TouchableOpacity
          disabled={disabledButton}
          onPress={state.ramdonSelect}
          style={{
            borderColor: colorsLight.colors.gray,
            backgroundColor: colorsLight.colors.darkPurple,
            padding: 10,
            width: '40%',
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
            {tarotButtonRadom}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={state.clearSelection}
          style={{
            borderColor: colorsLight.colors.gray,
            backgroundColor: colorsLight.colors.darkPurple,
            padding: 10,
            width: '40%',
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
            {tarotButtonClearSelection}
          </Text>
        </TouchableOpacity>
      </View>
      <TarotForm />

      <TarotReadButton />

    </ScrollView>
  );
};
