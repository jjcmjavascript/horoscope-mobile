import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

export const AddButton = ({
  onPress,
  disabled,
}: {
  disabled?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}) => (
  <TouchableOpacity
    style={styles.container}
    onPress={onPress}
    disabled={disabled}
    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
  >
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
    width: 80,
    height: 80,
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
    zIndex: 3,
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
});
