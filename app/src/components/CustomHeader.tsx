// TODO : Fix theme

import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { useGlobalContext } from '@/context/GlobalProvider';
import { useTheme } from '@/context/ThemeProvider';
import Feather from '@expo/vector-icons/Feather';
import { useRef } from 'react';

const CustomHeader = ({ isForExplore }: { isForExplore?: boolean }) => {
  const { top } = useSafeAreaInsets();
  const { User } = useGlobalContext();
  const { theme, toggleTheme } = useTheme();
  const searchInputRef = useRef<TextInput>(null);

  const styles = createStyles(theme);

  return (
    <View style={{ paddingTop: top + 5 }}>
      <View style={[styles.flex1, styles.headerContainer]}>
        <View
          style={[
            styles.flexRow,
            styles.justifyEnd,
            styles.itemsCenter,
            styles.gapRow2,
          ]}
        >
          <View style={[styles.mlNegative3, styles.searchSection]}>
            <Ionicons
              style={styles.searchIcon}
              name='search'
              size={20}
              color={theme === 'light' ? '#141518' : '#f2f2f2'}
            />
            <TextInput
              ref={searchInputRef}
              style={styles.input}
              placeholder='Search...'
              placeholderTextColor={theme === 'light' ? '#141518' : '#f2f2f2'}
              onFocus={() => router.push('/modals/search')}
            />
          </View>
          {!isForExplore && (
            <View style={[styles.flexRow, styles.gap2, styles.ml1]}>
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
      </View>
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    flex1: {
      flex: 1,
    },
    headerContainer: {
      height: 60,
      gap: 10,
      paddingHorizontal: 20,
      backgroundColor: 'transparent',
    },
    flexRow: {
      flexDirection: 'row',
    },
    justifyEnd: {
      justifyContent: 'flex-end',
    },
    itemsCenter: {
      alignItems: 'center',
    },
    gapRow2: {
      gap: 2,
    },
    mlNegative3: {
      marginLeft: -3,
    },
    gap2: {
      gap: 2,
    },
    ml1: {
      marginLeft: 1,
    },
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
      borderRadius: 50,
      backgroundColor: theme === 'light' ? '#D8DCE2' : '#1c1c1e',
      justifyContent: 'center',
      alignItems: 'center',
    },
    userName: {
      color: theme === 'light' ? '#141518' : '#f2f2f2',
      fontSize: 20,
      fontWeight: 'bold',
    },
  });

export default CustomHeader;
