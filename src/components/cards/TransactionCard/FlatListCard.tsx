import { View } from 'react-native';
import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import LoadMoreBtn from '@/components/LoadMoreBtn';
import TransactionHeader from './ListHeader';
import EmptyListCard from '@/components/EmptyListCard';
import { router } from 'expo-router';
import TransactionCard from '.';

export default function TransactionFlatList({
  transactionsData,
}: {
  transactionsData: any;
}) {
  return (
    <View className='mt-4'>
      {transactionsData && (
        <>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={transactionsData?.slice(0, 8) || []}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <TransactionCard item={item} />}
            ListHeaderComponent={
              <TransactionHeader
                viewMore={true}
                title='Transactions'
                onPressViewMore={() => router.push('/(tabs)/explore')}
              />
            }
            ListFooterComponent={
              <View>
                {transactionsData && transactionsData.length > 8 && (
                  <LoadMoreBtn
                    handleOnPress={() => router.push('/(tabs)/explore')}
                    title='View All'
                  />
                )}
              </View>
            }
            ListEmptyComponent={<EmptyListCard />}
          />
        </>
      )}
    </View>
  );
}
