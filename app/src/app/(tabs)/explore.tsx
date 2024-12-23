import { StyleSheet, View } from 'react-native';
import ThemedText from '@/components/ui/Text';
import ThemedView from '@/components/ui/View';
import useColorScheme from '@/hooks/useColorScheme';
import ThemedSafeAreaView from '@/components/ui/SafeAreaView';
import Fab from '@/components/ui/Fab';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/context/ThemeProvider';

export default function HomeScreen() {
  const { theme } = useTheme();

  return (
    <ThemedSafeAreaView style={styles.safeArea}>
      <StatusBar
        style={theme === 'light' ? 'dark' : 'light'}
        backgroundColor={Colors[useColorScheme('headerBackground')].tint}
      />
      <Stack.Screen
        options={{
          header: () => <CustomHeader />,
        }}
      />
      <ThemedView style={styles.themedView}></ThemedView>

      <Fab onPress={() => {}} />
    </ThemedSafeAreaView>
  );
}

function CustomHeader() {
  return (
    <ThemedView>
      <View style={styles.header} className='border'>
        <ThemedText>CustomHeader</ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: 8,
  },
  themedView: {
    marginTop: 16,
  },
  header: {
    backgroundColor: 'orange',
    height: 120,
    width: '100%',
  },
});
