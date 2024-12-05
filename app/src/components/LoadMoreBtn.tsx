import { View, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import ThemedView from '@/components/ui/View';
import ThemedText from '@/components/ui/Text';
import { useTheme } from '@/context/ThemeProvider';
type LoadMoreBtnProps = {
  handleOnPress: () => void;
  title: string;
};

export default function LoadMoreBtn({
  handleOnPress,
  title,
}: LoadMoreBtnProps) {
  const { theme } = useTheme();
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handleOnPress}>
      <ThemedView
        darkColor='#1c1c1e'
        lightColor='#f3f4f6'
        style={[
          styles.themedView,
          { borderColor: theme === 'light' ? '#ccc' : '#1c1c1e' },
        ]}
      >
        <View style={styles.innerView}>
          <ThemedText style={styles.text}>{title}</ThemedText>
          <Ionicons
            name='chevron-forward'
            size={20}
            color={theme === 'light' ? '#333' : '#fff'}
          />
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  themedView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    width: '100%',
    marginRight: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 16,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  innerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 8,
  },
  text: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4B5563',
    marginLeft: 16,
  },
});
