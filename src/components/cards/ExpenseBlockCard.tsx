import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import TransactionOverview from '../Charts/TransationOverview';
import PageModel from '../models/PageModel';
import AddTransaction from '../Form/AddTransaction';
import { useDataContext } from '@/context/DataProvider';

export default function ExpenseBlockCard() {
  const [isModalVisible, setModalVisible] = useState(false);
  const { expenseList } = useDataContext();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    if (index == 0) {
      return (
        <TouchableOpacity onPress={() => toggleModal()}>
          <View style={styles.addItemBtn}>
            <Feather name='plus' size={22} color={'#ccc'} />
          </View>
        </TouchableOpacity>
      );
    }

    const amount = item.amount.split('.');

    return (
      <View style={styles.expenseBlock}>
        <Text style={styles.expenseBlockTxt1}>
          {item.name.length > 10 ? item.name.slice(0, 10) + '...' : item.name}
        </Text>
        <Text style={styles.expenseBlockTxt2}>
          ${amount[0]}.
          <Text style={styles.expenseBlockTxt2Span}>{amount[1]}</Text>
        </Text>
        <View style={styles.expenseBlock3View}>
          <Text style={styles.expenseBlockTxt1}>{item.percentage}%</Text>
        </View>
      </View>
    );
  };
  const staticItem = [{ name: 'Add Item' }];

  return (
    <View>
      <View className='mb-4'>
        <TransactionOverview />
      </View>
      <FlatList
        data={staticItem.concat(expenseList)}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <PageModel
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        title='Add Transaction'
      >
        <AddTransaction />
      </PageModel>
    </View>
  );
}

const styles = StyleSheet.create({
  addItemBtn: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#666',
    borderStyle: 'dashed',
    borderRadius: 10,
    marginRight: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  expenseBlock: {
    backgroundColor: '#723FEB',
    width: 100,
    padding: 15,
    borderRadius: 10,
    marginRight: 20,
    gap: 8,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  expenseBlockTxt1: {
    color: '#fff',
    fontSize: 14,
  },
  expenseBlockTxt2: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  expenseBlockTxt2Span: {
    fontSize: 12,
    fontWeight: '400',
  },
  expenseBlock3View: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 10,
  },
});
