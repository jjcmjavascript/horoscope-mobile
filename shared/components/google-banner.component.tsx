import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { useRef } from 'react';
import { config } from '@/config';

export const GoogleBanner = () => {
  const bannerRef = useRef<BannerAd>(null);

  return (
    <BannerAd
      ref={bannerRef}
      unitId={config.googleAdUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
    />
  );
};
