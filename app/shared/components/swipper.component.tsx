import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { ScrollView } from 'react-native-gesture-handler';
import { useAppStore } from '../hooks/use-app-store.hook';
import { useShallow } from 'zustand/shallow';

const { width, height } = Dimensions.get('window');

const maxHeight = height * 0.6;

export function SwipperComponent() {
  const { data, setPosition } = useAppStore(
    useShallow((state) => ({
      data: state.data,
      setPosition: state.setPosition,
    })),
  );

  return (
    <View style={styles.container}>
      <Carousel
        onScrollEnd={(i) => {
          setPosition(i);
        }}
        loop={true}
        width={width * 0.8}
        autoPlay={false}
        data={data}
        scrollAnimationDuration={800}
        style={{ marginBottom: 20 }}
        renderItem={({ item }) => (
          <ScrollView
            style={{
              minHeight: maxHeight,
              maxHeight: maxHeight,
              marginLeft: 10,
              borderRadius: 20,
            }}
          >
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
    fontFamily: 'MoonLight',
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginTop: 12,
  },
});
