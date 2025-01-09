import React, { useState } from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  View,
  Modal,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ThemedSafeAreaView from '@/components/ui/SafeAreaView';
import { useTheme } from '@/context/ThemeProvider';
import { useDataContext } from '@/context/DataProvider';
import EmptyListCard from '@/components/EmptyListCard';
import TransactionCard from '@/components/cards/TransactionCard';
import Fab from '@/components/ui/Fab';
import { router, Stack } from 'expo-router';
import { Colors } from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import BackButton from '@/components/navigation/BackButton';
import ThemedText from '@/components/ui/Text';

const { width, height } = Dimensions.get('window');

export default function Transactions() {
  const { transactionsData } = useDataContext();
  const { theme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const openFilterModal = () => {
    setModalVisible(true);
  };

  const closeFilterModal = () => {
    setModalVisible(false);
  };

  return (
    <ThemedSafeAreaView style={styles.safeArea}>
      <StatusBar
        style={theme === 'light' ? 'dark' : 'light'}
        backgroundColor={Colors[useColorScheme('background')].background}
      />

      <Stack.Screen
        options={{
          title: 'Transactions',
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: Colors[useColorScheme('header')].header,
          },
          headerLeft: () => <BackButton />,
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={openFilterModal}
                style={{ marginRight: 15 }}
              >
                <Ionicons name='filter' size={24} color='black' />
              </TouchableOpacity>
            );
          },
          headerTitleStyle: {
            color: Colors[useColorScheme('customIcon')].customIcon,
            fontSize: 20,
            fontWeight: 'bold',
          },
        }}
      />

      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={transactionsData?.slice(0, 50) || []}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <TransactionCard item={item} />}
          ListEmptyComponent={
            <EmptyListCard title='No transactions available' />
          }
        />
      </View>
      <Fab onPress={() => router.push('/(tabs)/create')} />

      {/* Filter Modal */}
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeFilterModal}
      >
        <View style={styles.modalView}>
          <TouchableOpacity
            onPress={closeFilterModal}
            style={{ position: 'absolute', top: 10, right: 10 }}
          >
            <Ionicons name='close' size={28} color='black' />
          </TouchableOpacity>

          <Text style={styles.modalText}>Filter Options</Text>
          <View style={styles.filterOptions}>
            <View style={styles.filterOption}>
              <ThemedText>Sort</ThemedText>
              <View>
                <TouchableOpacity>
                  <Text>Ascending</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text>Descending</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* actions btn */}

          <View style={styles.actionsBtn}>
            <TouchableOpacity>
              <Text style={styles.closeButton}>Clear All</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.closeButton}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  container: {
    marginTop: Platform.select({ android: -35, default: 0 }),
  },

  modalView: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    height: height * 0.4,
    width: width,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 0.4,
    borderColor: '#ccc',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'white',
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    top: 10,
    marginBottom: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 15,
    color: 'blue',
  },
  actionsBtn: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    bottom: 10,
  },
  filterOptions: {
    width: '100%',
  },
  filterOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
});
