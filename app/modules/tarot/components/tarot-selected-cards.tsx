import { CardEntity } from '@/shared/entities/card.entity';
import { Text, View, TouchableOpacity } from 'react-native';
import { useTarotStore } from '../tarot.store';
import { useDisabledAddTarotCard } from '../tarot-store.hook';
import { useAppStore } from '@/shared/hooks/use-app-store.hook';

export const TarotCardsSelected = ({ data }: { data: CardEntity[] }) => {
  const state = useTarotStore((state) => state);
  const tarotDisabled = useDisabledAddTarotCard();
  const pushNotificationToken = useAppStore(
    (state) => state.pushNotificationToken,
  );

  return (
    <View>
      <TouchableOpacity
        disabled={!tarotDisabled}
        onPress={() => state.getReadingTarot(pushNotificationToken)}
      >
        <Text>Ver Lectura</Text>
      </TouchableOpacity>
    </View>
  );
};
