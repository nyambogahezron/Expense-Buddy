import { View, Text, TouchableOpacity } from 'react-native';
import ThemedText from '@/components/ui/Text';
import SwipeableRow from '../../ui/SwipeableRow';
import { useDataContext } from '@/context/DataProvider';
import { router } from 'expo-router';
import isEmoji from '@/utils/isEmoji';

type CategoryCardProps = {
	handleOnPress: () => void;
	id: number;
	name: string;
	icon?: string;
};

export default function CategoryCard({
	handleOnPress,
	id,
	name,
	icon,
}: CategoryCardProps) {
	const { deleteCategory } = useDataContext();

	async function onDelete() {
		await deleteCategory(id.toString());
	}

	function onEdit() {
		router.push({
			pathname: '/(categories)/edit',
			params: { item: JSON.stringify({ id, name, icon }) },
		});
	}

	return (
		<SwipeableRow onDelete={onDelete} onEdit={() => onEdit()}>
			<TouchableOpacity
				activeOpacity={0.7}
				key={id}
				className='flex-row items-center justify-between py-3'
			>
				<TouchableOpacity
					activeOpacity={0.7}
					onPress={handleOnPress}
					className='flex-row items-center w-full'
				>
					<View className='p-4 mr-3 h-14 w-14 rounded-full ml-2 bg-orangeClr items-center justify-center'>
						<Text className='text-xl text-white font-pbold'>
							{isEmoji(icon) ? icon : name.charAt(0)}
						</Text>
					</View>
					<View>
						<ThemedText className='font-bold'>
							{name.length > 15 ? name.substring(0, 15) + '...' : name}
						</ThemedText>
					</View>
				</TouchableOpacity>
			</TouchableOpacity>
		</SwipeableRow>
	);
}
