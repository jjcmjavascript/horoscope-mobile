import { Modal } from '@/shared/components/modal.components';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useWishesStore } from '../wishes.store';
import {
  wishesErrorInCreate,
  wishesPlaceHolder,
} from '@/shared/constants/strings.constants';
import { useShallow } from 'zustand/shallow';

export const WishesCreateModal = () => {
  const showModal = useWishesStore((state) => state.showModal);
  const wish = useWishesStore(useShallow((state) => state.wish));
  const writeOnWish = useWishesStore((state) => state.writeOnWish);
  const closeModal = useWishesStore((state) => state.closeModal);
  const createWish = useWishesStore((state) => state.createWish);
  const error = useWishesStore((state) => state.error);
  const disabledButton = wish.description.length > 100;

  return (
    <Modal
      show={showModal}
      style={{
        flex: 0,
        width: '90%',
        marginLeft: '5%',
        height: 200,
        borderRadius: 20,
        padding: 20,
        justifyContent: 'space-around',
      }}
    >
      <TextInput
        onChangeText={(value) => {
          writeOnWish({
            description: value,
          });
        }}
        value={wish.description}
        placeholder={wishesPlaceHolder}
        style={styles.textInput}
      />
      <Text>{wish.description.length} de 100</Text>
      <Text>{error ? wishesErrorInCreate : ''}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.buttonCancel} onPress={closeModal}>
          <Text style={styles.buttonTextStyle}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonAcept}
          onPress={() => createWish(wish)}
          disabled={disabledButton}
        >
          <Text style={styles.buttonTextStyle}>Agregar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    paddingLeft: 10,
    borderRadius: 10,
    shadowColor: 'black',
    width: '100%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonTextStyle: {
    color: 'white',
    textAlign: 'center',
  },
  buttonCancel: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#CE93D8',
    padding: 10,
    width: '30%',
    borderRadius: 10,
  },
  buttonAcept: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#6A1B9A',
    padding: 10,
    width: '30%',
    borderRadius: 10,
    marginLeft: 10,
  },
});
