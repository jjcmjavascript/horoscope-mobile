import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
// import { TextInput } from 'react-native-paper';

export const InputBlur = ({
  value,
  placeholder,
  handler,
}: {
  value: string;
  placeholder?: string;
  handler: (v: string) => void;
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
        setState(text);
        timer && clearTimeout(timer);
        timer = extendedHandler(text);
      }}
      value={state}
      placeholder={placeholder}
      style={styles.textInput}
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
