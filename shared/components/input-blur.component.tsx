import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, TextInput, TextStyle } from 'react-native';

export const InputBlur = ({
  value,
  placeholder,
  handler,
  style,
  maxLength,
}: {
  value: string;
  placeholder?: string;
  handler: (v: string) => void;
  style?: TextStyle;
  maxLength?: number;
}) => {
  const [state, setState] = useState<string>('');
  let timer: NodeJS.Timeout | null;

  const extendedHandler = useCallback(
    (text: string): NodeJS.Timeout =>
      setTimeout(() => {
        handler(text);
        timer = null;
      }, 100),
    [],
  );

  useEffect(() => {
    setState(value);
  }, []);

  return (
    <TextInput
      onChangeText={(text) => {
        const slicedText = maxLength ? text.slice(0, maxLength) : text;

        setState(slicedText);

        timer && clearTimeout(timer);
        timer = extendedHandler(slicedText);
      }}
      value={state}
      placeholder={placeholder}
      style={[styles.textInput, style]}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    paddingLeft: 10,
    borderRadius: 10,
    boxShadow: 'none',
    shadowColor: 'black',
    width: '100%',
    height: 60,
    minHeight: 60,
  },
});
