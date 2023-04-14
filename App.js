import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomBarNavigation from './src/navigators/BottomTabNavigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <BottomBarNavigation/>
    </SafeAreaProvider>
  );
}

