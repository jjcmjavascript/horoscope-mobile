import { LinearContainer } from '@/shared/components/linear-containet.component';
import { TarotCardContainer } from './components/tarot-cards-container';
import { RequestPermissionComponent } from '@/shared/components/request-permission.component';
import { usePushNotification } from '@/shared/hooks/use-push-notification.hook';
import { GoogleBanner } from '@/shared/components/google-banner.component';

export default function TarotContainer() {
  const { isLoading, expoPushToken, createToken } = usePushNotification();

  return (
    <LinearContainer>
      {!expoPushToken ? (
        <RequestPermissionComponent
          isLoading={isLoading}
          onPress={createToken}
        />
      ) : null}

      {expoPushToken ? <TarotCardContainer /> : null}

    <GoogleBanner />
    </LinearContainer>
  );
}
