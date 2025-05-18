import { useThemeStore } from '@/store/theme';
import { ScrollViewStyleReset } from 'expo-router/html';

export default function Root({ children }: { children: React.ReactNode }) {
	const { theme } = useThemeStore();
	return (
		<html lang='en'>
			<head>
				<meta charSet='utf-8' />
				<meta httpEquiv='X-UA-Compatible' content='IE=edge' />
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1, shrink-to-fit=no'
				/>

				{/* 
          Disable body scrolling on web. This makes ScrollView components work closer to how they do on native. 
          However, body scrolling is often nice to have for mobile web. If you want to enable it, remove this line.
        */}
				<ScrollViewStyleReset />
			</head>
			<body
				style={{
					backgroundColor: theme.colors.background,
				}}
			>
				{children}
			</body>
		</html>
	);
}
