import { Stack } from 'expo-router';
import { homeTitle } from './shared/constants/strings.constants';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6A1B9A',
        },
        headerTitleAlign: 'center',
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontFamily: 'Moonlight',
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: homeTitle,
        }}
      />
    </Stack>
  );
}
