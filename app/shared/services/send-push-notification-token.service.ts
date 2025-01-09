import { fetchPublic } from './fetch-api.service';

export const sendPushNotificationToken = async (token: string) => {
  try {
    const result = await fetchPublic({
      url: 'push-notification-tokens',
      method: 'POST',
      body: { token },
    });

    if (!result.ok) {
      throw new Error('Failed to send push notification token');
    }
  } catch (error) {
    console.error(error);
  }
};
