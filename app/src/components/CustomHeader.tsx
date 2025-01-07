import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { useGlobalContext } from '@/context/GlobalProvider';
import { useTheme } from '@/context/ThemeProvider';
import Feather from '@expo/vector-icons/Feather';
import { useRef } from 'react';
import useColorScheme from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

const CustomHeader = ({ isForExplore }: { isForExplore?: boolean }) => {
  const { top } = useSafeAreaInsets();
  const { User } = useGlobalContext();
  const { theme, toggleTheme } = useTheme();
  const searchInputRef = useRef<TextInput>(null);

  const styles = createStyles(theme);

  return (
    <View style={{ paddingTop: top + 5 }}>
      <View style={styles.headerContainer}>
        <View style={styles.wrapper}>
          <View style={styles.searchSection}>
            <Ionicons
              style={styles.searchIcon}
              name='search'
              size={20}
              color={Colors[useColorScheme('customIcon2')].customIcon2}
            />
            <TextInput
              ref={searchInputRef}
              style={styles.input}
              placeholder='Search...'
              placeholderTextColor={
                Colors[useColorScheme('customIcon2')].customIcon2
              }
              onFocus={() => router.push('/modals/search')}
            />
          </View>
          {!isForExplore && (
            <View style={styles.wrapper2}>
              <Link href={'/(tabs)/profile'}>
                <View style={styles.circle}>
                  {User && <Text style={styles.userName}>{User.name[0]}</Text>}
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
                    color={Colors[useColorScheme('customIcon2')].customIcon2}
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
                  color={Colors[useColorScheme('customIcon2')].customIcon2}
                />
              </View>
            </Link>
          )}
        </View>
      </View>
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    headerContainer: {
      flex: 1,
      height: 60,
      gap: 10,
      paddingHorizontal: 20,
      backgroundColor: 'transparent',
    },
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    wrapper2: {
      display: 'flex',
      flexDirection: 'row',
      gap: 2,
      marginLeft: 1,
    },
    searchSection: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors[useColorScheme('bg2')].bg2,
      borderRadius: 25,
      marginLeft: -3,
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
      backgroundColor: Colors[useColorScheme('bg2')].bg2,
      color: Colors[useColorScheme('customIcon2')].customIcon2,
      borderRadius: 30,
      fontWeight: 'semibold',
    },
    circle: {
      width: 40,
      height: 40,
      borderRadius: '50%',
      backgroundColor: Colors[useColorScheme('bg2')].bg2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    userName: {
      color: Colors[useColorScheme('customIcon2')].customIcon2,
      fontSize: 20,
      fontWeight: 'bold',
    },
  });

export default CustomHeader;
