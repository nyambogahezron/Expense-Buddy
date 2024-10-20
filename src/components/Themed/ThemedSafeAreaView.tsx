import { type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { SafeAreaView } from 'react-native-safe-area-context';

export type SafeAreaViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  className?: string;
};

export function ThemedSafeAreaView({
  style,
  lightColor,
  darkColor ,
  className,
  ...otherProps
}: SafeAreaViewProps) {
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
