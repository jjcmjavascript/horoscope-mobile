import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {
  homeTagTitle,
  homeTitle,
  wishesTagTitle,
  wishesTitle,
} from './shared/constants/strings.constants';
import { StyleSheet, Text } from 'react-native';

export default function Layout() {
  return (
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
          headerTitle: () => <Text style={styles.titleStyle}>{homeTitle}</Text>,
          title: homeTagTitle,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
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
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  titleStyle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Moonlight',
  },
});
