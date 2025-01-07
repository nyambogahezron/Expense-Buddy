import React from 'react';
import { FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import ListHeader from './TransactionCard/ListHeader';
import { router } from 'expo-router';
import { useDataContext } from '@/context/DataProvider';
import ThemedView from '@/components/ui/View';
import ThemedText from '@/components/ui/Text';
import { Colors } from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';
import LoadMoreBtn from '../ui/LoadMoreBtn';

export default function IncomeBlockCard() {
  const { incomeList } = useDataContext();
  const colorScheme = useColorScheme();

  const renderItem = ({ item }: { item: any }) => {
    let amount = item.amount.split('.');
    return (
      <View
        style={[styles.container, { borderColor: Colors[colorScheme].border }]}
      >
        <ThemedView style={styles.wrapper}>
          <View style={styles.body}>
            <ThemedText type='subtitle'>
              {item.icon ? item.icon : item.name.charAt(0).toUpperCase()}
            </ThemedText>
          </View>
        </ThemedView>
        <ThemedText>{item.name}</ThemedText>
        <ThemedText style={{ fontSize: 18, fontWeight: '600' }}>
          ${amount[0]}.
          <ThemedText style={{ fontSize: 12, fontWeight: '400' }}>
            {amount[1]}
          </ThemedText>
        </ThemedText>
      </View>
    );
  };

  return (
    <>
      {incomeList && (
        <View>
          <View className='mt-5'>
            <ListHeader
              title='Top Incomes'
              containerStyle='mb-4'
              viewMore={false}
            />
            <FlatList
              keyExtractor={(item) => item.id}
              data={incomeList}
              renderItem={renderItem}
              showsVerticalScrollIndicator={Platform.select({
                web: true,
                default: false,
              })}
              numColumns={2}
              ListFooterComponent={
                <View>
                  <LoadMoreBtn
                    title='View More'
                    handleOnPress={() => router.push('/(tabs)/explore')}
                  />
                </View>
              }
            />
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    marginRight: 15,
    marginBottom: 15,
    borderWidth: 0.4,
    width: 150,
    gap: 10,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  body: {
    borderRadius: 50,
    padding: 5,
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
});
