import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  tarotAlert,
  tarotPermissionButton,
} from '../constants/strings.constants';

const { width } = Dimensions.get('screen');

export const RequestPermissionComponent = ({
  onPress,
  isLoading,
}: {
  onPress: () => void;
  isLoading: boolean;
}) => {
  return (
    <View style={styles.container}>
      <Text>{tarotAlert}</Text>
      <TouchableOpacity
        style={styles.buttonAcept}
        onPress={onPress}
        disabled={isLoading}
      >
        <Text style={styles.buttonTextStyle}>{tarotPermissionButton}</Text>
      </TouchableOpacity>
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
    alignItems: 'center',
    marginTop: 10,
  },
  buttonTextStyle: {
    color: 'white',
    textAlign: 'center',
  },
  buttonAcept: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#6A1B9A',
    padding: 10,
    width: '30%',
    borderRadius: 10,
    marginLeft: 10,
  },
});
