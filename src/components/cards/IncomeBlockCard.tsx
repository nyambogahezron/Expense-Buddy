import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import ListHeader from './TransactionCard/ListHeader';
import { router } from 'expo-router';
import { useDataContext } from '@/context/DataProvider';

export default function IncomeBlockCard() {
  const { incomeList } = useDataContext();

  const renderItem = ({ item }: { item: any }) => {
    let amount = item.amount.split('.');
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.body}>
            <Text className='text-white'>
              {item.icon ? item.icon : item.name.charAt(0).toUpperCase()}
            </Text>
          </View>
          <TouchableOpacity onPress={() => {}}>
            <Feather name='more-horizontal' size={20} color={'#FCFCFC'} />
          </TouchableOpacity>
        </View>
        <Text style={{ color: '#FCFCFC' }}>{item.name}</Text>
        <Text style={{ color: '#FCFCFC', fontSize: 18, fontWeight: '600' }}>
          ${amount[0]}.
          <Text style={{ fontSize: 12, fontWeight: '400' }}>{amount[1]}</Text>
        </Text>
      </View>
    );
  };

  return (
    <>
      {incomeList && (
        <View>
          <View className='mt-5'>
            <ListHeader
              title='Incomes'
              containerStyle='mb-4'
              viewMore={true}
              onPressViewMore={() => router.push('/(tabs)/explore')}
            />
            <FlatList
              data={incomeList}
              renderItem={renderItem}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#242424',
    padding: 20,
    borderRadius: 10,
    marginRight: 15,
    width: 150,
    gap: 10,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  body: {
    borderColor: '#666',
    borderWidth: 1,
    borderRadius: 50,
    padding: 5,
    alignSelf: 'flex-start',
  },
});
