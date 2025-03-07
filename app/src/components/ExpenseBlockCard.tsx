import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import TransactionOverview from './Charts/TransactionOverview';
import { useDataContext } from '@/context/DataProvider';
import Animated from 'react-native-reanimated';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';

export default function ExpenseBlockCard() {
	const { expenseList } = useDataContext();

	const renderItem = ({ item, index }: { item: any; index: number }) => {
		if (index == 0) {
			return (
				<TouchableOpacity onPress={() => router.push('/(transactions)/create')}>
					<View style={styles.addItemBtn}>
						<Feather name='plus' size={22} color={'#ccc'} />
					</View>
				</TouchableOpacity>
			);
		}

		const amount = item.amount.split('.');

		return (
			<Animated.View style={[styles.expenseBlock]}>
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
			</Animated.View>
		);
	};
	const staticItem = [{ name: 'Add Item' }];

	return (
		<View>
			{expenseList && (
				<>
					<View className='mb-4'>
						<TransactionOverview />
					</View>
					<FlatList
						data={staticItem.concat(expenseList)}
						renderItem={renderItem}
						horizontal
						showsHorizontalScrollIndicator={false}
					/>
				</>
			)}
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
		width: 100,
		padding: 15,
		marginRight: 20,
		gap: 8,
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		backgroundColor: Colors.orange,
		borderRadius: 10,
		boxShadow: '0 0  10px rgba(0, 0, 0, 0.3)',
		marginVertical: 10,
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
