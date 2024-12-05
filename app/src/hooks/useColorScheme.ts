import { useThemeColor } from './useThemeColor';
import { Colors } from '@/constants/Colors';

export default function useColorScheme(
  elementName?: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  return useThemeColor(
    { light: 'light', dark: 'dark' },
    elementName || 'background'
  ) as 'light' | 'dark';
}
