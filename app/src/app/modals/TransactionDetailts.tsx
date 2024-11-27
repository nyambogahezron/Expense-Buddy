import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { TransactionProps } from '@/types';
import { Dimensions } from 'react-native';
import { useTheme } from '@/context/ThemeProvider';
import { ThemedText, ThemedView } from '@/components/Themed';
import isEmoji from '@/utils/isEmoji';
import { useDataContext } from '@/context/DataProvider';
import { useToast } from 'react-native-toast-notifications';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');
type Props = {
  item: TransactionProps;
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const TransactionDetails = ({ item, modalVisible, setModalVisible }: Props) => {
  const { deleteTransaction } = useDataContext();

  const { theme } = useTheme();
  const toast = useToast();
  const transactionDetails = [
    { label: 'Amount', value: item.amount },
    { label: 'Date', value: item.date },
    { label: 'Transaction Fee', value: item.transactionFee },
    { label: 'Description', value: item.description },
    { label: 'Transaction Type', value: item.type },
    { label: 'Transaction Category', value: item.category.name },
  ];
  return (
    <View>
      <BlurView intensity={80} style={styles.centeredView}>
        <Modal
          animationType='fade'
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* close btn */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setModalVisible(false)}
              className='absolute top-0 left-0 m-2'
            >
              <AntDesign name='closecircleo' size={26} color='#f97316' />
            </TouchableOpacity>
            <View>
              <View
                className='relative items-center justify-center p-1 pb-3 rounded-[18px] mt-10'
                style={{
                  borderColor: theme === 'light' ? '#f2f2f2' : '#1c1c1e',
                }}
              >
                {/* Title  */}
                <ThemedView
                  darkColor='#1c1c1e'
                  lightColor='#f2f2f2'
                  className='absolute top-0 flex flex-col items-center rounded-full p-1 -mt-10 mb-8  '
                >
                  <View
                    className='flex items-center justify-center h-14 w-14 rounded-full p-2'
                    style={{
                      backgroundColor: item.iconColor
                        ? item.iconColor
                        : '#3030cc',
                    }}
                  >
                    <Text className='text-lg font-bold text-white'>
                      {item.category.icon && isEmoji(item.category.icon)
                        ? item.category.icon
                        : item.title.charAt(0)}
                    </Text>
                  </View>
                </ThemedView>
                <View className='mt-14'>
                  {/* Transaction Details */}
                  {transactionDetails.map(
                    (detail, index) =>
                      detail && (
                        <View
                          key={index}
                          className='mb-2 relative px-2'
                          style={{ width: width * 0.92 }}
                        >
                          <ThemedView
                            darkColor='#1c1c1e'
                            lightColor='transparent'
                            className='p-2 rounded-lg '
                          >
                            <ThemedText className='ml-2 font-pbold text-[15px]'>
                              {detail.label}
                            </ThemedText>

                            <ThemedText
                              darkColor='#ccc'
                              className='text-[14px] capitalize font-pregular ml-2'
                            >
                              {detail.value}
                            </ThemedText>
                          </ThemedView>
                        </View>
                      )
                  )}
                </View>
              </View>
              {/* Action Buttons */}
              <View className='flex w-full flex-row justify-end gap-2  mt-4'>
                <Animated.View entering={FadeInRight.delay(200)}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() =>
                      router.push({
                        pathname: '/(transactions)/edit',
                        params: { transaction: JSON.stringify(item) },
                      })
                    }
                    className='p-3  rounded-lg'
                  >
                    <View className='flex flex-row items-center gap-2'>
                      <FontAwesome
                        name='edit'
                        size={18}
                        color={theme === 'light' ? '#000' : '#fff'}
                      />
                    </View>
                  </TouchableOpacity>
                </Animated.View>
                <Animated.View entering={FadeInRight.delay(300)}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      deleteTransaction(item.id);
                      router.push('/(tabs)');
                      toast.show('Transaction deleted successfully', {
                        type: 'success',
                      });
                    }}
                    className='p-3 rounded-lg'
                  >
                    <View className='flex flex-row items-center gap-2'>
                      <FontAwesome name='trash' size={18} color='red' />
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            </View>
          </ScrollView>
        </Modal>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'gray',
    height: '100%',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '90%',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default TransactionDetails;
