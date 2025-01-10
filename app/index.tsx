import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import { configureReanimatedLogger } from 'react-native-reanimated';
import { Tabs } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { useMoonLight } from './shared/hooks/useFont';
import { usePushNotification } from './shared/hooks/use-push-notification.hook';
import { useAppStore } from './shared/hooks/use-app-store.hook';
import { HomeContainer } from './shared/components/home.component';
import { useShallow } from 'zustand/shallow';

configureReanimatedLogger({
  strict: false,
});

SplashScreen.preventAutoHideAsync();

const { height } = Dimensions.get('window');

export default function RootLayout() {
  const { formatedDate, errors, setErrors, getData } = useAppStore(
    useShallow((state) => ({
      getData: state.getHoroscope,
      formatedDate: state.formatedDate,
      errors: state.errors,
      setErrors: state.setErrors,
    })),
  );

  useMoonLight();

  useEffect(() => {
    getData();
  }, []);

  const message = errors.join('\n');

  const showToast = () => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );

    setTimeout(() => {
      setErrors([]);
    }, 3000);
  };

  useEffect(() => {
    if (message) {
      showToast();
    }
  }, [errors]);

  usePushNotification();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top']}>
        <ImageBackground
          source={require('./shared/assets/background2.webp')}
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{formatedDate || ''}</Text>
          </View>

          <HomeContainer isLoading={false} />
        </ImageBackground>
        <Tabs />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    height: height * 0.2,
    zIndex: 1,
    paddingTop: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 30, // Un tamaño un poco mayor para destacar
    fontWeight: 'bold',
    color: '#6A1B9A',
    fontStyle: 'italic',
    textShadowColor: 'white', // Color dorado con transparencia
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20, // Difuminado del halo
  },
});
