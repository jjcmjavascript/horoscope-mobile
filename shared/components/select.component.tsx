import React from 'react';
import { View, StyleSheet, Text, ViewStyle } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface SelectProps {
  options: { id?: number | string; label: string; value?: string | number }[];
  selectedValue: number | null;
  onValueChange: (value: number | null) => void;
  label?: string;
  style?: {
    container?: ViewStyle;
  };
}

export const Select: React.FC<SelectProps> = ({
  options,
  selectedValue,
  onValueChange,
  label,
  style,
}) => {
  return (
    <View style={[styles.container, style?.container]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedValue || null}
          onValueChange={(itemValue) => onValueChange(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecciona una opcion" value={null} />
          {Object.values(options).map((option) => (
            <Picker.Item
              key={option.value || option.id}
              label={option.label}
              value={option.value || option.id}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  picker: {
    width: '100%',
  },
});
