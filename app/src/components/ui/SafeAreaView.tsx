import { useThemeColor } from '@/hooks/useThemeColor';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedUI } from '@/types';

export default function ThemedSafeAreaView({
  style,
  lightColor,
  darkColor,
  className,
  ...otherProps
}: ThemedUI) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  );

  return (
    <SafeAreaView
      className={className}
      style={[{ backgroundColor }, style]}
      {...otherProps}
    />
  );
}
