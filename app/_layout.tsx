import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {
  homeTagTitle,
  homeTitle,
  wishesTagTitle,
  wishesTitle,
} from './shared/constants/strings.constants';
import { StyleSheet, Text } from 'react-native';
import { PaperProvider } from 'react-native-paper';

export default function Layout() {
  return (
    <PaperProvider>
      <Tabs
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6A1B9A',
          },
          headerTitleAlign: 'center',
          tabBarStyle: {
            backgroundColor: '#6A1B9A',
            borderTopWidth: 0,
          },
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: '#BDBDBD',
          tabBarLabelStyle: {
            fontSize: 10, // Tamaño del texto
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            headerTitle: () => (
              <Text style={styles.titleStyle}>{homeTitle}</Text>
            ),
            title: homeTagTitle,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="zodiac-virgo"
                size={size}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="modules/wishes"
          options={{
            headerTitle: () => (
              <Text style={styles.titleStyle}>{wishesTitle}</Text>
            ),
            title: wishesTagTitle,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="list-circle-outline" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  titleStyle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
