import AsyncStorage from '@react-native-async-storage/async-storage';
export { useColorScheme } from 'react-native';

export async function getUserPreferredTheme() {
  try {
    const theme = await AsyncStorage.getItem('user-theme');
    if (theme !== null) {
      return theme;
    }
  } catch (e) {
    console.warn(e);
  }
  return null;
}
