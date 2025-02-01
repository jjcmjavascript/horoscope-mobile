import { LinearContainer } from '@/shared/components/linear-containet.component';
import { LoadingCircle } from '@/shared/components/loadin.component';
import { RequestPermissionComponent } from '@/shared/components/request-permission.component';
import { usePushNotification } from '@/shared/hooks/use-push-notification.hook';
import { TarotCardContainer } from './components/taror-cards-container';
import { colorsLight } from '@/shared/constants/colors.contants';
import { useTarotStore } from './tarot.store';
import { useEffect } from 'react';

export default function TarotLayout() {
  const { isLoading, expoPushToken } = usePushNotification();
  const { getReadingTarot } = useTarotStore();

  useEffect(() => {
    if (expoPushToken) {
      getReadingTarot(expoPushToken);
    }
  }, [expoPushToken]);

  return (
    <LinearContainer>
      <RequestPermissionComponent />

      {isLoading ? (
        <LoadingCircle
          containerStyle={{
            position: 'absolute',
            zIndex: 4,
            flex: 1,
            backgroundColor: colorsLight.colors.darkPurple,
            marginTop: 0,
            width: '100%',
            height: '100%',
          }}
        />
      ) : null}

      {!isLoading ? <TarotCardContainer /> : null}
    </LinearContainer>
  );
}
