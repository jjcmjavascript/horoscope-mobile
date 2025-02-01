import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {
  homeTagTitle,
  homeTitle,
  tarotTagTitle,
  tarotTitle,
  wishesTagTitle,
  wishesTitle,
} from '@/shared/constants/strings.constants';
import { StyleSheet, Text } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { colorsLight } from '@/shared/constants/colors.contants';

export default function Layout() {
  return (
    <PaperProvider>
      <Tabs
        screenOptions={{
          headerStyle: {
            backgroundColor: colorsLight.colors.darkPurple,
          },
          headerTitleAlign: 'center',
          tabBarStyle: {
            backgroundColor: colorsLight.colors.darkPurple,
            borderTopWidth: 0,
          },
          tabBarActiveTintColor: colorsLight.colors.textActive,
          tabBarInactiveTintColor: colorsLight.colors.textInactive,
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
              <MaterialCommunityIcons
                name="target-variant"
                size={size}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="modules/tarot"
          options={{
            headerTitle: () => (
              <Text style={styles.titleStyle}>{tarotTitle}</Text>
            ),
            title: tarotTagTitle,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="cards-playing-outline"
                size={size}
                color={color}
              />
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
