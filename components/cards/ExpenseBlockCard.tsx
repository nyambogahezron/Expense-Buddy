import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import { Feather } from '@expo/vector-icons';

const expenseList = [
  {
    id: '1',
    name: 'Housing',
    amount: '955.75',
    percentage: '61',
  },
  {
    id: '2',
    name: 'Food',
    amount: '300.55',
    percentage: '19',
  },
  {
    id: '3',
    name: 'Saving',
    amount: '200.95',
    percentage: '13',
  },
  {
    id: '4',
    name: 'Miscleneous',
    amount: '70.95',
    percentage: '5',
  },
];

const Colors = {
  black: '#1A1A1A',
  grey: '#242424',
  white: '#FCFCFC',
  tintColor: '#723FEB',
  blue: '#97E0F7',
};

export default function ExpenseBlockCard() {
  const renderItem = ({ item, index }: { item: any; index: number }) => {
    if (index == 0) {
      return (
        <TouchableOpacity onPress={() => {}}>
          <View style={styles.addItemBtn}>
            <Feather name='plus' size={22} color={'#ccc'} />
          </View>
        </TouchableOpacity>
      );
    }

    let amount = item?.amount.split('.');

    return (
      <View
        style={[
          styles.expenseBlock,
          {
            backgroundColor:
              item.name == 'Food'
                ? Colors.blue
                : item.name == 'Saving'
                ? Colors.white
                : Colors.tintColor,
          },
        ]}
      >
        <Text
          style={[
            styles.expenseBlockTxt1,
            {
              color:
                item.name == 'Food'
                  ? Colors.black
                  : item.name == 'Saving'
                  ? Colors.black
                  : Colors.white,
            },
          ]}
        >
          {item.name}
        </Text>
        <Text
          style={[
            styles.expenseBlockTxt2,
            {
              color:
                item.name == 'Food'
                  ? Colors.black
                  : item.name == 'Saving'
                  ? Colors.black
                  : Colors.white,
            },
          ]}
        >
          ${amount[0]}.
          <Text style={styles.expenseBlockTxt2Span}>{amount[1]}</Text>
        </Text>
        <View style={styles.expenseBlock3View}>
          <Text
            style={[
              styles.expenseBlockTxt1,
              {
                color:
                  item.name == 'Food'
                    ? Colors.black
                    : item.name == 'Saving'
                    ? Colors.black
                    : Colors.white,
              },
            ]}
          >
            {item.percentage}%
          </Text>
        </View>
      </View>
    );
  };

  const staticItem = [{ name: 'Add Item' }];

  return (
    <View style={{ paddingVertical: 20 }}>
      <FlatList
        data={staticItem.concat(expenseList)}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
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
    backgroundColor: Colors.tintColor,
    width: 100,
    padding: 15,
    borderRadius: 15,
    marginRight: 20,
    gap: 8,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  expenseBlockTxt1: {
    color: Colors.white,
    fontSize: 14,
  },
  expenseBlockTxt2: {
    color: Colors.white,
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
