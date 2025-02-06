import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import { TabBarProps, tabIcons } from '@/types';
import { Colors } from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';

export default function TabBar({
  state,
  descriptors,
  navigation,
}: TabBarProps) {
  const icons: tabIcons = {
    index: (props) => <AntDesign name='home' {...props} />,
    transactions: (props) => <AntDesign name='swap' {...props} />,
    categories: (props) => <MaterialIcons name='category' {...props} />,
    reports: (props) => <Feather name='bar-chart-2' {...props} />,
    profile: (props) => <Feather name='user' {...props} />,
  };

  return (
    <View
      style={[
        styles.tabContainer,
        {
          backgroundColor: Colors[useColorScheme()].background,
        },
      ]}
    >
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <View style={styles.tabBarItem}>
              {icons[route.name](
                isFocused
                  ? { size: 24, color: Colors[useColorScheme('tint')].tint }
                  : { size: 24, color: Colors[useColorScheme('icon')].icon }
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
  },
  tabbar: {
    position: 'relative',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 0,
    paddingVertical: 15,
    borderCurve: 'continuous',
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  tabBarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
});
