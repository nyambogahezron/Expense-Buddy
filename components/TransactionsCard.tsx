import { TransactionProps } from '@/Types';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
const userCurrency = 'Ksh';

type TransactionCardProps = {
  isLoading?: boolean;
  item: TransactionProps;
};

const isEmoji = (icon: string) => {
  const emojiRegex =
    /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F1E6}-\u{1F1FF}]/u;
  return emojiRegex.test(icon);
};

const TransactionCard = ({ item, isLoading }: TransactionCardProps) => (
  <View>
    {isLoading ? (
      <View>
        <Text>Loading...</Text>
      </View>
    ) : (
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: '/(transactions)/details',
            params: { item: JSON.stringify(item) },
          })
        }
        className='flex-row justify-between items-center px-1 py-3 mb-2 '
      >
        <View className='flex-row items-center'>
          <View
            className='flex items-center justify-center h-12 w-12 rounded-full mr-3'
            style={{
              backgroundColor: item.iconColor ? item.iconColor : '#3030cc',
            }}
          >
            <Text className='text-lg font-bold text-white'>
              {item.category.icon && isEmoji(item.category.icon)
                ? item.category.icon
                : item.title.charAt(0)}
            </Text>
          </View>
          <View>
            <Text className='text-[16px] font-semibold'>
              {item.title.length > 16
                ? item.title.slice(0, 13) + '...'
                : item.title}
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
      </TouchableOpacity>
    )}
  </View>
);

export default TransactionCard;
