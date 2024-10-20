import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import { Feather, FontAwesome } from '@expo/vector-icons';
import ListHeader from './TransactionCard/ListHeader';
import { router } from 'expo-router';

const Colors = {
  black: '#1A1A1A',
  grey: '#242424',
  white: '#FCFCFC',
  tintColor: '#723FEB',
  blue: '#97E0F7',
};
const incomeList = [
  {
    id: '1',
    name: 'Salary',
    amount: '1,500.00',
  },
  {
    id: '2',
    name: 'Freelancing',
    amount: '850.99',
  },
  {
    id: '3',
    name: 'Interest',
    amount: '200.95',
  },
];
export default function IncomeBlockCard() {
  const renderItem = ({ item }: { item: any }) => {
    let icon = <FontAwesome name='money' size={22} color={Colors.white} />;
    if (item.name == 'Freelancing') {
      icon = <FontAwesome name='money' size={22} color={Colors.white} />;
    } else if (item.name == 'Interest') {
      icon = <FontAwesome name='money' size={22} color={Colors.white} />;
    }

    let amount = item.amount.split('.');
    return (
      <View
        style={{
          backgroundColor: Colors.grey,
          padding: 20,
          borderRadius: 10,
          marginRight: 15,
          width: 150,
          gap: 10,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              borderColor: '#666',
              borderWidth: 1,
              borderRadius: 50,
              padding: 5,
              alignSelf: 'flex-start',
            }}
          >
            {icon}
          </View>
          <TouchableOpacity onPress={() => {}}>
            <Feather name='more-horizontal' size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>
        <Text style={{ color: Colors.white }}>{item.name}</Text>
        <Text style={{ color: Colors.white, fontSize: 18, fontWeight: '600' }}>
          ${amount[0]}.
          <Text style={{ fontSize: 12, fontWeight: '400' }}>{amount[1]}</Text>
        </Text>
      </View>
    );
  };

  return (
    <View>
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
  );
}

const styles = StyleSheet.create({});
