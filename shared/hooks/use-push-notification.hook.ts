import { useEffect, useRef, useState } from 'react';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from '../services/register-for-push-notifications.service';
import { fetchPublic } from '../services/fetch-api.service';
import { pushNotificationUrl } from '../constants/urls.constans';

export const usePushNotification = () => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [notificationPermissionError, setNotificationPermissionError] =
    useState<string>('');
  const [notification, setNotification] = useState<
    Notifications.NotificationContent | undefined
  >(undefined);
  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();

  const createToken = () => {
    if (expoPushToken) {
      console.log('token regitered yet');
      return;
    }

    setLoading(true);
    registerForPushNotificationsAsync()
      .then(async (token) => {
        console.log('try to register');
        if (token) {
          console.log('token registed');

          await fetchPublic({
            url: pushNotificationUrl,
            method: 'POST',
            body: { token },
          });
        }
        setExpoPushToken(token ?? '');
      })
      .catch((error: Error) => {
        console.log(error);
        setNotificationPermissionError(error.message);
      })
      .finally(() => {
        console.log('process finished');
        setLoading(false);
      });

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
  };

  useEffect(createToken, []);

  return {
    isLoading,
    createToken,
    expoPushToken,
    notification,
    notificationPermissionError,
    setNotification,
  };
};
