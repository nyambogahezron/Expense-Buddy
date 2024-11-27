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
import Animated from 'react-native-reanimated';
import { FadeInRight } from 'react-native-reanimated';
import { ThemedText, ThemedView } from '../Themed';

export default function IncomeBlockCard() {
  const { incomeList } = useDataContext();

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    let amount = item.amount.split('.');
    return (
      <Animated.View
        style={styles.container}
        entering={FadeInRight.duration(300 + (300 * index) / 2)}
      >
        <ThemedView style={styles.wrapper}>
          <View style={styles.body}>
            <ThemedText>
              {item.icon ? item.icon : item.name.charAt(0).toUpperCase()}
            </ThemedText>
          </View>
          <TouchableOpacity onPress={() => {}}>
            <Feather name='more-horizontal' size={20} color={'#FCFCFC'} />
          </TouchableOpacity>
        </ThemedView>
        <ThemedText>{item.name}</ThemedText>
        <ThemedText style={{ fontSize: 18, fontWeight: '600' }}>
          ${amount[0]}.
          <ThemedText style={{ fontSize: 12, fontWeight: '400' }}>
            {amount[1]}
          </ThemedText>
        </ThemedText>
      </Animated.View>
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
