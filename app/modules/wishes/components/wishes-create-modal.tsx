import { Modal } from '@/shared/components/modal.components';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useWishesStore } from '../wishes.store';
import {
  wishesErrorInCreate,
  wishesPlaceHolder,
} from '@/shared/constants/strings.constants';
import { useShallow } from 'zustand/shallow';
import { InputBlur } from '@/shared/components/input-blur.component';

export const WishesCreateModal = () => {
  const { wish, closeModal, showModal, createWish, error } = useWishesStore(
    useShallow((state) => ({
      wish: state.wish,
      closeModal: state.closeModal,
      showModal: state.showModal,
      createWish: state.createWish,
      error: state.error,
      writeOnWish: state.writeOnWish,
    })),
  );

  const wishDescription = useWishesStore((state) => state.wish.description);
  const writeOnWish = useWishesStore((state) => state.writeOnWish);
  const disabledButton = wishDescription.length > 100;

  return (
    <Modal show={showModal} style={styles.modalContainer}>
      <InputBlur
        value={wishDescription}
        placeholder={wishesPlaceHolder}
        handler={(value) => {
          writeOnWish({
            description: value,
          });
        }}
      />
      <Text style={styles.wishDescription}>
        {wishDescription.length} de 100
      </Text>
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
  wishDescription: {
    marginTop: 15,
  },
  modalContainer: {
    flex: 0,
    width: '90%',
    marginLeft: '5%',
    height: 200,
    borderRadius: 20,
    padding: 20,
    justifyContent: 'space-around',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    paddingLeft: 10,
    borderRadius: 10,
    shadowColor: 'black',
    width: '100%',
    height: 60,
    minHeight: 60,
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
