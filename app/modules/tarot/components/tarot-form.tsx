import { Select } from '@/shared/components/select.component';
import { Dimensions, View, Text, TouchableOpacity } from 'react-native';
import { tarotSelectOptions } from '../helpers/cards.helper';
import { useTarotStore } from '../tarot.store';
import { InputBlur } from '@/shared/components/input-blur.component';
import {
  tarotBirthdayPlaceholder,
  tarotYourName,
  tarotYourThoughts,
} from '@/shared/constants/strings.constants';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { colorsLight } from '@/shared/constants/colors.contants';
import { getDateYmd } from '@/shared/helpers/date.helper';

const { width } = Dimensions.get('screen');

export const TarotForm = () => {
  const editMessageHeader = useTarotStore((state) => state.editMessageHeader);
  const question = useTarotStore((state) => state.messageHeader.question);
  const name = useTarotStore((state) => state.messageHeader.name);
  const birthday = useTarotStore((state) => state.messageHeader.birthday);
  const thoughts = useTarotStore((state) => state.messageHeader.thoughts);
  const initialDate = new Date();

  initialDate.setFullYear(initialDate.getFullYear() - 18);

  const date = new Date(birthday || getDateYmd(initialDate));
  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: (_, selectedDate) => {
        editMessageHeader({
          birthday: getDateYmd(selectedDate),
        });
      },
      mode: 'date',
      is24Hour: true,
    });
  };

  return (
    <View style={{ width: width * 0.8, alignItems: 'center' }}>
      <Select
        style={{ container: { width: width * 0.8, marginTop: 20 } }}
        options={tarotSelectOptions}
        selectedValue={question || null}
        onValueChange={(value) => {
          editMessageHeader({ question: value });
        }}
      />

      <InputBlur
        placeholder={tarotYourName}
        value={name || ''}
        maxLength={30}
        handler={(value) => {
          editMessageHeader({ name: value });
        }}
        style={{ marginTop: 10 }}
      />

      <InputBlur
        placeholder={tarotYourThoughts}
        value={thoughts || ''}
        maxLength={200}
        handler={(value) => {
          editMessageHeader({ thoughts: value });
        }}
        style={{ marginTop: 10 }}
      />

      <TouchableOpacity
        onPress={() => showDatePicker()}
        style={{
          marginTop: 15,
          backgroundColor: 'white',
          borderRadius: 10,
          width: width * 0.8,
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            width: '100%',
            padding: 15,
            color: colorsLight.colors.darkGray,
            fontSize: 16,
            textAlign: 'left',
          }}
        >
          {birthday ? birthday : tarotBirthdayPlaceholder}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
