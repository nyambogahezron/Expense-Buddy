import { View, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import { TransactionCategoryProps } from '@/types';
import EmptyListCard from '@/components/EmptyListCard';
import TransactionCard from '@/components/cards/TransactionCard';
import { TransactionProps } from '@/types';
import { useTheme } from '@/context/ThemeProvider';
import BackButton from '@/components/navigation/BackButton';
import { useDataContext } from '@/context/DataProvider';
import ThemedSafeAreaView from '@/components/ui/ThemedSafeAreaView';
import ThemedText from '@/components/ui/Text';
import ThemedView from '@/components/ui/View';

export default function CategoriesDetails() {
  const { theme } = useTheme();
  const { transactionsData } = useDataContext();

  const [categoriesDetails, setCategoriesDetails] = useState<
    TransactionProps[]
  >([]);
  const { item } = useLocalSearchParams();
  const category: TransactionCategoryProps =
    typeof item === 'string' ? JSON.parse(item) : null;
  const { id, name, icon } = category;

  useEffect(() => {
    const data = transactionsData.filter(
      (item: any) => item.category.id === id
    );
    setCategoriesDetails(data);
  }, []);

  return (
    <ThemedSafeAreaView style={styles.safeAreaView}>
      <StatusBar
        style={theme === 'light' ? 'dark' : 'light'}
        backgroundColor={theme === 'light' ? '#ffffff' : '#070B11'}
      />
      <Stack.Screen
        options={{
          title: 'Category Details',
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: theme === 'light' ? '#ffffff' : '#070B11',
          },
          headerLeft: () => <BackButton containerStyles='-ml-2' />,
          headerTitleStyle: {
            color: theme === 'light' ? '#333' : '#fff',
            fontSize: 20,
            fontWeight: 'bold',
          },
        }}
      />
      <ThemedView style={styles.themedView}>
        {/* category transactions */}

        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={categoriesDetails}
          renderItem={({ item }) => (
            <View style={styles.transactionCardContainer}>
              <TransactionCard item={item} />
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={
            <View>
              {categoriesDetails.length > 0 && (
                <ThemedView style={styles.listHeader}>
                  <TouchableOpacity
                    style={[
                      styles.touchableOpacity,
                      {
                        backgroundColor:
                          theme === 'light' ? '#e5e7eb' : '#1c1c1e',
                      },
                    ]}
                    activeOpacity={0.7}
                  >
                    <View style={styles.headerContent}>
                      <View style={styles.iconContainer}>
                        <Text>{icon ? icon : name.charAt(0)}</Text>
                      </View>
                      <View>
                        <ThemedText style={styles.headerText}>
                          {`Transactions for ${
                            name.length > 30 ? name.slice(0, 30) + '...' : name
                          }`}
                        </ThemedText>
                      </View>
                    </View>
                  </TouchableOpacity>
                </ThemedView>
              )}
            </View>
          }
          ListEmptyComponent={
            <EmptyListCard title={`No Transactions For ${name}`} />
          }
        />
      </ThemedView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  themedView: {
    marginTop: -8,
  },
  transactionCardContainer: {
    paddingHorizontal: 2,
  },
  listHeader: {
    paddingHorizontal: 2,
    marginTop: 2,
  },
  touchableOpacity: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 4,
    borderRadius: 8,
    marginBottom: 4,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: 'white',
    padding: 3,
    borderRadius: 50,
    marginRight: 4,
  },
  headerText: {
    fontWeight: 'bold',
  },
});
