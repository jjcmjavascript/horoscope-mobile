import { CardEntity } from '@/shared/entities/card.entity';
import { Text, View, TouchableOpacity } from 'react-native';
import { useTarotStore } from '../tarot.store';
import { useDisabledAddTarotCard } from '../tarot-store.hook';
import { useAppStore } from '@/shared/hooks/use-app-store.hook';
import { colorsLight } from '@/shared/constants/colors.contants';

export const TarotCardsSelected = ({ data }: { data: CardEntity[] }) => {
  const state = useTarotStore((state) => state);
  const tarotDisabled = useDisabledAddTarotCard();
  const pushNotificationToken = useAppStore(
    (state) => state.pushNotificationToken,
  );

  console.log(state.messageHeader);

  return (
    <View>
      <TouchableOpacity
        style={{
          borderColor: colorsLight.colors.gray,
          backgroundColor: colorsLight.colors.darkPurple,
          padding: 10,
          width: '30%',
          borderRadius: 10,
          marginLeft: 10,
          elevation: 5,
          marginTop: 10,
        }}
        disabled={!tarotDisabled}
        onPress={() =>
          state.createReadingTarot(state.seletedCards, {
            ...state.messageHeader,
            token: pushNotificationToken,
          })
        }
      >
        <Text
          style={{
            textAlign: 'center',
            color: colorsLight.colors.textActive,
          }}
        >
          Ver Lectura
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 16,
          fontWeight: 'bold',
          color: colorsLight.colors.gray,
          marginTop: 10,
        }}
      >
        ({state.seletedCards.length} de 7)
      </Text>
    </View>
  );
};
