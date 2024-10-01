import { TransactionProps } from '@/types';
import isEmoji from '@/utils/isEmoji';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
const userCurrency = 'Ksh';
import { ThemedText, ThemedView } from '@/components/Themed';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppleStyleSwipeableRow from '@/components/SwipeableRow';


type TransactionCardProps = {
  item: TransactionProps;
};

const TransactionCard = ({ item }: TransactionCardProps) => (
  <GestureHandlerRootView className='justify-center'>
    <AppleStyleSwipeableRow onDelete={() => {}} onToggle={() => {}}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() =>
          router.push({
            pathname: '/(transactions)/details',
            params: { item: JSON.stringify(item) },
          })
        }
        className='flex-row justify-between items-center px-1 py-3 mb-2'
      >
        <ThemedView className='flex-row items-center'>
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
            <ThemedText className='text-[16px] font-semibold'>
              {item.title.length > 16
                ? item.title.slice(0, 13) + '...'
                : item.title}
            </ThemedText>
            <Text className='text-gray-500 mt-1'>{item.date}</Text>
          </View>
        </ThemedView>
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
    </AppleStyleSwipeableRow>
  </GestureHandlerRootView>
);

export default TransactionCard;
