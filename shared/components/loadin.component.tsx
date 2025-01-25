import React, { useEffect, useRef } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { cargando } from '../constants/strings.constants';
import { colorsLight } from '../constants/colors.contants';

const { height } = Dimensions.get('screen');

export const LoadingCircle = ({
  containerStyle,
}: {
  containerStyle?: {
    position?: 'absolute' | 'relative';
    flex: number;
    backgroundColor?: string;
    height?: number | '100%';
    width?: number | '100%';
    marginTop?: number;
    zIndex?: number;
  };
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [fadeAnim]);

  return (
    <View style={[styles.container, containerStyle]}>
      <ActivityIndicator
        size="large"
        color={colorsLight.colors.brilliantPink}
      />

      <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
        {cargando}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.4,
  },
  text: {
    fontSize: 18,
    color: colorsLight.colors.brilliantPink,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'white',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
});
