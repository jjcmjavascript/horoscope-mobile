import { Platform, StatusBar } from 'react-native';
import { useEffect, useState } from 'react';
import { InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';

import { config } from '@/config';


const interstitial = InterstitialAd.createForAdRequest(config.googleAdUnitIdInterstial, {
  keywords: [
    'horoscope',
    'tarot',
    'mysticism',
    'shopping',
    'fashion',
    'beauty',
    'perfumes',
  ],
});

export const useGoogleInterstitial = () => {
  const [showed, setShowed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribeLoaded = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
      },
    );

    const unsubscribeOpened = interstitial.addAdEventListener(
      AdEventType.OPENED,
      () => {
        if (Platform.OS === 'ios') {
          // Prevent the close button from being unreachable by hiding the status bar on iOS
          StatusBar.setHidden(true);
        }
      },
    );

    const unsubscribeClosed = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        if (Platform.OS === 'ios') {
          StatusBar.setHidden(false);
        }
      },
    );

    interstitial.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeOpened();
      unsubscribeClosed();
    };
  }, []);

  return {
    loaded,
    showed,
    show: () => {
      if (!showed) {
        interstitial.show();
        setShowed(true);

        setTimeout(() => {
          setShowed(false);
          interstitial.load();
        }, 180000);
      }
    }

  };
};
