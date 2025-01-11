import * as React from 'react';
import { ViewStyle } from 'react-native';
import { Modal as MyModal, Portal, Text } from 'react-native-paper';

interface ModalProps {
  show: boolean;
  onDismiss?: () => void;
  children?: React.ReactNode;
  style?: ViewStyle;
}

export const Modal = ({
  show,
  onDismiss,
  children,
  style = {},
}: ModalProps) => {
  const containerStyle = {
    backgroundColor: 'white',
    flex: 1,
    ...style,
  };

  return (
    <Portal>
      <MyModal
        style={{
          backgroundColor: 'rgba(0,0,0,0.3)',
        }}
        visible={show}
        onDismiss={onDismiss}
        contentContainerStyle={containerStyle}
      >
        {children}
      </MyModal>
    </Portal>
  );
};
