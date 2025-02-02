import React, { useEffect, useMemo, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { ScrollView } from 'react-native-gesture-handler';
import { useAppStore } from '../hooks/use-app-store.hook';
import { useShallow } from 'zustand/shallow';
import Feather from '@expo/vector-icons/Feather';
import { colorsLight } from '../constants/colors.contants';
import { useFavoriteStorage } from '../hooks/favorite.storage';
import { ZodiacSignEnum } from '../types/common.enums';

const { width, height } = Dimensions.get('screen');

const maxHeight = height * 0.6;

export function SwipperComponent() {
  const carouselRef = useRef<ICarouselInstance>(null);

  const { data, setPosition } = useAppStore(
    useShallow((state) => ({
      data: state.data,
      setPosition: state.setPosition,
    })),
  );

  const { favoriteSign, toggleFavorite } = useFavoriteStorage(
    useShallow((state) => ({
      favoriteSign: state.favoriteSign,
      toggleFavorite: state.toggleFavorite,
    })),
  );

  const favoriteSignIndex = useMemo(
    () => data.findIndex((d) => d.values.sign === favoriteSign),
    [favoriteSign],
  );

  useEffect(() => {
    if (favoriteSignIndex !== -1) {
      if (carouselRef.current) {
        carouselRef.current.scrollTo({
          index: favoriteSignIndex,
          animated: true,
        });
      }

      setPosition(favoriteSignIndex);
    }
  }, [favoriteSignIndex]);

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        onScrollEnd={(i) => {
          setPosition(i);
        }}
        loop={true}
        width={width * 0.8}
        autoPlay={false}
        data={data}
        scrollAnimationDuration={800}
        renderItem={({ item }) => (
          <ScrollView
            style={{
              minHeight: maxHeight,
              maxHeight: maxHeight,
              marginLeft: 10,
              borderRadius: 20,
            }}
          >
            <TouchableOpacity
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                zIndex: 1,
                padding: 5,
              }}
              onPress={() => {
                toggleFavorite(item.values.sign as ZodiacSignEnum);
              }}
            >
              <Feather
                name="bookmark"
                size={30}
                style={{
                  fontWeight: 'bold',
                  color:
                    item.values.sign === favoriteSign
                      ? colorsLight.colors.textWarning
                      : colorsLight.colors.textInactive,
                }}
              />
            </TouchableOpacity>
            <View style={styles.card}>
              <Text style={styles.title}>{item.values.sign}</Text>
              {item.values.amor && (
                <Text style={styles.description}>{item.values.amor}</Text>
              )}
              {item.values.salud && (
                <Text style={styles.description}>{item.values.salud}</Text>
              )}
              {item.values.familia && (
                <Text style={styles.description}>{item.values.familia}</Text>
              )}
              {item.values.dinero && (
                <Text style={styles.description}>{item.values.dinero}</Text>
              )}
              {item.values.consejo && (
                <Text style={styles.description}>{item.values.consejo}</Text>
              )}
            </View>
          </ScrollView>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: maxHeight,
    zIndex: 1,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    padding: 25,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    minHeight: maxHeight,
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    fontStyle: 'italic',
    width: '100%',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginTop: 12,
  },
});
