import { View, Text, Dimensions, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useGlobalContext } from '@/context/GlobalProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInLeft } from 'react-native-reanimated';
import Button from '@/components/ui/Button';
import { Colors } from '@/constants/Colors';

const { width, height } = Dimensions.get('window');

export default function LandingPage() {
	const { session } = useGlobalContext();
	const router = useRouter();
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		if (session && isMounted) {
			router.replace('/(tabs)');
		}
	}, []);

	return (
		<SafeAreaView className='flex-1 justify-center items-center bg-dark'>
			<StatusBar style='light' backgroundColor='transparent' />
			<View style={styles.gradientContainer}>
				<LinearGradient
					style={styles.gradient}
					colors={['#EE401B', '#F1621B', '#F38D1B']}
					start={[0.9, 0.8]}
					end={[0.1, 0.2]}
				/>
			</View>
			<View className='flex-1'>
				{/* card  */}
				<View>
					<View
						style={{
							width: width * 0.9,
							height: height * 0.25,
						}}
						className='relative  ml-2 shadow-lg mb-12 mt-[60px] rotate-[-4deg] rounded-2xl bg-dark opacity-80'
					>
						<View className='flex justify-center p-4 mx-4'>
							<View className='flex flex-row mt-2'>
								<View className='w-12 h-12 rounded-full bg-redCrl opacity-70'></View>
								<View className='w-12 h-12 rounded-full bg-orangeClr opacity-70 right-6'></View>
							</View>
							<Text className='text-white text-2xl font-bold mt-4'>
								My Wallet
							</Text>
							<View className='flex flex-row justify-around mt-8 items-center'>
								<Text className='p-1 text-white text-2xl'>***</Text>
								<Text className=' p-1  text-white text-2xl'>***</Text>
								<Text className=' p-1  text-white text-2xl'>***</Text>
								<Text className=' p-1  text-white text-2xl'>1234</Text>
							</View>
						</View>
					</View>
				</View>

				{/* Title */}
				<View className='flex flex-row gap-3 items-center justify-center'>
					<View className='flex items-center justify-center  h-24 top-[-20px]'>
						<Text className='font-bold text-white text-5xl italic mr-2 bg-orange-500 p-1 rounded-lg'>
							Your
						</Text>
					</View>
					<View>
						<Text className='text-white text-4xl font-bold mb-2'>EXPENSE</Text>
						<Text className='text-white text-4xl font-bold mb-10'>BUDDY</Text>
					</View>
				</View>

				{/* Description */}
				<View className='flex items-center mb-1 '>
					<Animated.Text
						entering={FadeInLeft}
						className='text-white text-center px-6 mb-1 mt-2 text-[16px] tracking-widest font-plight'
					>
						The right app to make it easy to manage your expenses on the go.
					</Animated.Text>
					<Text className='text-white font-psemibold mt-2 text-[16px]'>
						Personal Capital Expensify
					</Text>
				</View>

				<Animated.View
					entering={FadeInDown}
					className='w-full absolute px-3 -ml-3 items-center justify-center bottom-10'
				>
					<Button
						title='Register'
						handleOpenPress={() => router.push('/(auth)/register')}
						customStyles={{
							backgroundColor: Colors.blue,
							marginTop: 4,
						}}
						textStyles={styles.buttonText}
					/>

					<Button
						title='Login'
						handleOpenPress={() => router.push('/(auth)/login')}
						customStyles={{
							backgroundColor: 'transparent',
							borderColor: 'white',
							borderWidth: 1,
							marginTop: 15,
						}}
						textStyles={styles.buttonText}
					/>
				</Animated.View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	gradientContainer: {
		position: 'absolute',
		height: 200,
		width: 200,
		borderRadius: '50%',
		overflow: 'hidden',
		right: -40,
		top: -30,
	},
	gradient: {
		position: 'absolute',
		height: 300,
		width: 300,
		borderRadius: '50%',
		right: -40,
		top: -30,
	},
	buttonText: {
		color: Colors.white,
		fontSize: 18,
		fontWeight: 'bold',
		textTransform: 'capitalize',
		fontFamily: 'Poppins-Regular',
	},
});
