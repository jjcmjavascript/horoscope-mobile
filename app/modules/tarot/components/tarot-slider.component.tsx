import React from 'react';
import { View, StyleSheet, Dimensions, Image, Text } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { ScrollView } from 'react-native-gesture-handler';
import { useTarotStore } from '../tarot.store';

const { width, height } = Dimensions.get('screen');
const cardWidth = width / 4;
const cardHeight = cardWidth * 1.5;

export function TarotSlider() {
  const data = useTarotStore((state) => state.readingResult);

  return (
    <View style={styles.container}>
      <Carousel
        loop={true}
        width={width * 0.9}
        autoPlay={false}
        data={data}
        scrollAnimationDuration={800}
        renderItem={({ item }) => (
          <ScrollView style={styles.scrollView}>
            <View style={styles.cardContainer}>
              {item.cardUrls.map((card, index) => (
                <Image
                  source={{ uri: card }}
                  style={{
                    width: cardWidth,
                    height: cardHeight,
                    borderRadius: 10,
                  }}
                  resizeMode="cover"
                  key={index}
                />
              ))}
            </View>

            <Text style={styles.text}>{item.reading}</Text>
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
    height: height * 0.8,
    zIndex: 1,
  },
  scrollView: {
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    padding: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    width: '100%',
    justifyContent: 'center',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 16,
    margin: 10,
  },
});
