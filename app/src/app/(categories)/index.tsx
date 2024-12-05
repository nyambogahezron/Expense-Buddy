import { View, ScrollView, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import CategoryCard from '@/components/cards/CategoryCard';
import CategoryActionCard from '@/components/cards/CategoryCard/CategoryActionCardModel';
import { useTheme } from '@/context/ThemeProvider';
import BackButton from '@/components/navigation/BackButton';
import HeaderRightIconCard from '@/components/navigation/HeaderRightIconCard';
import ThemedSafeAreaView from '@/components/ui/SafeAreaView';
import { useState } from 'react';
import { useDataContext } from '@/context/DataProvider';

const Statistics = () => {
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
        backgroundColor={theme === 'light' ? '#ffffff' : '#070B11'}
      />
      <Stack.Screen
        options={{
          title: 'Categories',
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: styles.headerStyle,
          headerLeft: () => <BackButton />,
          headerTitleStyle: styles.headerTitleStyle,
          headerRight: () => (
            <HeaderRightIconCard
              handleOnPress={() => router.push('/(categories)/create')}
            >
              <FontAwesome5
                name='plus'
                size={18}
                color={theme === 'light' ? 'black' : '#fff'}
              />
            </HeaderRightIconCard>
          ),
        }}
      />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
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
    </ThemedSafeAreaView>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollView: {
      marginBottom: 8,
      marginTop: -8,
    },
    view: {
      paddingHorizontal: 12,
    },
    headerStyle: {
      backgroundColor: theme === 'light' ? '#ffffff' : '#070B11',
    },
    headerTitleStyle: {
      color: theme === 'light' ? '#333' : '#fff',
      fontSize: 20,
      fontWeight: 'bold',
    },
  });

export default Statistics;
