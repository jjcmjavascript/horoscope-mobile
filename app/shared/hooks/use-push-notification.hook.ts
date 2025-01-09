import { useEffect, useRef, useState } from 'react';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from '../services/register-for-push-notifications.service';
import { fetchPublic } from '../services/fetch-api.service';
import { pushNotificationUrl } from '../constants/urls.constans';

export const usePushNotification = () => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notificationPermissionError, setNotificationPermissionError] =
    useState<string>('');
  const [notification, setNotification] = useState<
    Notifications.NotificationContent | undefined
  >(undefined);
  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(async (token) => {
        if (token) {
          await fetchPublic({ url: pushNotificationUrl, body: { token } });
        }
        setExpoPushToken(token ?? '');
      })
      .catch((error: Error) => setNotificationPermissionError(error.message));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification.request.content);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        setNotification(response.notification.request.content);
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current,
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return {
    expoPushToken,
    notification,
    notificationPermissionError,
    setNotification,
  };
};
