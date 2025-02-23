import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	Dimensions,
	StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ExternalLink } from '@/components/navigation/ExternalLink';
import { useTheme } from '@/context/ThemeProvider';
import OptionContainer from '@/components/OptionContainer';
import BackButton from '@/components/navigation/BackButton';
import HeaderRightIconCard from '@/components/navigation/HeaderRightIconCard';
import { supabase } from '@/utils/supabase';
import { useGlobalContext } from '@/context/GlobalProvider';
import ThemedSafeAreaView from '@/components/ui/ThemedSafeAreaView';
import ThemedView from '@/components/ui/View';
import ThemedText from '@/components/ui/Text';
import { Colors } from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';

const width = Dimensions.get('window').width;

const Profile = () => {
	const { theme } = useTheme();
	const { User } = useGlobalContext();

	// Sign out user
	async function signOut() {
		const { error } = await supabase.auth.signOut();
		if (error) console.log('Error logging out:', error.message);

		router.replace('/(auth)/login');
	}

	return (
		<ThemedSafeAreaView style={{ flex: 1 }}>
			<StatusBar
				style={theme === 'light' ? 'dark' : 'light'}
				backgroundColor={Colors[useColorScheme('background')].background}
			/>
			<Stack.Screen
				options={{
					title: 'Profile',
					headerShown: true,
					headerTitleAlign: 'center',
					headerStyle: {
						backgroundColor: theme === 'light' ? '#ffffff' : '#070B11',
					},
					headerLeft: () => <BackButton />,
					headerTitleStyle: {
						color: theme === 'light' ? '#333' : '#fff',
						fontSize: 20,
						fontWeight: 'bold',
					},
					headerRight: () => (
						<HeaderRightIconCard handleOnPress={signOut}>
							<Ionicons
								name='log-out-outline'
								size={22}
								color={theme === 'light' ? 'black' : '#fff'}
							/>
						</HeaderRightIconCard>
					),
				}}
			/>
			<ScrollView
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
			>
				{/* Header and Profile Info */}
				<View style={styles.profileContainer}>
					<ThemedView
						darkColor='#1c1c1e'
						lightColor='#ffffff'
						style={styles.avatarContainer}
					>
						<Text
							style={{
								color: Colors.darkOrange,
								fontSize: 70,
								fontWeight: 'bold',
							}}
						>
							{User?.name?.charAt(0)}
						</Text>
					</ThemedView>
					<ThemedText style={styles.userName}>{User?.name}</ThemedText>
					<ThemedText style={styles.userEmail}>{User?.email}</ThemedText>
				</View>

				{/* Account Settings Options */}
				<View style={styles.optionsContainer}>
					<OptionContainer
						title='Settings'
						icon='settings-outline'
						handleOnPress={() => router.push('/(profile)/settings')}
					/>
					<OptionContainer
						title='Account Info'
						icon='person-outline'
						handleOnPress={() => router.push('/(profile)/accountInfo')}
					/>

					<View style={styles.externalLinkContainer}>
						<ExternalLink href='https://nyambogahezron.vercel.app'>
							<ThemedView
								darkColor='#1c1c1e'
								lightColor='#e5e7eb'
								style={styles.externalLink}
							>
								<View style={styles.externalLinkContent}>
									<Ionicons
										name='lock-closed-outline'
										size={22}
										color='#6B7280'
									/>
									<Text style={styles.externalLinkText}>Privacy Policy</Text>
								</View>
								<View style={styles.chevronIcon}>
									<Ionicons name='chevron-forward' size={22} color='#6B7280' />
								</View>
							</ThemedView>
						</ExternalLink>
					</View>

					<TouchableOpacity
						activeOpacity={0.7}
						style={[
							styles.logoutButton,
							theme === 'light'
								? styles.logoutButtonLight
								: styles.logoutButtonDark,
						]}
						onPress={signOut}
					>
						<Ionicons name='log-out-outline' size={22} color='#EF4444' />
						<Text style={styles.logoutText}>Logout</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</ThemedSafeAreaView>
	);
};

const styles = StyleSheet.create({
	profileContainer: {
		alignItems: 'center',
		marginBottom: 32,
	},
	avatarContainer: {
		width: 100,
		height: 100,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 56,
	},

	userName: {
		fontSize: 18,
		fontWeight: 'bold',
		marginTop: 16,
	},
	userEmail: {
		color: '#6B7280',
	},
	optionsContainer: {
		paddingHorizontal: 16,
	},
	externalLinkContainer: {
		marginBottom: 16,
	},
	externalLink: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderRadius: 8,
		paddingHorizontal: 16,
		paddingVertical: 12,
		width: width,
	},
	externalLinkContent: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	externalLinkText: {
		marginLeft: 16,
		color: '#6B7280',
	},
	chevronIcon: {
		position: 'absolute',
		right: 8,
	},
	logoutButton: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 8,
		paddingHorizontal: 16,
		paddingVertical: 12,
	},
	logoutButtonLight: {
		backgroundColor: '#E5E7EB',
	},
	logoutButtonDark: {
		backgroundColor: '#1c1c1e',
	},
	logoutText: {
		marginLeft: 16,
		color: '#EF4444',
	},
});

export default Profile;
