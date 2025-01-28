import { CardEntity } from '@/shared/entities/card.entity';
import { Text, View, TouchableOpacity } from 'react-native';
import { useTarotStore } from '../tarot.store';
import { usePushNotification } from '@/shared/hooks/use-push-notification.hook';
import { useDisabledAddTarotCard } from '../tarot-store.selector';

export const TarotCardsSelected = ({ data }: { data: CardEntity[] }) => {
  const state = useTarotStore((state) => state);
  const { expoPushToken } = usePushNotification();
  const tarotDisabled = useDisabledAddTarotCard();

  return (
    <View>
      <TouchableOpacity
        disabled={!tarotDisabled}
        onPress={() =>
          state.getReadingTarot(data, {
            name: 'juan',
            question: 1,
            token: expoPushToken,
          })
        }
      >
        <Text>Ver Lectura</Text>
      </TouchableOpacity>
    </View>
  );
};
