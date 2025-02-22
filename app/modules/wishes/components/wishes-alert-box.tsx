import { wishesText } from '@/shared/constants/strings.constants';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('screen');

export const WishesAlertBox = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{wishesText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.8,
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.6)',
    padding: 10,
    borderRadius: 10,
    top: 20,
  },
  text: {
    fontSize: 18,
    fontStyle: 'italic',
  },
});
