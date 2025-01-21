import {
  Dimensions,
  Image,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useTarotStore } from '../tarot.store';

const { width } = Dimensions.get('screen');
const cardWidth = width / 3;
const cardHeight = cardWidth * 1.4;

export const TarotCards = () => {
  const { cards, seletedCards, selectOne } = useTarotStore();

  return (
    <View>
      <FlatList
        style={{ maxHeight: cardHeight, width: width * 0.9 }}
        horizontal={true}
        data={cards}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => selectOne(item.cardName)}
            style={[
              styles.cardContainer,
              { width: cardWidth, height: cardHeight, backgroundColor: 'red' },
            ]}
          >
            <Image
              source={{ uri: item.backUrl }}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <Text style={styles.cardNumber}>{item.index}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.cardUrl}
      />

      <View
        style={{
          width: width * 0.9,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'blue',
        }}
      >
        {seletedCards.map((card) => (
          <Image
            key={card.cardName}
            source={{ uri: card.cardUrl }}
            style={{ width: 100, height: 140 }}
            resizeMode="cover"
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardNumber: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 30,
    position: 'absolute',
    textShadowColor: 'yellow',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 20,
  },
});
