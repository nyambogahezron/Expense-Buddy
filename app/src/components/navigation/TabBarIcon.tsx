import { Feather } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text, View } from 'react-native';

type TabBarIconProps = {
  color: string;
  name: React.ComponentProps<typeof Feather>['name'];
  focused: boolean;
  style?: any;
  iconName: string;
};

export function TabBarIcon({ color, name, focused, style, iconName }: TabBarIconProps) {
  return (
    <View className='flex items-center justify-center gap-2'>
      <Feather
        name={name}
        size={22}
        color={color}
        style={[{ marginBottom: -3 }, style]}
      />
      {/* <Text
        className={`capitalize ${
          focused ? 'font-psemibold' : 'font-pregular'
        } text-xs`}
        style={{ color: color }}
      >
        {iconName}
      </Text> */}
    </View>
  );
}
