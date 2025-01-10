import { ReactNode } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export const LinearContainer = ({ children }: { children: ReactNode }) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top']} style={styles.container}>
        <LinearGradient
          colors={['rgba(0,0,0,0.6)', 'transparent']}
          style={styles.background}
        >
          {children}
        </LinearGradient>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BA68C8',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
