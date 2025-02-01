import { LinearContainer } from '@/shared/components/linear-containet.component';
import { LoadingCircle } from '@/shared/components/loadin.component';
import { colorsLight } from '@/shared/constants/colors.contants';

export default function TarotLoadingContainer() {
  return (
    <LinearContainer>
      <LoadingCircle
        containerStyle={{
          position: 'absolute',
          zIndex: 4,
          flex: 1,
          backgroundColor: colorsLight.colors.darkPurple,
          marginTop: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </LinearContainer>
  );
}
