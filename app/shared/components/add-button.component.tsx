import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

export const AddButton = ({
  onPress,
}: {
  onPress?: (event: GestureResponderEvent) => void;
}) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Text style={styles.text}>+</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 10,
    bottom: 20,
    backgroundColor: '#6A1B9A',
    fontSize: 20,
    width: 50,
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.65,
    elevation: 5,
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
});
