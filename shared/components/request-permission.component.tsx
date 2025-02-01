import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Fragment } from 'react';
import {
  tarotAlert,
  tarotPermissionButton,
} from '../constants/strings.constants';
import { usePushNotification } from '../hooks/use-push-notification.hook';

const { width } = Dimensions.get('screen');

export const RequestPermissionComponent = () => {
  const { expoPushToken, createToken, isLoading } = usePushNotification();

  return (
    <Fragment>
      {!expoPushToken ? (
        <View style={styles.container}>
          <Text>{tarotAlert}</Text>
          <TouchableOpacity
            style={styles.buttonAcept}
            onPress={createToken}
            disabled={isLoading}
          >
            <Text style={styles.buttonTextStyle}>{tarotPermissionButton}</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </Fragment>
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
