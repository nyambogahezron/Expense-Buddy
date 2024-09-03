import { TransactionProps } from '@/Types';
import { Text, View } from 'react-native';
const userCurrency= 'Ksh'

const HomeTransactionCard = ({ item }: { item: TransactionProps }) => (
  <View className='flex-row justify-between items-center bg-gray-200 p-4 mx-2 rounded-xl mb-2'>
    <View className='flex-row items-center'>
      <View className='flex items-center justify-center bg-blue-700 h-14 w-14 rounded-full mr-3'>
        <Text className='text-lg font-bold text-white'>{item.icon}</Text>
      </View>
      <View>
        <Text className='text-lg font-semibold'>{item.title}</Text>
        <Text className='text-gray-500'>{item.date}</Text>
      </View>
    </View>
   <View className='flex flex-col items-end'>
      <Text
        className={`font-bold text-lg ${
          item.type === 'income' ? 'text-green-700' : 'text-red-700'
        }`}
      >
        {userCurrency + "." + item.amount}
      </Text>
      <Text className='text-gray-500'>{ '+' + item.transactionFee}</Text>
   </View>
  </View>
);

export default HomeTransactionCard;
