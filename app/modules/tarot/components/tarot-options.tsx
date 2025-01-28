import { Select } from '@/shared/components/select.component';
import { Dimensions } from 'react-native';
import { tarotSelectOptions } from '../helpers/cards.helper';
import { useTarotStore } from '../tarot.store';

const { width } = Dimensions.get('screen');

export const TarotOptions = () => {
  const editMessageHeader = useTarotStore((state) => state.editMessageHeader);
  const question = useTarotStore((state) => state.messageHeader.question);

  return (
    <Select
      style={{ container: { width: width * 0.8, marginTop: 20 } }}
      options={tarotSelectOptions}
      selectedValue={question || null}
      onValueChange={(value) => {
        editMessageHeader({ question: value });
      }}
    />
  );
};
