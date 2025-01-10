import { AddButton } from '@/app/shared/components/add-button.component';
import { LinearContainer } from '@/app/shared/components/linear-containet.component';
import { LoadingCircle } from '@/app/shared/components/loadin.component';
import { StyleSheet, Text, View } from 'react-native';

export default function Wishes() {
  return (
    <LinearContainer>
      <Text style={styles.text}>Entrena ctm</Text>
      <AddButton />
      <LoadingCircle />
    </LinearContainer>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 50,
    color: 'white',
  },
});
