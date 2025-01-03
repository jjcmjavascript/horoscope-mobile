import { useState, useEffect } from 'react';
import * as Font from 'expo-font';

export const useMoonLight = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    setFontsLoaded(true);
    Font.loadAsync({
      AstroFont: require('../assets/fonts/Moonlight.otf'),
    })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setFontsLoaded(false);
      });
  }, []);

  return {
    isLoading: fontsLoaded,
  };
};
