import { View, ScrollView, StyleSheet, Platform } from 'react-native';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import CategoryCard from '@/components/cards/CategoryCard';
import CategoryActionCard from '@/components/cards/CategoryCard/CategoryActionCardModel';
import { useTheme } from '@/context/ThemeProvider';
import ThemedSafeAreaView from '@/components/ui/ThemedSafeAreaView';
import { useState } from 'react';
import { useDataContext } from '@/context/DataProvider';
import { Colors } from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';
import Fab from '@/components/ui/Fab';

export default function Categories() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTransaction, setActiveTransaction] = useState();
  const { categoriesData } = useDataContext();

  const handleOpenPress = (item: any) => {
    setModalVisible(true);
    setActiveTransaction(item);
  };
  const handleClosePress = () => setModalVisible(false);

  return (
    <ThemedSafeAreaView style={styles.container}>
      <StatusBar
        style={theme === 'light' ? 'dark' : 'light'}
        backgroundColor={Colors[useColorScheme('background')].background}
      />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={[
          styles.scrollView,
          {
            marginTop: Platform.select({ android: -28 }),
          },
        ]}
      >
        <View style={styles.view}>
          {categoriesData.map((item: any) => {
            const { id, name, icon } = item;
            return (
              <CategoryCard
                key={id}
                handleOnPress={() =>
                  router.push({
                    pathname: '/(categories)/details',
                    params: { item: JSON.stringify(item) },
                  })
                }
                handleOpenPress={() => handleOpenPress({ item })}
                id={id}
                name={name}
                icon={icon}
              />
            );
          })}
        </View>
      </ScrollView>

      {/* actions BottomSheet model*/}

      <CategoryActionCard
        handleClosePress={handleClosePress}
        item={activeTransaction}
        modalVisible={modalVisible}
      />

      <Fab onPress={() => {}} />
    </ThemedSafeAreaView>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollView: {
      marginBottom: 10,
    },
    view: {
      paddingHorizontal: 12,
    },
  });
