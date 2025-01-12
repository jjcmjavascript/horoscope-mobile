import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Wish } from '../wish.interface';
import { useWishesStore } from '../wishes.store';

const { width } = Dimensions.get('screen');

export const WishesListItem = ({ itemData }: { itemData: Wish }) => {
  const destroyWish = useWishesStore((state) => state.destroyWish);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        width: width * 0.9,
        alignItems: 'center',
        marginTop: 10,
        paddingLeft: 25,
        paddingRight: 25,
        paddingBottom: 5,
        paddingTop: 5,
        backgroundColor: 'white',
        borderRadius: 5,
      }}
    >
      <Text
        style={{
          fontSize: 40,
          position: 'absolute',
          left: 0,
        }}
      >
        💫
      </Text>
      <Text
        style={{
          paddingLeft: 10,
          borderRadius: 2,
          shadowColor: 'black',
          minHeight: 50,
          width: '100%',
        }}
      >
        {itemData.description}
      </Text>
      <TouchableOpacity
        onPress={() => {
          console.log('inte', itemData);
          return itemData.id ? destroyWish(itemData.id) : null;
        }}
        style={{
          backgroundColor: 'white',
          position: 'absolute',
          top: 0,
          right: 0,
        }}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Text>
          <AntDesign name="close" size={16} color="#880E4F" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};
