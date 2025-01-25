import { colorsLight } from '@/shared/constants/colors.contants';
import {
  Dimensions,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

const { width } = Dimensions.get('screen');
const cardWidth = width / 3.2;
const cardHeight = cardWidth * 1.4;

export const TarotCardsSelector = ({
  data,
  onPress,
}: {
  data: {
    cardName: string;
    backUrl: string;
    index: number;
    cardUrl: string;
  }[];
  onPress: (cardName: string) => void;
}) => {
  return (
    <FlatList
      style={{
        width: width,
        maxHeight: cardHeight * 1.2,
      }}
      contentContainerStyle={{
        alignItems: 'center',
      }}
      horizontal={true}
      data={data}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => onPress(item.cardName)}
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
          <View style={styles.cardNumberContainer}>
            <Text style={styles.cardNumber}>{item.index}</Text>
          </View>
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
    height: '90%',
    objectFit: 'contain',
  },
  cardNumberContainer: {
    position: 'absolute',
    width: 35,
    height: 35,
    borderRadius: '50%',
    backgroundColor: colorsLight.colors.darkPurple,
  },
  cardNumber: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 35,
    color: colorsLight.colors.gray,
  },
});
