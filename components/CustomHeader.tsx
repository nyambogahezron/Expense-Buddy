import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { Link, router } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useGlobalContext } from '@/context/GlobalProvider';
import { useTheme } from '@/context/ThemeProvider';
import Feather from '@expo/vector-icons/Feather';

const CustomHeader = ({ isForExplore }: { isForExplore?: boolean }) => {
  const { top } = useSafeAreaInsets();
  const { User } = useGlobalContext();
  const { theme, toggleTheme } = useTheme();

  const styles = createStyles(theme);

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        backgroundColor: theme === 'light' ? '#ffffff' : '#070B11',
      }}
    >
      <BlurView intensity={3} tint={'extraLight'} style={{ paddingTop: top }}>
        <View
          className='flex-row justify-between items-center'
          style={{
            height: 60,
            gap: 10,
            paddingHorizontal: 20,
            backgroundColor: 'transparent',
          }}
        >
          <View className='-ml-3' style={styles.searchSection}>
            <Ionicons
              style={styles.searchIcon}
              name='search'
              size={20}
              color={theme === 'light' ? '#141518' : '#f2f2f2'}
            />

            <TextInput
              style={styles.input}
              placeholder='Search...'
              placeholderTextColor={theme === 'light' ? '#141518' : '#f2f2f2'}
              onFocus={() => router.push('/modals/search')}
            />
          </View>

          {!isForExplore && (
            <View className='flex-row gap-2'>
              <Link href={'/(tabs)/profile'}>
                <View style={styles.circle}>
                  {User?.name ? (
                    <Text
                      style={{
                        color: theme === 'light' ? '#141518' : '#f2f2f2',
                        fontSize: 20,
                        fontWeight: 'bold',
                      }}
                    >
                      {User.name[0]}
                    </Text>
                  ) : (
                    <Ionicons
                      name={'person'}
                      size={20}
                      color={theme === 'light' ? '#141518' : '#f2f2f2'}
                    />
                  )}
                </View>
              </Link>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => toggleTheme()}
              >
                <View style={styles.circle}>
                  <Feather
                    name={theme === 'light' ? 'sun' : 'moon'}
                    size={20}
                    color={theme === 'light' ? '#141518' : '#f2f2f2'}
                  />
                </View>
              </TouchableOpacity>
            </View>
          )}
          {isForExplore && (
            <Link href={'/(tabs)/profile'}>
              <View style={styles.circle}>
                <Ionicons
                  name={'filter'}
                  size={20}
                  color={theme === 'light' ? '#141518' : '#f2f2f2'}
                />
              </View>
            </Link>
          )}
        </View>
      </BlurView>
    </GestureHandlerRootView>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    searchSection: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme === 'light' ? '#D8DCE2' : '#1c1c1e',
      borderRadius: 25,
    },
    searchIcon: {
      padding: 12,
    },
    input: {
      flex: 1,
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
      paddingLeft: 0,
      backgroundColor: theme === 'light' ? '#D8DCE2' : '#1c1c1e',
      color: theme === 'light' ? '#141518' : '#f2f2f2',
      borderRadius: 30,
      fontWeight: 'semibold',
    },
    circle: {
      width: 40,
      height: 40,
      borderRadius: 30,
      backgroundColor: theme === 'light' ? '#D8DCE2' : '#1c1c1e',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default CustomHeader;
