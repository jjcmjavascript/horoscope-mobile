import { FlatList, View } from 'react-native';
import { useWishesStore } from '../wishes.store';
import { WishesListItem } from './wishes-item';

export const WishesList = () => {
  const items = useWishesStore((state) => state.list);

  return (
    <View>
      <FlatList
        data={items}
        keyExtractor={(item, i) => item.id?.toString() ?? item.description}
        renderItem={({ item }) => <WishesListItem itemData={item} />}
      />
    </View>
  );
};
