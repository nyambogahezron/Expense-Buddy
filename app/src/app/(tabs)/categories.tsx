import { Platform, FlatList } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import CategoryCard from '@/components/cards/CategoryCard';
import { useTheme } from '@/context/ThemeProvider';
import ThemedSafeAreaView from '@/components/ui/ThemedSafeAreaView';
import { useDataContext } from '@/context/DataProvider';
import { Colors } from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';
import Fab from '@/components/ui/Fab';

export default function Categories() {
	const { theme } = useTheme();

	const { categoriesData } = useDataContext();

	return (
		<ThemedSafeAreaView style={{ flex: 1 }}>
			<StatusBar
				style={theme === 'light' ? 'dark' : 'light'}
				backgroundColor={Colors[useColorScheme('background')].background}
			/>
			<FlatList
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				data={categoriesData}
				renderItem={({ item }) => (
					<CategoryCard
						handleOnPress={() =>
							router.push({
								pathname: '/(categories)/details',
								params: { item: JSON.stringify(item) },
							})
						}
						id={item.id}
						name={item.name}
						icon={item.icon}
					/>
				)}
				keyExtractor={(item) =>
					item.id ? item.id.toString() : Math.random().toString()
				}
				contentContainerStyle={{ paddingBottom: 70 }}
				style={{
					marginTop: Platform.select({ android: -40 }),
					paddingHorizontal: 2,
				}}
			/>
			<Fab
				onPress={() => {
					router.push('/(categories)/create');
				}}
			/>
		</ThemedSafeAreaView>
	);
}
