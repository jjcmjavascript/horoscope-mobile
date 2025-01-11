import { wishesPlaceHolder } from '@/app/shared/constants/strings.constants';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';

interface WishesListItemProps {
  itemData: {
    description: string;
    locked: boolean;
  };
}
const { width } = Dimensions.get('screen');

export const WishesListItem = ({ itemData }: WishesListItemProps) => (
  <View
    style={{
      flex: 1,
      flexDirection: 'row',
      width: width * 0.9,
      alignItems: 'center',
      marginTop: 10,
      paddingLeft: 25,
      paddingRight: 5,
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
    <TouchableOpacity>
      <EvilIcons name="lock" size={24} color="black" />
    </TouchableOpacity>
  </View>
);
