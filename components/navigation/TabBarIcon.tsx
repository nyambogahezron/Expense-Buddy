import Ionicons from '@expo/vector-icons/Ionicons';
import { Text, View } from 'react-native';

type TabBarIconProps = {
  color: string;
  name: string;
  focused: boolean;
  style?: any;
  iconName: string;
};

export function TabBarIcon({ color, name, focused, style, iconName }: TabBarIconProps) {
  return (
    <View className='flex items-center justify-center gap-2'>
      <Ionicons
        name={name}
        size={19}
        color={color}
        style={[{ marginBottom: -3 }, style]}
      />
      <Text
        className={`capitalize ${
          focused ? 'font-psemibold' : 'font-pregular'
        } text-xs`}
        style={{ color: color }}
      >
        {iconName}
      </Text>
    </View>
  );
}
