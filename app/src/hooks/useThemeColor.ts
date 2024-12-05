import { Colors } from '@/constants/Colors';
import { useTheme } from '../context/ThemeProvider';

type Theme = 'light' | 'dark';

interface ThemeProps {
  light?: string;
  dark?: string;
}

export function useThemeColor(
  props: ThemeProps,
  elementName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const { theme } = (useTheme() as { theme: Theme }) || 'light';

  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][elementName];
  }
}


