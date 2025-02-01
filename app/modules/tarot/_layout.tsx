import { router, Stack } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useTarotStore } from './tarot.store';
import { useAppStore } from '@/shared/hooks/use-app-store.hook';

export default function TarotLayout() {
  const expoPushToken = useAppStore((state) => state.pushNotificationToken);
  const { getReadingTarot, readingResult } = useTarotStore();

  useEffect(() => {
    if (expoPushToken) {
      getReadingTarot(expoPushToken);
    }
  }, [expoPushToken]);

  let initialRouteName = 'tarot-loading/tarot-loading.container';

  if (readingResult) {
    initialRouteName = 'tarot-reading/tarot-reading.container';
  }

  useEffect(() => {
    if (readingResult) {
      router.replace({
        pathname: '/modules/tarot/tarot-reading/tarot-reading.container',
      });
    }
  }, [readingResult]);

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
