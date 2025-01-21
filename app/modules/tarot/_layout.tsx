import { LinearContainer } from '@/shared/components/linear-containet.component';
import { LoadingCircle } from '@/shared/components/loadin.component';
import { RequestPermissionComponent } from '@/shared/components/request-permission.component';
import { usePushNotification } from '@/shared/hooks/use-push-notification.hook';
import { TarotCards } from './components/tarot-cards';

export default function WishesLayout() {
  const { isLoading } = usePushNotification();

  return (
    <LinearContainer>
      <RequestPermissionComponent />

      {isLoading ? <LoadingCircle /> : null}

      {!isLoading ? <TarotCards /> : null}
    </LinearContainer>
  );
}
