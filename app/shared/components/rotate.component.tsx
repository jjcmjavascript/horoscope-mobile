import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { useAppStore } from '../hooks/use-app-store.hook';

const img = require('../assets/zodiac.png');
const { width, height } = Dimensions.get('window');

export function RotatingImage() {
  const position = useAppStore((state) => state.position);
  const rotationValue = new Animated.Value(0);
  const currentDegRange = useRef([0, 0]);

  const rotateImage = () => {
    Animated.timing(rotationValue, {
      toValue: 1, // Valor final (1 rotación completa)
      duration: 300, // Duración de la animación en milisegundos
      useNativeDriver: true, // Optimiza el rendimiento
    }).start(() => {});
  };

  const base = 360 / 12;
  const init =
    currentDegRange.current[1] <= -360 || position === 0
      ? 0
      : currentDegRange.current[1];
  const end = -(base * position);

  currentDegRange.current = [init, end];

  const rotationInterpolation = rotationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [`${init}deg`, `${end}deg`],
  });

  const animatedStyle = {
    transform: [{ rotate: rotationInterpolation }],
  };

  useEffect(() => {
    rotateImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={img}
        style={[styles.zodiacImage, animatedStyle]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 0,
    width: width,
    position: 'absolute',
  },
  zodiacImage: {
    width: width * 0.4,
    height: height * 0.4,
    aspectRatio: 1,
    top: height * 0.07,
    left: width / 2 - width * 0.4,
    shadowColor: 'red',
  },
});
