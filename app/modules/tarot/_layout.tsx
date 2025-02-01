import { router, Stack } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useTarotStore } from './tarot.store';
import { useAppStore } from '@/shared/hooks/use-app-store.hook';
import { useShallow } from 'zustand/shallow';
import { usePushNotification } from '@/shared/hooks/use-push-notification.hook';

export default function TarotLayout() {
  let initialRouteName = 'tarot-loading/tarot-loading.container';

  const { isLoading: isLoadingNotification } = usePushNotification();
  const expoPushToken = useAppStore((state) => state.pushNotificationToken);

  const { getReadingTarot, readingResult, isLoading } = useTarotStore(
    useShallow((state) => ({
      getReadingTarot: state.getReadingTarot,
      readingResult: state.readingResult.length > 0,
      isLoading: state.isLoading,
    })),
  );

  useEffect(() => {
    if (expoPushToken) {
      getReadingTarot(expoPushToken);
    }
  }, [expoPushToken]);

  useEffect(() => {
    if (readingResult) {
      router.replace({
        pathname: '/modules/tarot/tarot-reading/tarot-reading.container',
      });
    }
  }, [readingResult]);

  useEffect(() => {
    if (isLoading || isLoadingNotification) {
      router.replace({
        pathname: '/modules/tarot/tarot-loading/tarot-loading.container',
      });
    }
  }, [isLoading, isLoadingNotification]);

  useEffect(() => {
    if (
      (!expoPushToken || !readingResult) &&
      !isLoading &&
      !isLoadingNotification
    ) {
      router.replace({
        pathname: '/modules/tarot/tarot.container',
      });
    }
  }, [expoPushToken, readingResult, isLoadingNotification, isLoading]);

  return (
    <Stack
      screenOptions={{ header: () => null }}
      initialRouteName={initialRouteName}
    >
      <Stack.Screen
        name="tarot-loading/tarot-loading.container"
        options={{
          headerTitle: () => (
            <Text style={styles.titleStyle}>{'tarotTitle'}</Text>
          ),
        }}
      />

      <Stack.Screen
        name="tarot.container"
        options={{
          headerTitle: () => (
            <Text style={styles.titleStyle}>{'tarotTitle'}</Text>
          ),
        }}
      />

      <Stack.Screen
        name="tarot-reading/tarot-reading.container"
        options={{
          headerTitle: () => (
            <Text style={styles.titleStyle}>{'tarotTitle'}</Text>
          ),
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  titleStyle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
