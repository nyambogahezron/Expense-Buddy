import { TransactionProps } from '@/Types';
import { Text, View } from 'react-native';
const userCurrency = 'Ksh';

const HomeTransactionCard = ({ item }: { item: TransactionProps }) => (
  <View className='flex-row justify-between items-center bg-gray-200 p-4 mx-2 rounded-xl mb-2'>
    <View className='flex-row items-center'>
      <View
        className='flex items-center justify-center h-12 w-12 rounded-full mr-3'
        style={{
          backgroundColor: item.iconColor ? item.iconColor : '#3030cc',
        }}
      >
        <Text className='text-lg font-bold text-white italic'>{item.icon}</Text>
      </View>
      <View>
        <Text className='text-[16px] font-semibold'>
          {item.title.length > 16 ? item.title.slice(0, 13) +'...' : item.title}
        </Text>
        <Text className='text-gray-500'>{item.date}</Text>
      </View>
    </View>
    <View className='flex flex-col items-end'>
      <Text
        className={`font-bold text-[16px] ${
          item.type === 'income' ? 'text-green-700' : 'text-red-700'
        }`}
      >
        {userCurrency + '.' + item.amount}
      </Text>
      <Text className='text-gray-500 text-[14px] '>
        {'+' + item.transactionFee}
      </Text>
    </View>
  </View>
);

export default HomeTransactionCard;
