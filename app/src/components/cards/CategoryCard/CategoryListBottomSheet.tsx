import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import React, { useCallback, useMemo } from 'react';
import { useTheme } from '@/context/ThemeProvider';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { CategoryPickerProps, TransactionCategoryProps } from '@/types';
import { Entypo, AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import Loading from '@/components/ui/Loading';
import EmptyListCard from '@/components/EmptyListCard';
import { useDataContext } from '@/context/DataProvider';
import ThemedText from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

export default function CategoryListBottomSheet({
	setSelectedCategory,
	bottomSheetRef,
	selectedCategory,
	setSelectedCategoryObj,
}: CategoryPickerProps) {
	const { theme } = useTheme();
	const snapPoints = useMemo(() => ['30%', '100%'], []);
	const handleClosePress = () => bottomSheetRef.current?.close();
	const { categoriesData, isLoading } = useDataContext();

	const CategoryCard = useCallback(
		({ item }: { item: TransactionCategoryProps }) => (
			<TouchableOpacity
				onPress={() => {
					setSelectedCategory(item.name);
					setSelectedCategoryObj(item);
					handleClosePress();
				}}
				key={item?.id}
				activeOpacity={0.8}
				className='flex-row justify-between items-center bg-[#f3f4f6] p-4 rounded-lg mb-1 w-full'
				style={{
					width: width * 0.94,
					backgroundColor: theme === 'light' ? '#f3f4f6' : '#1c1c1e',
				}}
			>
				<View className='flex-row items-center'>
					<View className='bg-[#fff] p-3 rounded-full mr-4'>
						<Text>{item?.icon ? item?.icon : item?.name?.charAt(0)}</Text>
					</View>
					<View>
						<ThemedText className='font-bold'>{item.name}</ThemedText>
					</View>
				</View>

				{selectedCategory === item.name ? (
					<AntDesign name='checkcircle' size={17} color='green' />
				) : (
					<Entypo name='circle' size={17} color='#f2f2f2' />
				)}
			</TouchableOpacity>
		),
		[selectedCategory, theme]
	);

	return (
		<BottomSheet
			index={-1}
			snapPoints={snapPoints}
			ref={bottomSheetRef}
			enablePanDownToClose={true}
			handleIndicatorStyle={{
				backgroundColor: theme === 'light' ? '#333' : '#fff',
			}}
			backgroundStyle={{
				backgroundColor: theme === 'light' ? '#fff' : '#070B11',
			}}
		>
			<BottomSheetFlatList
				data={categoriesData}
				keyExtractor={(item: any) => item.id.toString()}
				renderItem={({ item }) => {
					return isLoading ? <Loading /> : <CategoryCard item={item} />;
				}}
				contentContainerStyle={{ alignItems: 'center', paddingBottom: 100 }}
				ListHeaderComponent={
					<View>
						<Button
							title='New Category'
							handleOpenPress={() => router.push('/(categories)/create')}
							customStyles={{
								backgroundColor: Colors.orange,
								width: width * 0.9,
								borderRadius: 10,
								padding: 10,
								marginVertical: 10,
							}}
							textStyles={{
								color: '#fff',
								fontSize: 16,
								fontWeight: 'bold',
							}}
						/>
					</View>
				}
				ListEmptyComponent={
					<EmptyListCard
						title='No categories available'
						buttonText='Add New Category'
						onPress={() => router.push('/(categories)/create')}
					/>
				}
			/>
		</BottomSheet>
	);
}
