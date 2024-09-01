
import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/Colors';

// props for theme color and colorName for element for theme e.g background 

export function useThemeColor(  props: { light?: string; dark?: string },  elementName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][elementName];
  }
}
