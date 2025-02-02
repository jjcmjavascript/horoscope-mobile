import { Text, View, TouchableOpacity } from 'react-native';
import { useTarotStore } from '../tarot.store';
import { useDisabledAddTarotCard } from '../tarot-store.hook';
import { useAppStore } from '@/shared/hooks/use-app-store.hook';
import { colorsLight } from '@/shared/constants/colors.contants';
import { tarotButtonVerLectura } from '@/shared/constants/strings.constants';
import { useGoogleInterstitial } from '@/shared/hooks/use-google-interstitial.hook';

export const TarotReadButton = () => {
  const state = useTarotStore((state) => state);
  const tarotDisabled = useDisabledAddTarotCard();
  const pushNotificationToken = useAppStore(
    (state) => state.pushNotificationToken,
  );

  const { loaded, show, showed } = useGoogleInterstitial();

  const createReading = () =>
    state.createReadingTarot(state.seletedCards, {
      ...state.messageHeader,
      token: pushNotificationToken,
    });

  const handleShow = !showed ? show : createReading;

  console.log(!showed, loaded);
  return (
    <View>
      <TouchableOpacity
        style={{
          borderColor: colorsLight.colors.gray,
          backgroundColor: tarotDisabled
            ? colorsLight.colors.darkPurple
            : colorsLight.colors.textInactive,
          padding: 10,
          width: '40%',
          borderRadius: 10,
          marginLeft: 10,
          elevation: 5,
          marginTop: 10,
        }}
        disabled={!tarotDisabled}
        onPress={handleShow}
      >
        <Text
          style={{
            textAlign: 'center',
            color: colorsLight.colors.textActive,
          }}
        >
          {tarotButtonVerLectura}
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
