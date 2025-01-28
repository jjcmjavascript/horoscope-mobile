import { colorsLight } from '@/shared/constants/colors.contants';
import { CardEntity } from '@/shared/entities/card.entity';
import { Fragment } from 'react';
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

interface TarotCardProps {
  data: CardEntity[];
  onPress: (cardName: string) => void;
  disabled?: boolean;
}

export const TarotCardsSelector = ({
  data,
  onPress,
  disabled = false,
}: TarotCardProps) => {
  return (
    <Fragment>
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
            disabled={disabled}
            onPress={() => onPress(item.values.name)}
            style={[
              styles.cardContainer,
              { width: cardWidth, height: cardHeight },
            ]}
          >
            <Image
              source={{ uri: item.values.backUrl }}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.cardNumberContainer}>
              <Text style={styles.cardNumber}>{item.values.index}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.values.cardUrl}
      ></FlatList>
    </Fragment>
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
