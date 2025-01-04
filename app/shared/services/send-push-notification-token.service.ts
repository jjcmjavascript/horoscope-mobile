import { config } from '@/app/config';

export const sendPushNotificationToken = async (token: string) => {
  try {
    const result = await fetch(
      config.baseApiUrl + '/push-notification-tokens',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      },
    );

    if (!result.ok) {
      throw new Error('Failed to send push notification token');
    }
  } catch (error) {
    console.error(error);
  }
};
