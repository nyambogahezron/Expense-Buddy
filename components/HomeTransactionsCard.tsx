import { TransactionProps } from "@/Types";
import { Image, Text, View } from "react-native";

const HomeTransactionCard = ({ item }: { item: TransactionProps }) => (
  <View className='flex-row justify-between items-center bg-gray-200 p-4 rounded-xl mb-2'>
    <View className='flex-row items-center'>
      <View className='bg-blue-700 h-3 w-3 rounded-full'>
        <Text></Text>
      </View>
      <View>
        <Text className='text-lg font-semibold'>{item.title}</Text>
        <Text className='text-gray-500'>{item.date}</Text>
      </View>
    </View>
    <Text className='text-lg font-bold'>{item.amount}</Text>
  </View>
);

export default HomeTransactionCard;