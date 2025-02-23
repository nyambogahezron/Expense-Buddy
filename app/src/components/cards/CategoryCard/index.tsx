import { View, Text, TouchableOpacity } from 'react-native';
import ThemedText from '@/components/ui/Text';
import SwipeableRow from '../../ui/SwipeableRow';
import { useDataContext } from '@/context/DataProvider';
import { useToast } from 'react-native-toast-notifications';
import { router } from 'expo-router';

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
	const toast = useToast();

	async function onDelete() {
		await deleteCategory(id.toString());
		toast.show('Category deleted successfully', {
			type: 'success',
		});
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
				className='flex-row items-center justify-between py-3  '
			>
				<TouchableOpacity
					activeOpacity={0.7}
					onPress={handleOnPress}
					className='flex-row items-center w-full'
				>
					<View className='p-4 rounded-full mr-3'>
						<Text className='text-2xl text-white'>
							{icon ? icon : name.charAt(0)}
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
