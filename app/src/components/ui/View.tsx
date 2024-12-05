import { View, type ViewProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedUI } from '@/types';

export default function ThemedView({
  style,
  className,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedUI) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  );

  return (
    <View
      className={className}
      style={[{ backgroundColor }, style]}
      {...otherProps}
    />
  );
}
