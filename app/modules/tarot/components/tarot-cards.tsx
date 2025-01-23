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
const cardWidth = width / 4;
const cardHeight = cardWidth * 1.3;

export const TarotCards = () => {
  const { cards, seletedCards, selectOne } = useTarotStore();

  return (
    <FlatList
      style={{
        width: width * 0.9,
        marginTop: 10,
        maxHeight: cardHeight * 1.1,
      }}
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      horizontal={true}
      data={cards}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          onPress={() => selectOne(item.cardName)}
          style={[
            styles.cardContainer,
            { width: cardWidth, height: cardHeight },
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
